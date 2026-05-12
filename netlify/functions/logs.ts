import postgres from 'postgres';
import type { Config, Context } from "@netlify/functions";

const sql = process.env.DATABASE_URL ? postgres(process.env.DATABASE_URL) : null;

export default async (req: Request, context: Context) => {
    if (!sql) return new Response(JSON.stringify({ error: "No DB connection" }), { status: 500 });
    
    try {
        if (req.method === 'GET') {
            await sql`CREATE TABLE IF NOT EXISTS omni_logs (id TEXT PRIMARY KEY, time TEXT, level TEXT, msg TEXT, pending BOOLEAN)`;
            const logs = await sql`SELECT * FROM omni_logs ORDER BY time ASC LIMIT 100`;
            return new Response(JSON.stringify(logs), { headers: { 'Content-Type': 'application/json' }});
        } 
        else if (req.method === 'POST') {
            const data = await req.json();
            await sql`INSERT INTO omni_logs (id, time, level, msg, pending) 
                      VALUES (${data.id}, ${data.time}, ${data.level}, ${data.msg}, ${data.pending})`;
            return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' }});
        }
    } catch(e: any) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

export const config: Config = { path: "/api/logs" };
