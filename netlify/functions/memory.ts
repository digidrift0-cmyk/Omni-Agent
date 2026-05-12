import postgres from 'postgres';
import type { Config, Context } from "@netlify/functions";

const sql = process.env.DATABASE_URL ? postgres(process.env.DATABASE_URL) : null;

export default async (req: Request, context: Context) => {
    if (!sql) return new Response(JSON.stringify({ error: "No DB connection" }), { status: 500 });
    
    try {
        if (req.method === 'GET') {
            await sql`CREATE TABLE IF NOT EXISTS omni_memory (id TEXT PRIMARY KEY, label TEXT, confidence TEXT, last_seen TEXT, utility TEXT)`;
            const memory = await sql`SELECT * FROM omni_memory ORDER BY last_seen DESC LIMIT 50`;
            // map from db format to app format
            const mapped = memory.map(m => ({
                id: m.id, label: m.label, confidence: parseFloat(m.confidence), lastSeen: m.last_seen, utility: m.utility
            }));
            return new Response(JSON.stringify(mapped), { headers: { 'Content-Type': 'application/json' }});
        } 
        else if (req.method === 'POST') {
            const data = await req.json();
            await sql`INSERT INTO omni_memory (id, label, confidence, last_seen, utility) 
                      VALUES (${data.id}, ${data.label}, ${data.confidence.toString()}, ${data.lastSeen}, ${data.utility})`;
            return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' }});
        }
    } catch(e: any) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

export const config: Config = { path: "/api/memory" };
