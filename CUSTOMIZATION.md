# 🎨 Customization & Extension Guide

Superteam Academy is designed for regional hubs to fork and brand as their own. This guide explains how to customize the platform.

## 🌈 Visual Customization

### Theme & Colors
The design system is managed via `tailwind.config.js`. To change the brand colors (e.g., from Superteam Brazil purple to Superteam Vietnam yellow), modify the `extend.colors` section:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      'solana-purple': '#9945FF', // Change this to your primary brand color
      'solana-cyan': '#14F195',   // Change this to your secondary brand color
    },
  }
}
```

### Components
We use `shadcn/ui` primitives. You can find and customize raw components in `src/components/ui`.

## 🌍 Adding New Languages

The platform uses `react-i18next`. To add a new language (e.g., Vietnamese):

1. **Create a Translation File**: `src/i18n/vn.json`.
2. **Register the Language**: In `src/i18n/config.ts`, import the new file and add it to the `resources` object.
3. **Update the UI**: The `Navbar.tsx` language switcher will automatically detect the new language if added to the dropdown menu.

## 🎮 Gamification Adjustments

### XP Multiplication
To adjust how hard it is to level up, modify the math in `src/contexts/PlayerContext.tsx`:

```typescript
// Changing level curve logic
const newLevel = Math.floor(Math.sqrt(player.xp / 100)) + 1;
```

### Reward Rates
Modify the XP constants in your CMS or the `MockLearningService` to increase/decrease rewards for completion.

## 🚀 Extending Functionality

### New Learning Tracks
Add new categories to the `CourseCatalog` by updating the `tracks` enum in the CMS schema.

### Integrating New On-Chain Programs
The `LearningProgressService` is designed to be swapped. Create a new service (e.g., `SuperteamVietnamService`) that implements the interface and swap the export in `src/lib/services/LearningProgressService.ts`.
