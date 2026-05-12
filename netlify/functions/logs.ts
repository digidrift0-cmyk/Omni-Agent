import { PrismaClient } from '@prisma/client';
import type { Config, Context } from "@netlify/functions";

const prisma = new PrismaClient();

export default async (req: Request, context: Context) => {
    try {
        if (req.method === 'GET') {
            const logs = await prisma.log.findMany({
                orderBy: { time: 'asc' },
                take: 100
            });
            return new Response(JSON.stringify(logs), { headers: { 'Content-Type': 'application/json' }});
        } 
        else if (req.method === 'POST') {
            const data = await req.json();
            await prisma.log.create({
                data: {
                    id: data.id,
                    time: data.time,
                    level: data.level,
                    msg: data.msg,
                    pending: data.pending
                }
            });
            return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' }});
        }
    } catch(e: any) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

export const config: Config = { path: "/api/logs" };
