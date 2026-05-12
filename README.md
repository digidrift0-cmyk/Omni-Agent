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

### Deploying to Netlify
This app is designed as a fast, client-side SPA built with Vite. It can be easily deployed to Netlify.

1. Push this repository to GitHub/GitLab.
2. In Netlify, click **Add new site** > **Import an existing project**.
3. Select your repository. Netlify will detect the `netlify.toml` file and automatically use the correct build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Configure your Gemini API Key in Netlify:
   - Go to **Site Configuration** > **Environment variables**
   - Add a new variable:
     - Key: `GEMINI_API_KEY`
     - Value: `<your_gemini_api_key>`
5. Click **Deploy**.

Without the `GEMINI_API_KEY`, the application will load but the dynamic chat and reasoning steps will safely fall back to local logging.

*Designed for the Ability Summit 2026, showcasing the future of accessible agents.*
