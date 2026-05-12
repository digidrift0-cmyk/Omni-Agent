import { PrismaClient } from '@prisma/client';
import type { Config, Context } from "@netlify/functions";

const prisma = new PrismaClient();

export default async (req: Request, context: Context) => {
    try {
        if (req.method === 'GET') {
            const memory = await prisma.spatialMemory.findMany({
                orderBy: { lastSeen: 'desc' },
                take: 50
            });
            // map from db format to app format (prisma format is already what we need, except we might need to cast confidence if it's string in DB or number, wait, in schema it's String)
            const mapped = memory.map(m => ({
                ...m,
                confidence: parseFloat(m.confidence)
            }));
            return new Response(JSON.stringify(mapped), { headers: { 'Content-Type': 'application/json' }});
        } 
        else if (req.method === 'POST') {
            const data = await req.json();
            await prisma.spatialMemory.create({
                data: {
                    id: data.id,
                    label: data.label,
                    confidence: data.confidence.toString(),
                    lastSeen: data.lastSeen,
                    utility: data.utility
                }
            });
            return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' }});
        }
    } catch(e: any) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

export const config: Config = { path: "/api/memory" };
