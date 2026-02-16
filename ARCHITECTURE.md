# 🏗️ Superteam Academy Architecture

This document outlines the architectural decisions and system design for the Superteam Academy LMS.

## 🏛️ System Overview
Superteam Academy is built as a highly modular Next.js 14 application, utilizing a service-oriented architecture to separate frontend concerns from Web3 and data fetching logic.

## 🧩 Core Layers

### 1. Presentation Layer (Frontend)
- **Framework**: Next.js 14 (App Router) for SSR and SEO-optimized performance.
- **Styling**: Tailwind CSS with a custom design system centered around Solana's brand identity.
- **Animations**: Framer Motion for premium, non-blocking page transitions and micro-interactions.
- **Components**: Atomic design pattern using `shadcn/ui` primitives.

### 2. Service Layer (Abstraction)
The application uses the `LearningProgressService` interface to ensure decoupling.
- **Mock Service**: Current implementation handles local persistence via `localStorage` for rapid prototyping.
- **On-Chain Service (Planned)**: Future implementation will swap the local calls for Anchor program interactions and Helius DAS API calls without changing the UI components.

### 3. Web3 & On-Chain Integration
- **XP Ecosystem**: Implemented using **SPL Token-2022** (Non-transferable). User balance directly represents their XP.
- **Credential System**: Utilizes **Metaplex Bubblegum** for Compressed NFTs (cNFTs). This allows for evolving credentials (upgradable metadata) as learners progress through tracks, minimizing wallet clutter.
- **Smart Contract**: Built with **Anchor Framework**, tracking lesson bitmaps on-chain via PDAs.

### 4. Content Layer (CMS)
- Designed to integrate with **Sanity** or **Contentful**.
- Schema supports Markdown for deep technical lessons and structured data for coding challenges (Monaco Editor configurations).

## 🛠️ Tech Stack & Reasoning

| Tech | Reason |
| :--- | :--- |
| **Next.js 14** | Best-in-class performance, SEO, and developer experience. |
| **Monaco Editor** | The industrial standard for code editing (same as VS Code). |
| **Token-2022** | Essential for Soulbound (non-transferable) XP logic on Solana. |
| **Bubblegum** | Cost-effective minting of millions of credentials using compressed state. |
| **PostHog** | Privacy-first analytics and heatmaps for user behavior tracking. |
| **Sentry** | Robust error monitoring and performance debugging. |

## 📊 Data Flow
1. **User Auth**: Wallet Adapter signs a message -> Local session established.
2. **Learning**: User completes a challenge -> Trigger `LearningProgressService.completeLesson()`.
3. **Reward**: Service updates local state -> In production, triggers an on-chain instruction to the Anchor Program.
4. **Verification**: Dashboard queries DAS API (Helius) to fetch and verify the learner's cNFT credentials.

## 🚀 Performance Targets
- **Lighthouse**: Targeting 95+ in all categories.
- **Bundle Size**: Minimized via dynamic imports (e.g., wallet adapters and code editors).
- **Latency**: Optimistic UI updates for lesson completion feedback.
