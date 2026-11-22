# Design Resources Hub 🎨

A curated, modern, and dynamic collection of the best design resources, UI components, AI prompts, and inspiration for modern web development. Built with React, TypeScript, Tailwind CSS, and Framer Motion.

![Design Resources Hub](https://img.shields.io/badge/React-18.2-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-pink?logo=framer)
![Vite](https://img.shields.io/badge/Vite-5.1-646cff?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **🎯 Curated Resources** — 19+ hand-picked design resources across 8 categories
- **🔍 Real-time Search** — Instant filtering by name, description, tags, or category
- **🏷️ Category Filtering** — Browse by AI Prompts, Landings, Components, Motion, Micro-interactions, Typography, UX Flows, Libraries
- **⭐ Featured Resources** — Highlighted must-see resources
- **🌙 Dark/Light Mode** — System-aware with manual toggle, persisted in localStorage
- **♿ Accessible** — Semantic HTML, ARIA labels, keyboard navigation, focus management
- **⚡ Performance** — Code splitting, lazy loading, optimized animations
- **📱 Responsive** — Mobile-first, works beautifully on all devices
- **🎬 Smooth Animations** — Framer Motion powered with reduced motion support
- **🚀 Vercel Ready** — Zero-config deployment

## 📦 Categories

| Category | Resources | Description |
|----------|-----------|-------------|
| **AI Prompts** | 3 | Prompt libraries for AI-powered design |
| **Landing Pages** | 3 | Curated landing page galleries |
| **UI Components** | 4 | Ready-to-use React component libraries |
| **Motion & Animation** | 1 | Motion design inspiration |
| **Micro-interactions** | 2 | Interactive component libraries |
| **Typography** | 1 | Font discovery & references |
| **UX Flows** | 1 | Real user journey references |
| **Libraries & Tools** | 1 | Developer library discovery |

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 11
- **Icons**: Lucide React
- **Utilities**: clsx, clsx
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd design-resources-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
design-resources-hub/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Badge.tsx
│   │   ├── App.tsx          # Main app component
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Footer.tsx       # Site footer
│   │   ├── ResourceCard.tsx # Resource display card
│   │   ├── CategoryFilter.tsx
│   │   ├── SearchBar.tsx
│   │   └── StatsBar.tsx
│   ├── data/
│   │   └── resources.ts     # Resource data & types
│   ├── hooks/
│   │   └── index.ts         # Custom React hooks
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── styles/
│   │   └── globals.css      # Global styles
│   ├── main.tsx             # Entry point
│   └── App.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── README.md
```

## 🎨 Customization

### Adding New Resources

Edit `src/data/resources.ts`:

```typescript
{
  id: 'unique-id',
  name: 'Resource Name',
  url: 'https://example.com',
  description: 'Description of the resource...',
  category: 'ai-prompts', // Use one of the Category types
  tags: ['tag1', 'tag2', 'tag3'],
  featured: true, // Optional: highlight in featured section
}
```

### Adding New Categories

1. Add the category to the `Category` type in `resources.ts`
2. Add category metadata to the `categories` array
3. Add a color in `getCategoryColor()` in `src/lib/utils.ts`

### Theming

Modify `tailwind.config.js` to customize:
- Colors (primary, dark palette)
- Fonts
- Animations
- Breakpoints

## ♿ Accessibility

- Semantic HTML5 structure
- ARIA labels and roles
- Keyboard navigation support
- Focus visible states
- Reduced motion support (`prefers-reduced-motion`)
- Color contrast compliance (WCAG AA)
- Screen reader friendly

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deploy to Vercel

### Option 1: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option 2: GitHub Integration

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

The `vercel.json` handles:
- SPA routing (rewrites to index.html)
- Asset caching headers
- Security headers

## 📄 License

MIT License — feel free to use this for your own projects!

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch
3. Add your resource or improvement
4. Submit a PR

## 🙏 Acknowledgments

All resources listed are created by amazing designers and developers. Visit their sites to support their work!

---

**Built with ❤️ for the design community**