# Omni-Agent

Omni-Agent is an **accessibility-first proactive agentic platform**. It is designed to lower cognitive load, provide robust spatial awareness, and give users full control over their automated workflows.

## Mission
Our goal is to create a digital environment that adapts to the user's sensory needs rather than forcing the user to adapt to the interface. Omni-Agent is built with WCAG 2.2 AA standards in mind from day one, featuring a first-class **Low Stimulus Mode** and strict adherence to intuitive navigation patterns.

## Features
- **Vision**: Spatial awareness & Environmental mapping
- **Flow**: Agent orchestration & Task autonomy
- **Focus**: Cognitive guardrails & Low stimulus modes
- **Connect**: Seamless ecosystem integrations

## Development & Deployment

### Quick Start
```bash
npm install
npm run dev
```

### Deploying to Netlify (with Database Persistence)

This app uses an active SSOT (Single Source of Truth) database setup backed by Postgres. To enable true persistence across your live site:

1. Push this repository to GitHub/GitLab.
2. In Netlify, click **Add new site** > **Import an existing project**.
3. Select your repository. Netlify detects the `netlify.toml` file correctly for the Vite + serverless functions setup.
4. Go to **Integrations** -> search for **Storage** or **Database** and create a connected **Postgres DB**. (Netlify Database or Neon both work seamlessly). This automatically binds a `DATABASE_URL` environment variable.
5. In **Site Configuration** > **Environment variables**, also add:
   - Key: `GEMINI_API_KEY`
   - Value: `<your_gemini_api_key>`
6. Trigger a deploy!

The deployed app will securely communicate with Netlify Edge Functions (`/api/memory` and `/api/logs`) to read & write state. If `DATABASE_URL` is omitted, the app gracefully falls back to local `localStorage`!

*Designed for the Ability Summit 2026, showcasing the future of accessible agents.*
