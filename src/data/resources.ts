export interface Resource {
  id: string;
  name: string;
  url: string;
  description: string;
  category: Category;
  tags: string[];
  featured?: boolean;
}

export type Category =
  | 'ai-prompts'
  | 'landings'
  | 'components'
  | 'motion'
  | 'micro-interactions'
  | 'typography'
  | 'ux-flows'
  | 'libraries'
  | 'security'
  | 'agent-skills';

export const categories: { id: Category; label: string; icon: string; description: string }[] = [
  {
    id: 'ai-prompts',
    label: 'AI Prompts',
    icon: 'sparkles',
    description: 'Prompt libraries and AI-powered design resources',
  },
  {
    id: 'landings',
    label: 'Landing Pages',
    icon: 'layout-template',
    description: 'Curated landing page inspiration and galleries',
  },
  {
    id: 'components',
    label: 'UI Components',
    icon: 'cube',
    description: 'Ready-to-use React/Vue component libraries',
  },
  {
    id: 'motion',
    label: 'Motion & Animation',
    icon: 'move',
    description: 'Animation inspiration and motion design resources',
  },
  {
    id: 'micro-interactions',
    label: 'Micro-interactions',
    icon: 'mouse-pointer-2',
    description: 'Interactive components and micro-interaction libraries',
  },
  {
    id: 'typography',
    label: 'Typography',
    icon: 'type',
    description: 'Font discovery and typography references',
  },
  {
    id: 'ux-flows',
    label: 'UX Flows',
    icon: 'git-branch',
    description: 'Real user experience flows and journeys',
  },
  {
    id: 'libraries',
    label: 'Libraries & Tools',
    icon: 'package',
    description: 'Developer tools and library discovery',
  },
  {
    id: 'security',
    label: 'Security & Auth',
    icon: 'shield',
    description: 'Security scanners, auth tools, and vulnerability detection',
  },
  {
    id: 'agent-skills',
    label: 'Agent Skills',
    icon: 'cpu',
    description: 'AI coding agent skills for design, performance, accessibility, and best practices',
  },
];

export const resources: Resource[] = [
  // AI Prompts
  {
    id: 'getlayers',
    name: 'getlayers.ai',
    url: 'https://getlayers.ai',
    description: '50+ website prompts, 300+ 3D scenes, 1000+ interactive gradients, 100+ backgrounds, motion sections. Paste into Claude and ship.',
    category: 'ai-prompts',
    tags: ['prompts', '3d', 'gradients', 'claude', 'ai'],
    featured: true,
  },
  {
    id: 'sceneai',
    name: 'sceneai.art',
    url: 'https://sceneai.art',
    description: 'Beautiful AI Prompt Library made for creators. Curated prompts for stunning visual outputs.',
    category: 'ai-prompts',
    tags: ['prompts', 'ai-art', 'creators', 'curated'],
    featured: true,
  },
  {
    id: 'mahero',
    name: 'mahero.supply',
    url: 'https://mahero.supply',
    description: '150+ free website prompts with 1,000+ backgrounds, motion sections and gradients. Paste into Claude and ship.',
    category: 'ai-prompts',
    tags: ['prompts', 'free', 'backgrounds', 'motion', 'gradients'],
    featured: true,
  },
  {
    id: 'modulify',
    name: 'modulify.ai',
    url: 'https://modulify.ai',
    description: 'Best vibecoding tool. AI-powered design-to-code platform for rapid prototyping and production-ready websites.',
    category: 'ai-prompts',
    tags: ['vibecoding', 'ai', 'design-to-code', 'prototyping', 'production'],
    featured: true,
  },
  {
    id: 'modulify-templates',
    name: 'modulify.ai/templates',
    url: 'https://modulify.ai/templates',
    description: 'Free templates from modulify. Ready-to-use website templates for rapid development.',
    category: 'ai-prompts',
    tags: ['templates', 'free', 'vibecoding', 'starter-kits'],
    featured: true,
  },
  {
    id: 'motionin',
    name: 'motionin.design',
    url: 'https://motionin.design',
    description: '1 prompt, 1 website. AI generates complete animated websites from a single prompt.',
    category: 'ai-prompts',
    tags: ['ai', 'prompt-to-website', 'animated', 'generative', 'motion'],
    featured: true,
  },
  {
    id: 'prettysites',
    name: 'prettysites.io',
    url: 'https://prettysites.io',
    description: 'High-end website prompts, layouts, and animations. Grab a design and customize it.',
    category: 'ai-prompts',
    tags: ['prompts', 'layouts', 'animations', 'website-templates', 'customizable'],
    featured: true,
  },
  {
    id: 'ambientcg',
    name: 'ambientcg.com',
    url: 'https://ambientcg.com',
    description: 'Lifelike 3D materials, textures, and HDRIs. Free CC0 assets for realistic 3D scenes and web graphics.',
    category: 'ai-prompts',
    tags: ['3d', 'materials', 'textures', 'hdri', 'cc0', 'free', 'pbr'],
    featured: true,
  },
  {
    id: 'prompt-motion',
    name: 'prompt-motion.com',
    url: 'https://prompt-motion.com',
    description: 'Prompt Motion — AI motion videos with their prompts. Generate and explore AI-generated motion content with copyable prompts.',
    category: 'ai-prompts',
    tags: ['ai', 'motion', 'video', 'prompts', 'generative', 'animation'],
    featured: true,
  },
  // getlayers.ai Tools (free browser tools)
  {
    id: 'getlayers-liquid-colour',
    name: 'getlayers.ai/tools/liquid-colour',
    url: 'https://getlayers.ai/tools/liquid-colour',
    description: 'Moving liquid backgrounds with hand-tuned feel. Tune live in browser, export or copy prompt. Free.',
    category: 'motion',
    tags: ['getlayers', 'liquid', 'backgrounds', 'shader', 'free', 'browser-tool', 'motion'],
    featured: true,
  },
  {
    id: 'getlayers-shader-backgrounds',
    name: 'getlayers.ai/tools/shader-backgrounds',
    url: 'https://getlayers.ai/tools/shader-backgrounds',
    description: 'Live shader backdrops, no code required. Interactive browser tool to tune and export shader backgrounds.',
    category: 'motion',
    tags: ['getlayers', 'shader', 'backgrounds', 'webgl', 'free', 'browser-tool', 'webgl'],
    featured: true,
  },
  {
    id: 'getlayers-dither-art',
    name: 'getlayers.ai/tools/dither-art',
    url: 'https://getlayers.ai/tools/dither-art',
    description: 'Retro-digital dither look generator. Create dithered images and animations in browser, export or copy prompt.',
    category: 'motion',
    tags: ['getlayers', 'dither', 'retro', 'pixel-art', 'free', 'browser-tool', 'effects'],
    featured: true,
  },
  {
    id: 'getlayers-image-motion',
    name: 'getlayers.ai/tools/image-motion',
    url: 'https://getlayers.ai/tools/image-motion',
    description: 'Your images in a looping 3D ring. Upload images, tune motion in browser, export animated loops.',
    category: 'motion',
    tags: ['getlayers', '3d', 'image-motion', 'loop', 'free', 'browser-tool', 'animation'],
    featured: true,
  },
  {
    id: 'getlayers-custom-cursors',
    name: 'getlayers.ai/tools/custom-cursors',
    url: 'https://getlayers.ai/tools/custom-cursors',
    description: 'Custom cursor effects people notice. Design interactive cursors in browser, export CSS/JS ready to use.',
    category: 'micro-interactions',
    tags: ['getlayers', 'cursors', 'interactions', 'css', 'js', 'free', 'browser-tool', 'micro-interactions'],
    featured: true,
  },

  // Landing Pages
  {
    id: 'land-book',
    name: 'land-book.com',
    url: 'https://land-book.com',
    description: 'Landing page inspiration done right. Curated collection of the best landing pages.',
    category: 'landings',
    tags: ['landings', 'inspiration', 'curated', 'web-design'],
    featured: true,
  },
  {
    id: 'landdding',
    name: 'landdding.com',
    url: 'https://landdding.com',
    description: 'Top notch landings. High-quality landing page gallery for inspiration.',
    category: 'landings',
    tags: ['landings', 'gallery', 'inspiration', 'web-design'],
    featured: false,
  },
  {
    id: 'recent-design',
    name: 'recent.design',
    url: 'https://recent.design',
    description: 'Cool gallery for web design inspo. Fresh, modern design references.',
    category: 'landings',
    tags: ['gallery', 'web-design', 'inspiration', 'modern'],
    featured: false,
  },

  // UI Components
  {
    id: 'component-gallery',
    name: 'component.gallery',
    url: 'https://component.gallery',
    description: '60 components with 2670 real examples to reuse. Massive component reference.',
    category: 'components',
    tags: ['components', 'examples', 'react', 'vue', 'reference'],
    featured: true,
  },
  {
    id: 'pro-beui',
    name: 'pro.beui.dev',
    url: 'https://pro.beui.dev',
    description: 'Premium animated UI components. High-quality, production-ready components.',
    category: 'components',
    tags: ['premium', 'animated', 'components', 'react', 'production'],
    featured: true,
  },
  {
    id: 'uiarc',
    name: 'uiarc.dev',
    url: 'https://uiarc.dev',
    description: 'Animated React components and UI blocks. Ready-to-use animated components.',
    category: 'components',
    tags: ['react', 'animated', 'blocks', 'components', 'ui'],
    featured: false,
  },
  {
    id: 'collectui',
    name: 'collectui.com',
    url: 'https://collectui.com',
    description: 'A deep UI design collection. Extensive library of UI patterns and designs.',
    category: 'components',
    tags: ['collection', 'ui-patterns', 'design', 'reference', 'deep'],
    featured: false,
  },
  {
    id: 'iconly',
    name: 'iconly.design',
    url: 'https://iconly.design',
    description: 'World-class icons. Beautiful, consistent icon sets for modern interfaces.',
    category: 'components',
    tags: ['icons', 'icon-sets', 'design-system', 'ui', 'consistent'],
    featured: true,
  },

  // Motion & Animation
  {
    id: '60fps',
    name: '60fps.design',
    url: 'https://60fps.design',
    description: 'Details of motion that separate cheap from expensive design. Mobile UI animations.',
    category: 'motion',
    tags: ['motion', 'animation', 'mobile', 'quality', 'design'],
    featured: true,
  },

  // Micro-interactions
  {
    id: 'microkit',
    name: 'microkit.co',
    url: 'https://microkit.co',
    description: 'Library of micro-interactions that devs can copy, adapt, and ship. Practical micro-interactions.',
    category: 'micro-interactions',
    tags: ['micro-interactions', 'copy-paste', 'dev-friendly', 'interactions'],
    featured: true,
  },
  {
    id: 'bencho',
    name: 'bencho.dev',
    url: 'https://bencho.dev',
    description: 'Interactive components and micro-interactions. Beautiful interactive UI elements.',
    category: 'micro-interactions',
    tags: ['interactive', 'components', 'micro-interactions', 'ui'],
    featured: false,
  },

  // Typography
  {
    id: 'fontinlogo',
    name: 'fontinlogo.com',
    url: 'https://fontinlogo.com',
    description: 'The fonts behind famous logos. Discover what typefaces top brands use.',
    category: 'typography',
    tags: ['fonts', 'logos', 'brands', 'typography', 'reference'],
    featured: true,
  },
  {
    id: 'fontshare',
    name: 'fontshare.com',
    url: 'https://fontshare.com',
    description: 'Stunning fonts completely free for commercial projects. High-quality typefaces from Indian Type Foundry.',
    category: 'typography',
    tags: ['fonts', 'free', 'commercial', 'typefaces', 'indian-type-foundry'],
    featured: true,
  },

  // UX Flows
  {
    id: 'pageflows',
    name: 'pageflows.com',
    url: 'https://pageflows.com',
    description: 'Real UX flows, start to finish. Complete user journey references for popular products.',
    category: 'ux-flows',
    tags: ['ux', 'flows', 'journeys', 'products', 'reference'],
    featured: true,
  },

  // Libraries & Tools
  {
    id: 'libraries-dev',
    name: 'libraries.dev',
    url: 'https://libraries.dev',
    description: 'Discover React libraries and UI tools. Search and compare the best libraries.',
    category: 'libraries',
    tags: ['react', 'libraries', 'discovery', 'tools', 'comparison'],
    featured: true,
  },
  {
    id: 'remotion',
    name: 'Remotion',
    url: 'https://www.remotion.dev',
    description: 'Make videos programmatically in React. Render MP4s, WebM, ProRes from React components. Frame-accurate, uses FFmpeg, supports audio, sequences, and serverless rendering.',
    category: 'libraries',
    tags: ['react', 'video', 'ffmpeg', 'programmatic-video', 'animation', 'mp4', 'webm', 'prores'],
    featured: true,
  },
  {
    id: 'motion-canvas',
    name: 'Motion Canvas',
    url: 'https://motioncanvas.io',
    description: 'Code-driven animated explainers. TypeScript library for creating precise, reproducible animations and educational videos. Declarative API, generator functions, audio support, Lezer editor integration.',
    category: 'libraries',
    tags: ['typescript', 'animation', 'explainer-videos', 'code-driven', 'declarative', 'educational', 'lezer'],
    featured: true,
  },
  {
    id: 'motion-lib',
    name: 'Motion (Framer Motion)',
    url: 'https://motion.dev',
    description: 'Layout transitions and springs. Production-ready animation library for React. Shared layout transitions, spring physics, scroll-linked animations, drag gestures, exit animations. Zero dependencies, 16kb gzipped.',
    category: 'libraries',
    tags: ['react', 'animation', 'springs', 'layout-transitions', 'scroll-animations', 'drag', 'framer-motion', 'lightweight'],
    featured: true,
  },

  // Agent Skills
  {
    id: 'taste-skill',
    name: 'Taste Skill',
    url: 'https://github.com/Leonxlnx/taste-skill',
    description: 'Layout, type & responsive checks. Agent Skill that makes coding agents build professional company websites at figma.com/x.ai level. Deals palettes, Google Fonts pairings, 11 hero layouts, real photographs from vetted library, real brand icons, shader grounds for tech/gaming only. Browser checker across 1440/1024/820/768/390 + finish gate (3 rounds max). Node 22+, Chrome/Edge/Chromium. No API keys, installs nothing. `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"`',
    category: 'agent-skills',
    tags: ['agent-skill', 'design', 'layout', 'typography', 'responsive', 'browser-check', 'finish-gate', 'photographs', 'shaders', 'mcp'],
    featured: true,
  },
  {
    id: 'shadcn-skill',
    name: 'shadcn Skill',
    url: 'https://ui.shadcn.com/docs/skills',
    description: 'Components that fit the project. Official shadcn/ui skill for AI agents. Teaches agents to compose, customize, and extend shadcn/ui components properly — avoiding prop drilling, using compound components, applying the right variants, and respecting the design system. Works with `npx skills add https://ui.shadcn.com/skills/shadcn-ui`',
    category: 'agent-skills',
    tags: ['agent-skill', 'shadcn', 'ui-components', 'compound-components', 'design-system', 'customization'],
    featured: true,
  },
  {
    id: 'motion-performance-skill',
    name: 'Fixing Motion Performance',
    url: 'https://github.com/ibelick/ui-skills',
    description: 'Audit janky transitions. Part of UI Skills registry (ui-skills.com). Teaches agents to detect and fix animation performance issues: compositor-friendly transforms, will-change misuse, layout thrashing, reduced-motion compliance, long-task blocking, GPU layer explosion. MCP at https://www.ui-skills.com/mcp with tools `list_skills`, `get_skill`. CLI: `npx ui-skills get motion-performance`',
    category: 'agent-skills',
    tags: ['agent-skill', 'motion', 'animation', 'performance', 'jank', 'compositor', 'reduced-motion', 'mcp', 'ui-skills'],
    featured: true,
  },
  {
    id: 'react-best-practices',
    name: 'React Best Practices',
    url: 'https://github.com/vercel-labs/agent-skills',
    description: 'Catch loading waterfalls. Vercel Engineering skill with 40+ rules across 8 categories (Eliminating waterfalls - Critical, Bundle size - Critical, Server-side perf - High, Client-side data fetching - Medium-High, Re-render optimization - Medium, Rendering perf - Medium, JS micro-optimizations - Low-Medium). Part of vercel-labs/agent-skills collection. Install: `npx skills add vercel-labs/agent-skills`',
    category: 'agent-skills',
    tags: ['agent-skill', 'react', 'nextjs', 'performance', 'waterfalls', 'bundle-size', 'ssr', 'vercel', 'mcp'],
    featured: true,
  },
  {
    id: 'accessibility-skill',
    name: 'Fixing Accessibility',
    url: 'https://github.com/ibelick/ui-skills',
    description: 'Keyboard, focus & forms. Part of UI Skills registry (ui-skills.com). Teaches agents to audit and fix accessibility: aria-labels, semantic HTML, keyboard handlers, visible focus states, focus-visible patterns, autocomplete/validation/error handling in forms, prefers-reduced-motion for animations. MCP at https://www.ui-skills.com/mcp. CLI: `npx ui-skills get accessibility`',
    category: 'agent-skills',
    tags: ['agent-skill', 'accessibility', 'a11y', 'keyboard', 'focus', 'forms', 'aria', 'semantic-html', 'reduced-motion', 'mcp', 'ui-skills'],
    featured: true,
  },
  {
    id: 'aiforui-skills',
    name: 'AI for UI Skills (Emil Kowalski)',
    url: 'https://aiforui.dev/skills',
    description: "Emil Kowalski's animation skills for AI agents. Teaches agents advanced animation techniques: spring physics, FLIP animations, scroll-driven animations, stagger effects, orchestration, performance budgets. Part of aiforui.dev educational platform.",
    category: 'agent-skills',
    tags: ['agent-skill', 'animation', 'springs', 'flip', 'scroll-driven', 'stagger', 'orchestration', 'emil-kowalski', 'aiforui'],
    featured: true,
  },
  {
    id: 'hyperframes',
    name: 'HyperFrames',
    url: 'https://hyperframes.dev',
    description: 'Write HTML, render video with agents. Agent-friendly video generation: write declarative HTML/JSX, agents control the render pipeline, output MP4/WebM. Designed for programmatic video creation and AI-driven content pipelines.',
    category: 'agent-skills',
    tags: ['agent-skill', 'video', 'html', 'jsx', 'render-pipeline', 'mp4', 'webm', 'programmatic-video', 'ai-video'],
    featured: true,
  },
  {
    id: 'designbookmark-motion',
    name: 'designbookmark.com/motion',
    url: 'https://designbookmark.com/motion',
    description: 'Animated components for Claude or Codex. Curated collection of copy-paste animated components optimized for AI agents. Includes Framer Motion, CSS animations, and GSAP patterns. Ready for direct use in agent-generated code.',
    category: 'agent-skills',
    tags: ['agent-skill', 'animated-components', 'framer-motion', 'css-animations', 'gsap', 'copy-paste', 'claude', 'codex', 'designbookmark'],
    featured: true,
  },
  {
    id: 'remotion-skills',
    name: 'Remotion Skills',
    url: 'https://github.com/remotion/remotion-skills',
    description: 'Video generation skills for agents using Remotion. Teaches agents to compose React components into videos, handle audio synchronization, manage rendering pipelines, and optimize for different output formats. Part of Remotion ecosystem.',
    category: 'agent-skills',
    tags: ['agent-skill', 'remotion', 'video', 'react', 'ffmpeg', 'audio-sync', 'rendering-pipeline', 'programmatic-video'],
    featured: true,
  },
  {
    id: 'blender-skills',
    name: 'Blender Skills',
    url: 'https://github.com/blender-skills/blender-skills',
    description: 'Blender workflows for agents. Teaches agents to script Blender with Python: procedural modeling, geometry nodes, shader graphs, animation rigging, render pipelines (Cycles/Eevee), USD/GLTF export. Enables AI-driven 3D content creation.',
    category: 'agent-skills',
    tags: ['agent-skill', 'blender', 'python', 'geometry-nodes', 'shaders', 'rigging', 'cycles', 'eevee', 'usd', 'gltf', '3d', 'procedural'],
    featured: true,
  },

  // VibeFoundry Agent Suite (updated v2.1+)
  {
    id: 'unslop',
    name: 'unslop',
    url: 'https://github.com/avivgerz-hue/unslop',
    description: 'v2.1.2 — 72-rule UI craft engine, APCA contrast math & 10 studio design presets to fix AI slop. Studio-grade UI design systems & Anti-Slop engine for coding agents. 10 design presets (linear-dark, swiss-grid, stripe-minimal, apple-glass, neo-brutalist + 5 new), deterministic audit for cliché gradients, APCA/WCAG contrast, elevation, spacing, radius, typography. MCP server + CLI + Agent Skill for Claude Code, Cursor, Codex, Windsurf. Exports Tailwind v4 tokens.',
    category: 'libraries',
    tags: ['design-system', 'anti-slop', 'tailwind', 'mcp', 'agent-skill', 'cli', 'apca', 'wcag', 'design-tokens', 'linear-dark', '72-rules'],
    featured: true,
  },
  {
    id: 'ghost-qa',
    name: 'ghost-qa',
    url: 'https://github.com/avivgerz-hue/ghost-qa',
    description: 'v2.1.2 — 8-trap headless Playwright QA across Desktop, Tablet & Mobile. Autonomous headless browser QA & self-healing verification loop. Crawls live app on desktop, tablet & mobile, 8-trap engine (Console, Network, Layout, A11y, Perf, Visual, DOM, Hydration), safety-gated interaction runner. MCP server + CLI + Agent Skill. Self-contained HTML evidence dashboard. Zero config, runs against any localhost.',
    category: 'libraries',
    tags: ['qa', 'testing', 'playwright', 'headless-browser', 'mcp', 'agent-skill', 'self-healing', 'ci', 'automation', '8-traps', 'tablet'],
    featured: true,
  },
  {
    id: 'vibe-shield',
    name: 'vibe-shield',
    url: 'https://github.com/avivgerz-hue/vibe-shield',
    description: 'v2.1.3 — 92-rule security scanner for Next.js, Supabase RLS, Stripe webhooks & SKILL.md poisoning. Security scanner & MCP guard for AI-generated codebases. 92 detection signatures (secrets, auth, DB/RLS, SQLi, XSS, SSRF, path traversal, agent-skill poisoning, webhook verification). Grades F–A+, SARIF + GitHub annotations, CI gate. Zero deps, offline, scans itself 100/100 A+. MCP server + Agent Skill for Claude Code, Cursor, Codex.',
    category: 'security',
    tags: ['security', 'sast', 'secrets', 'auth', 'rls', 'sqli', 'xss', 'mcp', 'agent-skill', 'ci', 'sarif', 'vibefoundry', '92-rules', 'nextjs', 'stripe', 'skill-md'],
    featured: true,
  },
];

export const getResourcesByCategory = (category: Category) =>
  resources.filter((r) => r.category === category);

export const getFeaturedResources = () =>
  resources.filter((r) => r.featured);

export const searchResources = (query: string) => {
  const q = query.toLowerCase().trim();
  if (!q) return resources;
  return resources.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q)) ||
      r.category.toLowerCase().includes(q)
  );
};