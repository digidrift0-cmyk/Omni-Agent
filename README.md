# Omni-Agent ⚡️

**A proactive, accessibility-first agent operating system.**

Omni-Agent is designed from the ground up to lower cognitive load, provide robust spatial awareness, and give users full control over their automated workflows. Built with strict WCAG 2.2 AA compliance, it empowers users by adapting to their sensory and cognitive needs, rather than forcing the user to adapt to the interface.

**[Try the Live Demo](https://omniagentability.netlify.app/)** 

![Omni Agent Demo](https://placehold.co/800x400/050505/00ADB5?text=Omni+Agent+(Placeholder)&font=Montserrat)

---

## 🎯 Built for Ability Summit 2026

We believe the future of AI must be inclusive. Omni-Agent was developed for the Ability Summit 2026 to showcase how LLMs (powered by Gemini 2.5 Pro) and Edge-based deployments can seamlessly interact to build environments that respect neurodivergence, visual impairment, and motor disabilities. 

### Key Accessibility Features
- **Low Stimulus Mode**: Instantly transitions the entire environment into a muted, zero-motion background that reduces visual fatigue.
- **Proactive Context**: The agent monitors cognitive load via usage logs and can proactively suggest helpful guardrails, minimizing executive functioning burdens.
- **Full Keyboard Navigation**: Every critical path, modal, and tab is fully navigable without a mouse, backed by robust ARIA labeling and highly-visible focus rings.
- **Sensory-Aware Design**: High-contrast typography and clear visual hierarchy (using the bold cyber-minimal design language).

## ✨ Core Technology
- **Omni Core**: Fueled by the Gemini TypeScript SDK, reading active contextual state (spatial memory, logs, tab) and generating JSON-structured intents.
- **Persistent Spatial Memory**: Remembers your spatial configurations and utility items using a Postgres-backed SSOT via Netlify Edge Functions.
- **Dynamic Reasoning Swarm**: Provides real-time translucent insights into what the agent is currently thinking and executing.

## 🚀 One-Click Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/omni-agent)

### Manual Setup (Local Development)
```bash
# 1. Install dependencies
npm install

# 2. Run the Vite developer server
npm run dev
```

### Config & Environment Setup

This app uses Netlify Edge Functions, Postgres, and Prisma ORM for true persistence. To enable SSOT (Single Source of Truth) on your live site:

1. In Netlify, click **Add new site** > **Import an existing project**.
2. Netlify detects the `netlify.toml` file correctly for Vite + Serverless Functions.
3. Go to **Integrations**, search for **Storage** or **Database**, and create a connected **Postgres DB** (Netlify Database or Neon both work seamlessly). This automatically binds a `DATABASE_URL` environment variable.
4. Go to **Site Configuration** > **Environment variables** and add:
   - Key: `GEMINI_API_KEY`
   - Value: `<your_gemini_api_key>`
5. Go to your site's deployment settings and make sure your build command is `prisma generate && vite build`.
6. Trigger a new deploy!

*(If `DATABASE_URL` is omitted or disconnected, the app gracefully falls back to local `localStorage`!)*

### Local Testing with Database (Prisma)

To test the serverless functions (`/api/logs` and `/api/memory`) locally on your machine with Prisma:

1. Install Netlify CLI globally:
   ```bash
   npm install netlify-cli -g
   ```
2. Link your local project to your Netlify site and pull environment variables:
   ```bash
   netlify link
   netlify env:pull
   ```
   *(This ensures your local environment has the same `DATABASE_URL` and `GEMINI_API_KEY`!)*
3. Run Prisma's setup and generate to push the schema to your database locally first:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
4. Start the local dev server using Netlify CLI:
   ```bash
   netlify dev
   ```
   *Your app will now run with fully functioning local APIs seamlessly proxying to your Prisma backend!*

5. You can view your database at any time using:
   ```bash
   npx prisma studio
   ```

---

*Designed and developed specifically for showcasing structural accessibility in modern AI agentism.*
