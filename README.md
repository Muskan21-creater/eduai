# EDUAI

## Overview
EDUAI is an AI-style learning-planning web app: describe a goal, get a personalized week-by-week roadmap, track progress, and receive adaptive recommendations.

## Problem Statement
Students often don't know what to learn first, which topics matter, how to structure their learning, or whether they're progressing correctly.

## Solution
A guided planner that turns a goal, level, daily time, and duration into a prioritized roadmap, then adapts the next step as progress changes.

## Key Features
- 4-step Smart Learning Planner with loading and error states
- Roadmap with category, weekly hours, estimated completion, and a daily schedule
- Adaptive engine: mark modules Completed / In Progress / Need More Practice
- 5 learning paths that pre-fill the planner
- Accessible, responsive UI

## User Journey
Landing page → value proposition → "Build My Learning Plan" → goal → level → time → duration → analysis → roadmap → next steps.

## Intelligent Learning Workflow
User Input → Goal Analysis → Learning Category Detection → Personalization → Roadmap Generation → Progress Tracking → Adaptive Recommendation

**Honest note:** this is a local rules-based engine (keyword scoring, intent rules, path templates). **No LLM or API is used.**

## Technology Stack
React 18, Vite, Tailwind CSS 3, Lucide React.

## Architecture
```
src/ai/analyzeLearningGoal.js   intent + category scoring
src/ai/generateLearningPlan.js  provider abstraction (local) + schedule
src/ai/recommendNextStep.js     adaptive engine
src/data/learningPaths.js       path templates
src/components/                 UI
```
`generateLearningPlan(input, provider)` uses a provider registry; add OpenAI/Claude/Gemini behind a server route so keys are never exposed.

## How to Run Locally
```
npm install
npm run dev
npm run build
```

## Current MVP Capabilities
Local intent analysis, roadmap generation, progress tracking (in memory, resets on refresh), adaptive recommendations.

## Future Integrations
LLM planning, course/content APIs, calendar sync, reminders, analytics, quizzes, AI tutor.

## Deployment
Push to GitHub and import into Vercel (framework: Vite, output: `dist`). `vercel.json` is included.
