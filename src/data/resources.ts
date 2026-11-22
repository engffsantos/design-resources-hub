export interface Resource {
  id: string;
  name: string;
  url: string;
  description: string;
  category: Category;
  tags: string[];
  featured?: boolean;
  // Optional enriched fields (retrocompatible)
  resourceType?: 'github-repo' | 'agent-skill' | 'library' | 'prompt-pack' | 'gallery' | 'tool' | 'docs';
  whenToUse?: string;
  stack?: string[];
  pricing?: 'open-source' | 'free' | 'freemium' | 'paid';
  agentConsumable?: boolean;
  repoUrl?: string;
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
  | 'agent-skills'
  | 'mcp-protocols'
  | 'agent-infra'
  | 'icons-assets'
  | 'design-systems'
  | 'agent-templates';

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
  {
    id: 'mcp-protocols',
    label: 'MCP & Protocols',
    icon: 'network',
    description: 'Model Context Protocol registries, A2A standards, and llms.txt discovery hubs',
  },
  {
    id: 'agent-infra',
    label: 'Agent SDKs & Evals',
    icon: 'bot',
    description: 'Open-source agent frameworks, sandboxes, tracing, and evaluation toolkits',
  },
  {
    id: 'icons-assets',
    label: 'Icons, Color & Assets',
    icon: 'palette',
    description: 'Open-source SVG icon sets, brand logos, and perceptual color systems',
  },
  {
    id: 'design-systems',
    label: 'Design Systems & A11y',
    icon: 'layers',
    description: 'Headless accessible UI primitives, design token pipelines, and system benchmarks',
  },
  {
    id: 'agent-templates',
    label: 'Agent Templates',
    icon: 'boxes',
    description: 'Deployable open-source starter kits, full-stack chat/copilot boilerplates, deep research, voice, and multi-agent architectures',
  },
];

const BASE_RESOURCES: Resource[] = [
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
  {
    id: 'promptedsite',
    name: 'promptedsite.com',
    url: 'https://promptedsite.com',
    description: 'Direction for modern frontend. AI-powered website prompts and direction for building modern frontends.',
    category: 'ai-prompts',
    tags: ['prompts', 'direction', 'frontend', 'ai', 'templates'],
    featured: true,
  },
  {
    id: 'jiro',
    name: 'Jiro.build',
    url: 'https://jiro.build',
    description: '1,500+ website prompts with source code. 180+ full landing pages, 1,000+ sections. Copy, paste, ship.',
    category: 'ai-prompts',
    tags: ['prompts', 'landing-pages', 'sections', 'source-code', 'copy-paste', 'ship'],
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

  // Landing Pages / Inspiration Galleries
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
  {
    id: 'minimal-gallery',
    name: 'minimal.gallery',
    url: 'https://minimal.gallery',
    description: 'High-end sites to feed your agent. Curated minimal, clean, and sophisticated website gallery for AI reference.',
    category: 'landings',
    tags: ['minimal', 'clean', 'gallery', 'ai-reference', 'curated', 'high-end'],
    featured: true,
  },
  {
    id: 'siteinspire',
    name: 'siteinspire.com',
    url: 'https://siteinspire.com',
    description: 'Sites filtered by style and type. Classic design inspiration gallery with powerful filtering by category, style, and type.',
    category: 'landings',
    tags: ['inspiration', 'filter', 'style', 'type', 'classic', 'gallery'],
    featured: true,
  },
  {
    id: 'httpster',
    name: 'httpster.net',
    url: 'https://httpster.net',
    description: 'Hand-picked sites, sorted by style. Community-curated website showcase with style-based sorting and submissions.',
    category: 'landings',
    tags: ['hand-picked', 'community', 'style', 'submissions', 'showcase'],
    featured: true,
  },
  {
    id: 'darkmodedesign',
    name: 'darkmodedesign.com',
    url: 'https://darkmodedesign.com',
    description: 'Dark mode websites only. Dedicated gallery for dark-mode UI inspiration and patterns.',
    category: 'landings',
    tags: ['dark-mode', 'dark-ui', 'gallery', 'inspiration', 'patterns'],
    featured: true,
  },
  {
    id: 'ondesign',
    name: 'on design',
    url: 'https://ondesign.com',
    description: 'A designer community worth joining. Community-driven platform for designers to share work, get feedback, and discover trends.',
    category: 'landings',
    tags: ['community', 'designers', 'feedback', 'trends', 'social', 'network'],
    featured: true,
  },
  {
    id: 'godly',
    name: 'godly.website',
    url: 'https://godly.website',
    description: 'Award-level sites, in motion. Curated collection of award-winning websites with motion and interaction.',
    category: 'landings',
    tags: ['award-winning', 'motion', 'inspiration', 'web-design', 'premium'],
    featured: true,
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
  {
    id: 'kokonutui',
    name: 'kokonutui.com',
    url: 'https://kokonutui.com',
    description: 'Interface components and design system. Ready-to-use React/Vue components with consistent design language.',
    category: 'components',
    tags: ['components', 'interface', 'design-system', 'react', 'vue', 'ui-kit'],
    featured: true,
  },
  {
    id: 'hyperui',
    name: 'hyperui.dev',
    url: 'https://hyperui.dev',
    description: 'Product flow components and templates. Free Tailwind CSS components for application UI, marketing, and ecommerce.',
    category: 'components',
    tags: ['tailwind', 'components', 'product-flow', 'marketing', 'ecommerce', 'free'],
    featured: true,
  },
  {
    id: 'ui-shadcn',
    name: 'ui.shadcn.com',
    url: 'https://ui.shadcn.com',
    description: 'Visual system - Beautifully designed components built with Radix UI and Tailwind CSS. Copy-paste, customize, own your components.',
    category: 'components',
    tags: ['shadcn', 'radix', 'tailwind', 'components', 'design-system', 'visual-system'],
    featured: true,
  },
  {
    id: 'lucide',
    name: 'Lucide',
    url: 'https://lucide.dev',
    description: 'One clean, consistent icon set. 1000+ simply beautiful open-source icons. MIT licensed, tree-shakable, multiple frameworks.',
    category: 'components',
    tags: ['icons', 'icon-set', 'open-source', 'consistent', 'tree-shakable', 'frameworks'],
    featured: true,
  },

  // Motion & Animation (from osrepos.com)
  {
    id: 'motion-lib-osrepos',
    name: 'motion (motiondivision/motion)',
    url: 'https://github.com/motiondivision/motion',
    description: 'Modern animation library for JavaScript, React, and Vue. Shared toolkit for gestures, spring animations, layout transitions, and scroll-linked effects. GPU-accelerated, 31k+ stars. OSRepos: Active, Health 63/100.',
    category: 'motion',
    tags: ['animation', 'react', 'vue', 'javascript', 'springs', 'layout-transitions', 'scroll', 'gestures', 'osrepos'],
    featured: true,
  },
  {
    id: 'animate-css',
    name: 'animate.css',
    url: 'https://github.com/animate-css/animate.css',
    description: 'CSS library of reusable animations for web interfaces. Add animation classes to elements instead of writing keyframes. Reduced-motion support. OSRepos: Inactive, Health 37/100.',
    category: 'motion',
    tags: ['css', 'animations', 'keyframes', 'reduced-motion', 'osrepos'],
    featured: false,
  },
  {
    id: 'motion-primitives',
    name: 'motion-primitives',
    url: 'https://github.com/motion-primitives/motion-primitives',
    description: 'TypeScript UI kit of customizable animated components built with Motion and Tailwind CSS. Polished motion for web interfaces, in beta. OSRepos: Maintained, Health 30/100.',
    category: 'motion',
    tags: ['typescript', 'tailwind', 'ui-kit', 'animated-components', 'motion', 'osrepos'],
    featured: true,
    resourceType: 'library',
    whenToUse: 'Use to quickly adopt tasteful, production-ready animated UI primitives without building custom choreography from scratch.',
    stack: ['react', 'tailwind', 'motion'],
    pricing: 'open-source',
    agentConsumable: true,
  },
  {
    id: 'ui-layouts',
    name: 'ui-layouts.com',
    url: 'https://ui-layouts.com',
    description: 'Motion layouts and animations. Ready-to-use animated layout patterns and transitions for modern web interfaces.',
    category: 'motion',
    tags: ['motion', 'layouts', 'animations', 'transitions', 'patterns', 'ui-patterns'],
    featured: true,
  },
  {
    id: 'haikei',
    name: 'haikei.app',
    url: 'https://haikei.app',
    description: 'Generated SVG backgrounds and shapes. Beautiful generative art backgrounds, gradients, blobs, waves, and patterns. Export as SVG/PNG.',
    category: 'motion',
    tags: ['svg', 'backgrounds', 'generative', 'gradients', 'blobs', 'waves', 'patterns', 'export'],
    featured: true,
  },
  {
    id: 'realtimecolors',
    name: 'realtimecolors.com',
    url: 'https://realtimecolors.com',
    description: 'Test a palette on a real layout in real-time. Instantly see how colors work together on actual UI components.',
    category: 'motion',
    tags: ['palette', 'colors', 'real-time', 'layout', 'testing', 'design'],
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
    tags: ['fonts', 'free', 'commercial', 'typefaces', 'indian-type-foundry', 'free-fonts', 'typeface', 'editorial', 'foundry'],
    featured: true,
    resourceType: 'tool',
    whenToUse: 'Use when selecting distinctive, foundry-grade free fonts beyond default Google Fonts.',
    pricing: 'free',
    agentConsumable: false,
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

  // Libraries & Tools (including osrepos discoveries)
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
    id: 'knowns-ui',
    name: 'Knowns UI',
    url: 'https://ui.knowns.dev',
    description: 'Every screen your AI product needs. Complete UI kit for AI products with chat, onboarding, settings, billing, and more. Built with React, Tailwind, shadcn/ui.',
    category: 'libraries',
    tags: ['ai-product', 'ui-kit', 'react', 'tailwind', 'shadcn', 'chat', 'onboarding', 'billing'],
    featured: true,
  },
  {
    id: 'nosignups',
    name: 'nosignups.net',
    url: 'https://nosignups.net',
    description: '200+ FREE Open Source Tools. No Signups. Right in your browser. JSON formatters, encoders, generators, validators, and more.',
    category: 'libraries',
    tags: ['tools', 'free', 'no-signup', 'json', 'formatters', 'encoders', 'generators', 'validators'],
    featured: true,
  },
  {
    id: 'photext',
    name: 'Photext.ai',
    url: 'https://photext.ai',
    description: 'Edit text in any image, for free. AI-powered text editing in images directly in browser.',
    category: 'libraries',
    tags: ['ai', 'image-editing', 'text', 'free', 'browser', 'ocr'],
    featured: true,
  },
  {
    id: 'kickresume',
    name: 'Kickresume',
    url: 'https://kickresume.com',
    description: 'Connect your LinkedIn and get a beautiful resume that\'ll get you hired. AI resume builder with templates.',
    category: 'libraries',
    tags: ['resume', 'linkedin', 'ai', 'templates', 'career', 'ats'],
    featured: true,
  },
  {
    id: 'viralityai',
    name: 'ViralityAI.net',
    url: 'https://viralityai.net',
    description: 'Find viral content & hooks in seconds. AI-powered viral content discovery for social media.',
    category: 'libraries',
    tags: ['viral', 'content', 'hooks', 'ai', 'social-media', 'trends'],
    featured: true,
  },
  {
    id: 'manybooks',
    name: 'Manybooks.net',
    url: 'https://manybooks.net',
    description: '50,000+ FREE e-books. Classic and contemporary free ebooks in multiple formats.',
    category: 'libraries',
    tags: ['ebooks', 'free', 'reading', 'classic', 'contemporary', 'formats'],
    featured: false,
  },

  // osrepos.com Video/Animation Libraries
  {
    id: 'reelmimic',
    name: 'ReelMimic',
    url: 'https://github.com/reelmimic/reelmimic',
    description: 'Turn a reference video and brief into an original 2D animation, planned and produced on your computer with Claude Code or Codex. Review the plan, follow production, comment on finished video in local web app. OSRepos: New, Health 62/100.',
    category: 'libraries',
    tags: ['ai', 'video', 'animation', '2d', 'claude-code', 'codex', 'osrepos'],
    featured: true,
  },
  {
    id: 'opencreator',
    name: 'OpenCreator',
    url: 'https://github.com/opencreator/opencreator',
    description: 'Web and Desktop creative workspace built around OpenAI Codex CLI. Brings Agent conversations and visual tools together for video, images, voice, writing, and translation. OSRepos: Active, Health 57/100.',
    category: 'libraries',
    tags: ['codex', 'creative-workspace', 'video', 'images', 'voice', 'translation', 'desktop-app', 'osrepos'],
    featured: true,
  },
  {
    id: 'arcreel',
    name: 'ArcReel',
    url: 'https://github.com/arcreel/arcreel',
    description: 'Self-hosted workspace for turning novels, scripts, or product materials into storyboards and short videos. Organizes AI-generated assets, tracks costs, exports CapCut-compatible workflow. OSRepos: Active, Health 72/100.',
    category: 'libraries',
    tags: ['video', 'storyboard', 'script-to-video', 'ai-assets', 'capcut', 'self-hosted', 'osrepos'],
    featured: true,
  },
  {
    id: 'vidgear',
    name: 'VidGear',
    url: 'https://github.com/abhiTronix/vidgear',
    description: 'Cross-platform Python framework for real-time video capture, processing, encoding, and streaming. Built around OpenCV and FFmpeg with threaded and asyncio APIs. OSRepos: Quiet, Health 40/100.',
    category: 'libraries',
    tags: ['python', 'video', 'opencv', 'ffmpeg', 'streaming', 'real-time', 'osrepos'],
    featured: false,
  },
  {
    id: 'yumcut',
    name: 'YumCut (app.yumcut.com)',
    url: 'https://app.yumcut.com',
    description: 'Generate short vertical videos from prompts with script, voiceover, visuals, captions, and export-ready edit. Automate short-form production. OSRepos: Active, Health 21/100.',
    category: 'libraries',
    tags: ['ai', 'video', 'short-form', 'vertical', 'voiceover', 'captions', 'osrepos'],
    featured: true,
  },

  // osrepos.com React/Frontend Tools
  {
    id: 'skills-agent-ui',
    name: 'UI Skills (iberick/ui-skills)',
    url: 'https://github.com/ibelick/ui-skills',
    repoUrl: 'https://github.com/ibelick/ui-skills',
    description: 'Collection of agent skills for improving and building interfaces: accessibility, layout, writing, typography, color, UI polish, plus dedicated motion-performance and accessibility audits. Exposes an MCP at https://www.ui-skills.com/mcp (tools list_skills, get_skill) and CLI: npx ui-skills get <skill>. Install via skills.sh or Claude Code plugin. OSRepos: New, Health 47/100.',
    category: 'agent-skills',
    tags: ['agent-skills', 'accessibility', 'layout', 'typography', 'color', 'ui-polish', 'ui-skills', 'osrepos', 'agent-skill', 'motion', 'animation', 'performance', 'jank', 'compositor', 'reduced-motion', 'mcp', 'a11y', 'keyboard', 'focus', 'forms', 'aria', 'semantic-html'],
    featured: true,
    resourceType: 'github-repo',
    whenToUse: 'Use to install UI agent skills for accessibility, layout, typography, color, UI polish, and motion performance via MCP tools or the ui-skills CLI.',
    stack: ['typescript', 'mcp', 'skills.sh'],
    pricing: 'open-source',
    agentConsumable: true,
  },
  {
    id: 'web-design-skill',
    name: 'web-design (Claude Code skill)',
    url: 'https://github.com/web-design/web-design',
    description: 'Claude Code skill for designing web pages with spec-first workflow. Turns PRD, reference URL, screenshot, or keywords into editable DESIGN.md before generating code. OSRepos: Quiet, Health 18/100.',
    category: 'agent-skills',
    tags: ['agent-skill', 'claude-code', 'spec-first', 'design-md', 'web-design', 'osrepos'],
    featured: true,
  },
  {
    id: 'awesome-css-frameworks',
    name: 'awesome-css-frameworks',
    url: 'https://github.com/awesome-css-frameworks/awesome-css-frameworks',
    description: 'Curated CSS framework directory built around categorized links to projects, documentation, and demos. Compare options from resets to utility-first frameworks. OSRepos: Maintained, Health 37/100.',
    category: 'libraries',
    tags: ['css', 'frameworks', 'awesome-list', 'comparison', 'osrepos'],
    featured: true,
  },
  {
    id: 'theme-park',
    name: 'theme.park',
    url: 'https://github.com/theme-park/theme.park',
    description: 'CSS themes and skins for a wide range of self-hosted web apps. Consistent look across multiple services. OSRepos: Active, Health 52/100.',
    category: 'libraries',
    tags: ['css', 'themes', 'self-hosted', 'docker', 'consistent-ui', 'osrepos'],
    featured: true,
  },
  {
    id: 'beercss',
    name: 'Beer CSS',
    url: 'https://github.com/beercss/beercss',
    description: 'Lightweight CSS framework for building Material Design 3 interfaces with semantic HTML. CDN and npm installation. OSRepos: (from CSS topic).',
    category: 'components',
    tags: ['css', 'material-design', 'framework', 'lightweight', 'semantic-html', 'osrepos'],
    featured: true,
  },
  {
    id: '50projects50days',
    name: '50projects50days',
    url: 'https://github.com/50projects50days/50projects50days',
    description: '51 mini web projects built with HTML, CSS, and JavaScript. Hands-on examples of common interface patterns and small browser apps with live demos. OSRepos: Inactive, Health 32/100.',
    category: 'libraries',
    tags: ['html', 'css', 'javascript', 'mini-projects', 'learning', 'web-dev', 'osrepos'],
    featured: true,
  },

  // osrepos.com TypeScript/AI Agent Tools
  {
    id: 'takts',
    name: 'TAKT',
    url: 'https://github.com/takt/takt',
    description: 'TypeScript CLI for defining repeatable AI coding workflows in YAML: planning, implementation, review, and fix loops. Runs tasks in isolated worktrees, records logs and reports. OSRepos: Active, Health 63/100.',
    category: 'agent-skills',
    tags: ['typescript', 'cli', 'ai-coding', 'yaml', 'workflows', 'worktrees', 'agent-orchestration', 'osrepos'],
    featured: true,
  },
  {
    id: 'openidea',
    name: 'openidea',
    url: 'https://github.com/openidea/openidea',
    description: 'Cross-platform desktop IDE built with Rust core and Tauri, bringing IntelliJ-style workflows to a native app. Editing, code insight, debugging, Git, terminal, database, HTTP tools for 60+ languages. OSRepos: New, Health 76/100.',
    category: 'libraries',
    tags: ['rust', 'tauri', 'ide', 'desktop-app', 'intellij', 'cross-platform', 'osrepos'],
    featured: true,
  },
  {
    id: 'agentrun',
    name: 'AgentRun',
    url: 'https://github.com/agentrun/agentrun',
    description: 'Self-hostable platform for managing agents, their revisions, and runs on Pi\'s durable runtime. Workflow DSL with typed decisions and agent tasks. OSRepos: New, Health 42/100.',
    category: 'libraries',
    tags: ['ai-agents', 'self-hosted', 'durable-runtime', 'workflow-dsl', 'agent-management', 'osrepos'],
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
    id: 'react-best-practices',
    name: 'React Best Practices',
    url: 'https://github.com/vercel-labs/agent-skills',
    description: 'Catch loading waterfalls. Vercel Engineering skill with 40+ rules across 8 categories (Eliminating waterfalls - Critical, Bundle size - Critical, Server-side perf - High, Client-side data fetching - Medium-High, Re-render optimization - Medium, Rendering perf - Medium, JS micro-optimizations - Low-Medium). Part of vercel-labs/agent-skills collection. Install: `npx skills add vercel-labs/agent-skills`',
    category: 'agent-skills',
    tags: ['agent-skill', 'react', 'nextjs', 'performance', 'waterfalls', 'bundle-size', 'ssr', 'vercel', 'mcp'],
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
  {
    id: 'bang-motion',
    name: 'Bang Motion',
    url: 'https://github.com/bangtutorial/bang-motion',
    description: 'Motion library for React with spring physics, gestures, and layout animations. Lightweight, performant, and developer-friendly.',
    category: 'agent-skills',
    tags: ['motion', 'react', 'springs', 'gestures', 'layout-animations', 'lightweight', 'github'],
    featured: true,
  },

  // findarepo.com - Trending AI/Video/Animation/Dev Tools
  {
    id: 'findarepo-openmotion',
    name: 'openmotion (nexu-io/openmotion)',
    url: 'https://github.com/nexu-io/openmotion',
    description: 'Open-source Claude Motion & CapCut alternative. Turn a reference video into editable motion graphics with your brand kit. Export MP4s. TypeScript, 15k stars, +5k/7d, Apache-2.0. Findarepo: #1 AI Video, Active, 710★/day.',
    category: 'libraries',
    tags: ['video', 'motion-graphics', 'capcut-alternative', 'brand-kit', 'typescript', 'apache-2', 'findarepo', 'ai-video'],
    featured: true,
  },
  {
    id: 'findarepo-claude-bughunter',
    name: 'Claude-BugHunter (elementalsouls/claude-bughunter)',
    url: 'https://github.com/elementalsouls/claude-bughunter',
    description: 'Claude Code skill bundle for bug hunting and external red-team work. 82 skills, 15 slash commands, 681 disclosed-report patterns. Python, 17k stars, +11k/7d, MIT. Findarepo: Skill of the Day, Active, 1571★/day.',
    category: 'agent-skills',
    tags: ['claude-code', 'bug-hunting', 'red-team', 'security', 'skills', 'slash-commands', 'python', 'findarepo'],
    featured: true,
  },
  {
    id: 'findarepo-t3code',
    name: 't3code (pingdotgg/t3code)',
    url: 'https://github.com/pingdotgg/t3code',
    description: 'Best way to control Claude Code, Codex and more from any computer or phone. TypeScript, 70k stars, +9.5k/7d, MIT. Findarepo: #2 MCP/Server, Active, 1359★/day, 26/26 active weeks.',
    category: 'agent-skills',
    tags: ['claude-code', 'codex', 'remote-control', 'agent-orchestration', 'typescript', 'mit', 'findarepo'],
    featured: true,
  },
  {
    id: 'findarepo-orca',
    name: 'Orca (stablyai/orca)',
    url: 'https://github.com/stablyai/orca',
    description: 'Run a fleet of bots with your own subscription (Claude Code, Grok, Agy, Codex). Desktop, mobile, remote. TypeScript, 132k stars, +7.1k/7d, MIT. Findarepo: #2 AI Agents, Active, 1012★/day, 26/26 active weeks.',
    category: 'libraries',
    tags: ['ai-agents', 'fleet', 'claude-code', 'grok', 'codex', 'desktop', 'mobile', 'typescript', 'mit', 'findarepo'],
    featured: true,
  },
  {
    id: 'findarepo-openmotion-alt',
    name: 'hyperframes (heygen-com/hyperframes)',
    url: 'https://github.com/heygen-com/hyperframes',
    description: 'Write a web page, get a video — HTML becomes rendered video, made for AI agents. TypeScript, 88k stars, +3.5k/7d, Apache-2.0. Findarepo: #2 AI Video, Active, 499★/day, 26/26 active weeks.',
    category: 'libraries',
    tags: ['ai-video', 'html-to-video', 'ai-agents', 'render-pipeline', 'typescript', 'apache-2', 'findarepo'],
    featured: true,
  },
  {
    id: 'findarepo-rea-video',
    name: 'rea-video (JuneYaooo/rea-video)',
    url: 'https://github.com/JuneYaooo/rea-video',
    description: 'Python video generation tool, 12k stars, +3.2k/7d, Apache-2.0. Findarepo: AI Video alternative to openmotion/hyperframes, Occasional.',
    category: 'libraries',
    tags: ['python', 'video-generation', 'apache-2', 'findarepo'],
    featured: false,
  },
  {
    id: 'findarepo-rea',
    name: 'rea (morluto/rea)',
    url: 'https://github.com/morluto/rea',
    description: 'Reverse engineer anything with agents, from app behavior down to native binaries. TypeScript, 473k stars, +13k/7d, MIT. Findarepo: #1 Developer Tools, Steady, 1793★/day.',
    category: 'libraries',
    tags: ['reverse-engineering', 'agents', 'native-binaries', 'developer-tools', 'typescript', 'mit', 'findarepo'],
    featured: true,
  },
  {
    id: 'findarepo-last30days-skill',
    name: 'last30days-skill (mvanhorn/last30days-skill)',
    url: 'https://github.com/mvanhorn/last30days-skill',
    description: 'AI agent skill that researches any topic across Reddit, X, YouTube, HN, Polymarket. Python, 72k stars, +4.6k/7d, MIT. Findarepo: Active, 660★/day, 26/26 active weeks.',
    category: 'agent-skills',
    tags: ['research', 'reddit', 'x', 'youtube', 'hn', 'polymarket', 'python', 'mit', 'findarepo'],
    featured: true,
  },
  {
    id: 'findarepo-blender-ai-mcp',
    name: 'blender-ai-mcp-addon (bookwjitchieni1986/blender-ai-mcp-addon)',
    url: 'https://github.com/bookwjitchieni1986/blender-ai-mcp-addon',
    description: 'AI assistant and MCP server for Blender: visual chat, scene tools. Python, 2.7k stars, +818/day (new), MIT. Findarepo: New, 42.8% growth, MCP Server.',
    category: 'agent-skills',
    tags: ['blender', 'mcp', 'ai-assistant', 'visual-chat', 'python', 'mit', 'findarepo'],
    featured: true,
  },
  {
    id: 'findarepo-skill',
    name: 'skills (mvanhorn/last30days-skill alias)',
    url: 'https://findarepo.com/skills',
    description: 'LLM Skills & MCP Directory — 1.1k Curated Entries. Updated daily from GitHub data with stars, growth, last-commit. Skills, MCP servers, plugins, agent tooling for Claude and other LLMs. Safety note: includes NVIDIA SkillSpector scan command.',
    category: 'agent-skills',
    tags: ['skills', 'mcp', 'plugins', 'agent-tooling', 'claude', 'skillspector', 'findarepo'],
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
  {
    id: 'obra-superpowers',
    name: 'Superpowers',
    url: 'https://github.com/obra/superpowers',
    description: 'Complete software development methodology for coding agents built on composable skills: brainstorming, planning, TDD, git worktrees, and subagent review.',
    category: 'agent-skills',
    tags: ['agent-skills', 'tdd', 'workflow', 'claude-code', 'cursor', 'codex'],
    featured: true,
    resourceType: 'agent-skill',
    whenToUse: 'Use to enforce disciplined brainstorming, spec writing, TDD, and isolated git worktree workflows in coding agents.',
    stack: ['claude-code', 'cursor', 'codex', 'gemini-cli', 'opencode'],
    pricing: 'open-source',
    agentConsumable: true,
    repoUrl: 'https://github.com/obra/superpowers',
  },

  {
    id: 'addyosmani-agent-skills',
    name: 'Addy Osmani Agent Skills',
    url: 'https://github.com/addyosmani/agent-skills',
    description: 'Production software engineering skills covering the full SDLC (spec, plan, build, webperf, a11y, security, ship) with CI behavioral evals.',
    category: 'agent-skills',
    tags: ['agent-skills', 'sdlc', 'webperf', 'a11y', 'evals'],
    featured: true,
    resourceType: 'agent-skill',
    whenToUse: 'Use to guide coding agents through full lifecycle engineering phases with built-in performance and accessibility audits.',
    stack: ['claude-code', 'cursor', 'codex', 'gemini-cli', 'copilot'],
    pricing: 'open-source',
    agentConsumable: true,
    repoUrl: 'https://github.com/addyosmani/agent-skills',
  },

  {
    id: 'mattpocock-skills',
    name: 'Matt Pocock Skills',
    url: 'https://github.com/mattpocock/skills',
    description: 'Composable engineering skills including grill-me, to-prd, tdd, and diagnosing-bugs that challenge assumptions before writing code.',
    category: 'agent-skills',
    tags: ['agent-skills', 'prd', 'tdd', 'architecture', 'claude-code'],
    featured: true,
    resourceType: 'agent-skill',
    whenToUse: 'Use when you want an agent to interrogate requirements, walk design trees, and validate edge cases before implementing.',
    stack: ['claude-code', 'npx-skills'],
    pricing: 'open-source',
    agentConsumable: true,
    repoUrl: 'https://github.com/mattpocock/skills',
  },

  {
    id: 'ui-ux-pro-max-skill',
    name: 'UI/UX Pro Max Skill',
    url: 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill',
    description: 'Design intelligence skill for coding agents providing layout patterns, color moods, typography rules, accessibility checks, and anti-AI-slop guardrails.',
    category: 'agent-skills',
    tags: ['agent-skills', 'ui-ux', 'design-system', 'accessibility', 'anti-slop'],
    featured: true,
    resourceType: 'agent-skill',
    whenToUse: 'Use to prevent generic AI-looking interfaces and enforce strong layout, typography, form UX, and reduced-motion rules.',
    stack: ['claude-code', 'agents-plugin'],
    pricing: 'open-source',
    agentConsumable: true,
    repoUrl: 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill',
  },

  {
    id: 'composio-awesome-claude-skills',
    name: 'Awesome Claude Skills',
    url: 'https://github.com/ComposioHQ/awesome-claude-skills',
    description: 'Curated open-source repository of reusable skills for MCP building, canvas design, brand guidelines, webapp testing, and workflow automation.',
    category: 'agent-skills',
    tags: ['agent-skills', 'mcp', 'automation', 'testing', 'workflows'],
    featured: false,
    resourceType: 'github-repo',
    whenToUse: 'Use to discover ready-made SKILL.md templates for MCP servers, docs conversion, testing, and developer workflows.',
    stack: ['claude-code', 'cursor', 'gemini-cli', 'mcp'],
    pricing: 'open-source',
    agentConsumable: true,
    repoUrl: 'https://github.com/ComposioHQ/awesome-claude-skills',
  },

  {
    id: 'claude-prompt-library',
    name: 'Claude Code Prompt Library',
    url: 'https://code.claude.com/docs/en/prompt-library',
    description: 'Official Anthropic prompt library documenting proven engineering workflows, refactoring patterns, and structured prompting techniques.',
    category: 'ai-prompts',
    tags: ['prompts', 'anthropic', 'engineering', 'workflows', 'docs'],
    featured: true,
    resourceType: 'prompt-pack',
    whenToUse: 'Use as a canonical reference for structured developer prompts and agentic coding workflows.',
    stack: ['claude', 'claude-code'],
    pricing: 'free',
    agentConsumable: true,
  },

  {
    id: 'awesome-llm-apps',
    name: 'Awesome LLM Apps',
    url: 'https://github.com/Shubhamsaboo/awesome-llm-apps',
    description: '100+ open-source AI agent architectures, RAG blueprints, memory patterns, and token/context optimization implementations across major models.',
    category: 'ai-prompts',
    tags: ['llm', 'agents', 'rag', 'memory', 'context-optimization'],
    featured: true,
    resourceType: 'github-repo',
    whenToUse: 'Use to inspect working multi-agent, RAG, and context-compression blueprints before architecting a new AI app.',
    stack: ['python', 'claude', 'gemini', 'openai', 'ollama'],
    pricing: 'open-source',
    agentConsumable: true,
    repoUrl: 'https://github.com/Shubhamsaboo/awesome-llm-apps',
  },

  {
    id: 'cursor-directory-21st',
    name: '21st.dev on Cursor Directory',
    url: 'https://cursor.directory/plugins/21st',
    description: 'Directory plugin connecting AI coding editors directly to curated UI component registries, themes, and generation prompts.',
    category: 'ai-prompts',
    tags: ['cursor', 'plugins', 'ui-prompts', 'components', 'ai-builders'],
    featured: false,
    resourceType: 'prompt-pack',
    whenToUse: 'Use to pull production-ready UI blocks and styling rules directly into AI coding editors.',
    stack: ['cursor', 'react', 'tailwind'],
    pricing: 'freemium',
    agentConsumable: true,
  },

  {
    id: 'coss-ui',
    name: 'coss ui (formerly Origin UI)',
    url: 'https://coss.com/ui',
    description: 'Official accessible React UI component library and design system by the Cal.com team, succeeding Origin UI with clean copy-paste primitives.',
    category: 'components',
    tags: ['react', 'tailwind', 'accessible', 'design-system', 'origin-ui'],
    featured: true,
    resourceType: 'library',
    whenToUse: 'Use when building crisp, accessible React product interfaces with zero-bloat Tailwind components.',
    stack: ['react', 'typescript', 'tailwind'],
    pricing: 'open-source',
    agentConsumable: true,
    repoUrl: 'https://github.com/cosscom/ui',
  },

  {
    id: 'magic-ui',
    name: 'Magic UI',
    url: 'https://magicui.design/',
    description: '150+ free and open-source animated components and effects built with React, TypeScript, Tailwind CSS, and Motion for design engineers.',
    category: 'components',
    tags: ['react', 'tailwind', 'motion', 'animated-ui', 'design-engineering'],
    featured: true,
    resourceType: 'library',
    whenToUse: 'Use for high-craft animated React blocks, bento grids, marquees, and interactive marketing components.',
    stack: ['react', 'typescript', 'tailwind', 'motion'],
    pricing: 'open-source',
    agentConsumable: true,
  },

  {
    id: 'kibo-ui',
    name: 'Kibo UI',
    url: 'https://21st.dev/@haydenbleasel/library/kibo-ui',
    description: 'Specialized React component collection extending shadcn/ui with niche product patterns, previewable and installable via MCP.',
    category: 'components',
    tags: ['shadcn', 'react', 'mcp', 'components', 'tailwind'],
    featured: false,
    resourceType: 'library',
    whenToUse: 'Use to fill specialized UI gaps on top of shadcn/ui with MCP-compatible component code.',
    stack: ['react', 'typescript', 'tailwind', 'shadcn', 'mcp'],
    pricing: 'open-source',
    agentConsumable: true,
  },

  {
    id: 'motion-dev',
    name: 'Motion',
    url: 'https://motion.dev/',
    description: 'Production-grade animation library for React, JavaScript, and Vue (formerly Framer Motion) with spring physics, layout animations, and scroll triggers.',
    category: 'motion',
    tags: ['animation', 'framer-motion', 'react', 'springs', 'scroll', 'layout-transitions', 'scroll-animations', 'drag', 'lightweight'],
    featured: true,
    resourceType: 'library',
    whenToUse: 'Use as the primary runtime animation engine for smooth layout transitions, gestures, and scroll-linked UI motion.',
    stack: ['react', 'javascript', 'vue', 'typescript'],
    pricing: 'open-source',
    agentConsumable: true,
  },

  {
    id: 'react-bits',
    name: 'React Bits',
    url: 'https://reactbits.dev/',
    description: 'Free open-source collection of animated text, interactive cards, backgrounds, and micro-interaction components for React with live demos.',
    category: 'micro-interactions',
    tags: ['micro-interactions', 'react', 'animated-text', 'interactive', 'open-source'],
    featured: true,
    resourceType: 'library',
    whenToUse: 'Use when adding playful or tactile micro-interactions, text reveals, and interactive hover surfaces to React apps.',
    stack: ['react', 'typescript', 'tailwind'],
    pricing: 'open-source',
    agentConsumable: true,
  },

  {
    id: 'landing-love',
    name: 'Landing Love',
    url: 'https://www.landing.love/',
    description: 'Curated showcase of standout landing page designs highlighting modern hero composition, visual rhythm, and conversion clarity.',
    category: 'landings',
    tags: ['landing-pages', 'inspiration', 'web-design', 'hero', 'showcase'],
    featured: false,
    resourceType: 'gallery',
    whenToUse: 'Use as a visual benchmark when structuring product landing pages, hero sections, and editorial storytelling.',
    pricing: 'free',
    agentConsumable: false,
  },

  {
    id: 'typewolf',
    name: 'Typewolf',
    url: 'https://www.typewolf.com/',
    description: 'Curated web typography guide showcasing real-world font pairings, trending typefaces in production, and practical typographic recommendations.',
    category: 'typography',
    tags: ['typography', 'font-pairing', 'inspiration', 'web-fonts'],
    featured: true,
    resourceType: 'gallery',
    whenToUse: 'Use to audit real-world font combinations and select proven editorial or tech typography pairings.',
    pricing: 'freemium',
    agentConsumable: false,
  },

  {
    id: 'fontpair',
    name: 'Fontpair',
    url: 'https://fontpair.co/',
    description: 'Collection of 500+ curated Google Font pairings with live text preview and ready-to-use typographic combinations.',
    category: 'typography',
    tags: ['google-fonts', 'font-pairing', 'typography', 'free'],
    featured: false,
    resourceType: 'tool',
    whenToUse: 'Use to rapidly pick accessible, free heading-and-body Google Font pairings for web projects.',
    pricing: 'free',
    agentConsumable: false,
  },

  {
    id: 'refero-design',
    name: 'Refero',
    url: 'https://refero.design/',
    description: 'Curated UI/UX design research library for the AI era featuring real product screens, flows, Figma plugin, and Refero MCP with agent-ready metadata.',
    category: 'ux-flows',
    tags: ['ux-flows', 'ui-research', 'mcp', 'agent-ready', 'figma'],
    featured: true,
    resourceType: 'tool',
    whenToUse: 'Use for UX pattern research by humans or via Refero MCP so AI agents can inspect real interface flows.',
    stack: ['mcp', 'figma'],
    pricing: 'freemium',
    agentConsumable: true,
  },

  {
    id: 'mobbin',
    name: 'Mobbin',
    url: 'https://mobbin.com/',
    description: 'Extensive searchable reference library of real-world mobile and web app screenshots, onboarding journeys, and end-to-end UX flows.',
    category: 'ux-flows',
    tags: ['ux-flows', 'onboarding', 'mobile-ui', 'web-ui', 'benchmarks'],
    featured: true,
    resourceType: 'gallery',
    whenToUse: 'Use to benchmark complete user journeys such as onboarding, checkout, settings, and paywalls across top products.',
    pricing: 'freemium',
    agentConsumable: false,
  },

  {
    id: 'biome',
    name: 'Biome',
    url: 'https://biomejs.dev/',
    description: 'Fast unified Rust-based web toolchain combining formatting and linting for JavaScript, TypeScript, JSX, JSON, and CSS.',
    category: 'libraries',
    tags: ['linter', 'formatter', 'rust', 'typescript', 'toolchain'],
    featured: true,
    resourceType: 'tool',
    whenToUse: 'Use to replace Prettier and ESLint with a single ultra-fast, zero-config formatter and linter in TypeScript repos.',
    stack: ['typescript', 'javascript', 'css', 'rust'],
    pricing: 'open-source',
    agentConsumable: true,
  },

  {
    id: 'oxc',
    name: 'Oxc (Oxidation Compiler)',
    url: 'https://oxc.rs/',
    description: 'High-performance suite of JavaScript and TypeScript developer tools written in Rust, including parser, linter (Oxlint), transformer, and formatter.',
    category: 'libraries',
    tags: ['compiler', 'linter', 'rust', 'javascript', 'performance'],
    featured: false,
    resourceType: 'tool',
    whenToUse: 'Use for ultra-fast static analysis, linting, and parsing in large JavaScript/TypeScript codebases.',
    stack: ['javascript', 'typescript', 'rust'],
    pricing: 'open-source',
    agentConsumable: true,
  },

  {
    id: 'better-auth',
    name: 'Better Auth',
    url: 'https://better-auth.com/',
    description: 'Comprehensive, type-safe authentication framework for TypeScript supporting passkeys, 2FA, OAuth, API keys, MCP auth, and AI agent delegation.',
    category: 'security',
    tags: ['auth', 'typescript', 'passkeys', 'oauth', 'mcp-auth', 'agent-delegation'],
    featured: true,
    resourceType: 'library',
    whenToUse: 'Use to implement self-hosted, code-first authentication in TypeScript apps including MCP and AI agent token delegation.',
    stack: ['typescript', 'node', 'mcp'],
    pricing: 'open-source',
    agentConsumable: true,
  },

  {
    id: 'arcjet',
    name: 'Arcjet',
    url: 'https://github.com/arcjet',
    description: 'Developer-first security and AI agent runtime protection platform providing bot detection, rate limiting, and shield rules directly in code.',
    category: 'security',
    tags: ['security', 'ai-runtime', 'rate-limiting', 'bot-protection', 'sdk'],
    featured: true,
    resourceType: 'library',
    whenToUse: 'Use to protect web endpoints and AI agent APIs against abuse, prompt/runtime attacks, and automated scraping.',
    stack: ['typescript', 'node', 'vercel'],
    pricing: 'freemium',
    agentConsumable: true,
    repoUrl: 'https://github.com/arcjet',
  },

  {
    id: 'gitleaks',
    name: 'Gitleaks',
    url: 'https://github.com/gitleaks/gitleaks',
    description: 'Fast open-source SAST scanner for detecting hardcoded passwords, API keys, and tokens across git repositories, commits, and CI pipelines.',
    category: 'security',
    tags: ['secrets-scanning', 'git', 'ci-cd', 'devsecops', 'open-source'],
    featured: true,
    resourceType: 'tool',
    whenToUse: 'Use in pre-commit hooks and GitHub Actions to block accidental API key or secret leaks before deployment.',
    stack: ['git', 'github-actions', 'cli'],
    pricing: 'open-source',
    agentConsumable: true,
    repoUrl: 'https://github.com/gitleaks/gitleaks',
  },

  {
    id: 'semgrep',
    name: 'Semgrep',
    url: 'https://semgrep.dev/',
    description: 'Developer-friendly application security platform combining deterministic custom rules and AI-assisted SAST/SCA to catch code vulnerabilities.',
    category: 'security',
    tags: ['sast', 'sca', 'security-scanner', 'code-audit', 'ci-cd'],
    featured: false,
    resourceType: 'tool',
    whenToUse: 'Use to run fast static security scans and enforce custom secure-coding rules in CI/CD pipelines.',
    stack: ['typescript', 'python', 'github-actions', 'cli'],
    pricing: 'freemium',
    agentConsumable: true,
  },

];

/** 24 curated resources from the taxonomy expansion. */
const PHASE1_RESOURCES: Resource[] = [
  // === MCP & PROTOCOLS ===
  {
    id: 'a2a-protocol', name: 'Agent2Agent (A2A) Protocol', url: '[https://github.com/a2aproject/a2a](https://github.com/a2aproject/a2a)', repoUrl: '[https://github.com/a2aproject/a2a](https://github.com/a2aproject/a2a)', description: 'Open protocol under the Linux Foundation (originally contributed by Google) enabling discovery via Agent Cards and structured interoperability between AI agents.', category: 'mcp-protocols', tags: ['a2a', 'protocol', 'agent-card', 'json-rpc', 'linux-foundation'], featured: true, resourceType: 'docs', whenToUse: 'Use as the canonical specification when implementing /.well-known/agent.json discovery and JSON-RPC agent-to-agent endpoints.', stack: ['json-rpc', 'http', 'typescript', 'python'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'model-context-protocol', name: 'Model Context Protocol (MCP)', url: '[https://modelcontextprotocol.io/](https://modelcontextprotocol.io/)', description: 'Open standard specification and SDK documentation for connecting AI applications and coding agents to external tools, resources, and prompts.', category: 'mcp-protocols', tags: ['mcp', 'protocol', 'tools', 'resources', 'sdk'], featured: true, resourceType: 'docs', whenToUse: 'Use when designing or integrating MCP servers and clients to expose structured tools and data sources to LLMs.', stack: ['typescript', 'python', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'official-mcp-registry', name: 'Official MCP Registry', url: '[https://registry.modelcontextprotocol.io/](https://registry.modelcontextprotocol.io/)', description: 'Official centralized metadata repository and source of record for discovering publicly accessible, publisher-verified Model Context Protocol servers.', category: 'mcp-protocols', tags: ['mcp', 'registry', 'discovery', 'official', 'servers'], featured: true, resourceType: 'tool', whenToUse: 'Use as the authoritative upstream index to verify official MCP server namespaces and metadata.', stack: ['mcp'], pricing: 'free', agentConsumable: true,
  },
  {
    id: 'glama-mcp-directory', name: 'Glama MCP Directory', url: '[https://glama.ai/mcp/servers](https://glama.ai/mcp/servers)', description: 'Large searchable registry of open-source MCP servers with daily indexing, hosting filters (local/remote/hybrid), and quality signals.', category: 'mcp-protocols', tags: ['mcp', 'directory', 'servers', 'open-source', 'discovery'], featured: false, resourceType: 'tool', whenToUse: 'Use to compare MCP servers by language, hosting mode, capabilities, and official/claimed publisher status.', stack: ['mcp'], pricing: 'freemium', agentConsumable: true,
  },
  {
    id: 'upstash-context7', name: 'Context7', url: '[https://github.com/upstash/context7](https://github.com/upstash/context7)', repoUrl: '[https://github.com/upstash/context7](https://github.com/upstash/context7)', description: 'Upstash MCP server delivering up-to-date, version-specific library documentation and code examples directly into LLM and coding agent prompts.', category: 'mcp-protocols', tags: ['mcp', 'documentation', 'upstash', 'coding-agents', 'rag'], featured: true, resourceType: 'github-repo', whenToUse: 'Use inside coding agents to fetch current API docs and prevent hallucinated methods from outdated training data.', stack: ['mcp', 'typescript', 'claude-code', 'cursor'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'microsoft-playwright-mcp', name: 'Playwright MCP', url: '[https://github.com/microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp)', repoUrl: '[https://github.com/microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp)', description: 'Official Microsoft Model Context Protocol server providing structured browser automation and web testing capabilities via Playwright.', category: 'mcp-protocols', tags: ['mcp', 'playwright', 'browser-automation', 'testing', 'microsoft'], featured: true, resourceType: 'github-repo', whenToUse: 'Use when an AI agent needs deterministic browser navigation, accessibility-tree inspection, or automated UI testing.', stack: ['mcp', 'playwright', 'typescript'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'github-mcp-server', name: 'GitHub MCP Server', url: '[https://github.com/github/github-mcp-server](https://github.com/github/github-mcp-server)', repoUrl: '[https://github.com/github/github-mcp-server](https://github.com/github/github-mcp-server)', description: 'Official GitHub Model Context Protocol server enabling agents to inspect repositories, triage issues, review pull requests, and query code.', category: 'mcp-protocols', tags: ['mcp', 'github', 'git', 'pull-requests', 'official'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to give coding agents native, permission-scoped access to GitHub repositories, issues, and PR workflows.', stack: ['mcp', 'github', 'go'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'llmstxt-hub', name: 'llms.txt Hub', url: '[https://llmstxthub.com/](https://llmstxthub.com/)', repoUrl: '[https://github.com/thedaviddias/llms-txt-hub](https://github.com/thedaviddias/llms-txt-hub)', description: 'Open-source directory of AI-ready websites, developer docs, and tools implementing the llms.txt and llms-full.txt markdown standard.', category: 'mcp-protocols', tags: ['llms-txt', 'directory', 'markdown', 'ai-discovery', 'docs'], featured: true, resourceType: 'tool', whenToUse: 'Use to find clean llms.txt documentation endpoints for third-party tools or benchmark your own llms.txt structure.', stack: ['markdown', 'llms-txt'], pricing: 'open-source', agentConsumable: true,
  },

  // === AGENT SDKS & EVALS ===
  {
    id: 'vercel-ai-sdk', name: 'Vercel AI SDK', url: '[https://ai-sdk.dev/](https://ai-sdk.dev/)', repoUrl: '[https://github.com/vercel/ai](https://github.com/vercel/ai)', description: 'Open-source TypeScript AI toolkit providing unified multi-model APIs, structured outputs, tool calling, streaming UI, and agent primitives.', category: 'agent-infra', tags: ['typescript', 'ai-sdk', 'streaming', 'agents', 'vercel'], featured: true, resourceType: 'library', whenToUse: 'Use as the primary TypeScript abstraction layer for multi-provider LLM calls, structured JSON generation, and tool loops.', stack: ['typescript', 'react', 'node', 'vercel'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'mastra', name: 'Mastra', url: '[https://github.com/mastra-ai/mastra](https://github.com/mastra-ai/mastra)', repoUrl: '[https://github.com/mastra-ai/mastra](https://github.com/mastra-ai/mastra)', description: 'Open-source TypeScript agent framework combining agent execution, branching workflows, memory, RAG, human-in-the-loop pauses, tracing, and evals.', category: 'agent-infra', tags: ['typescript', 'agents', 'workflows', 'memory', 'evals'], featured: true, resourceType: 'library', whenToUse: 'Use when building full-stack TypeScript agents that combine deterministic workflows, memory, and local studio debugging.', stack: ['typescript', 'node'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'langgraph', name: 'LangGraph', url: '[https://github.com/langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)', repoUrl: '[https://github.com/langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)', description: 'Open-source Python and TypeScript orchestration framework for stateful, long-running agents with explicit branching, checkpointing, and human review.', category: 'agent-infra', tags: ['agents', 'state-machine', 'python', 'typescript', 'human-in-the-loop'], featured: true, resourceType: 'library', whenToUse: 'Use for complex multi-agent pipelines requiring persistent checkpoints, deterministic routing, and approval gates.', stack: ['python', 'typescript'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'pydantic-ai', name: 'Pydantic AI', url: '[https://github.com/pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai)', repoUrl: '[https://github.com/pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai)', description: 'Type-safe Python agent framework built by the Pydantic team featuring strict output validation, dependency injection, provider fallbacks, and MCP support.', category: 'agent-infra', tags: ['python', 'pydantic', 'agents', 'type-safe', 'structured-output'], featured: true, resourceType: 'library', whenToUse: 'Use when building production Python agents that require strict schema validation and clean dependency injection.', stack: ['python', 'pydantic', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'promptfoo', name: 'Promptfoo', url: '[https://github.com/promptfoo/promptfoo](https://github.com/promptfoo/promptfoo)', repoUrl: '[https://github.com/promptfoo/promptfoo](https://github.com/promptfoo/promptfoo)', description: 'Open-source CLI and library for automated LLM prompt evaluation, agent regression benchmarks, model comparisons, and security red-teaming in CI/CD.', category: 'agent-infra', tags: ['evals', 'red-teaming', 'testing', 'ci-cd', 'prompts'], featured: true, resourceType: 'tool', whenToUse: 'Use to run deterministic regression tests, benchmark model upgrades, and red-team prompt/agent security in CI.', stack: ['cli', 'typescript', 'github-actions'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'langfuse', name: 'Langfuse', url: '[https://github.com/langfuse/langfuse](https://github.com/langfuse/langfuse)', repoUrl: '[https://github.com/langfuse/langfuse](https://github.com/langfuse/langfuse)', description: 'Open-source LLM engineering platform for tracing agent runs, prompt versioning, latency/cost analytics, and evaluation datasets.', category: 'agent-infra', tags: ['observability', 'tracing', 'evals', 'analytics', 'open-source'], featured: true, resourceType: 'tool', whenToUse: 'Use to inspect multi-step agent traces, monitor token costs, and version prompts with self-hostable observability.', stack: ['typescript', 'python', 'docker', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'e2b-sandboxes', name: 'E2B', url: '[https://github.com/e2b-dev/e2b](https://github.com/e2b-dev/e2b)', repoUrl: '[https://github.com/e2b-dev/e2b](https://github.com/e2b-dev/e2b)', description: 'Open-source secure cloud sandboxes designed for AI agents to safely execute generated code, shell commands, and real-world tools in isolation.', category: 'agent-infra', tags: ['sandbox', 'code-execution', 'security', 'agents', 'infrastructure'], featured: true, resourceType: 'tool', whenToUse: 'Use when autonomous agents need an isolated VM sandbox to run untrusted code, install packages, or test builds safely.', stack: ['typescript', 'python', 'sandbox'], pricing: 'freemium', agentConsumable: true,
  },

  // === ICONS, COLOR & ASSETS ===
  {
    id: 'lucide-icons', name: 'Lucide', url: '[https://lucide.dev/](https://lucide.dev/)', description: 'Consistent, lightweight open-source library of 1,600+ vector SVG icons with tree-shakeable packages for React, Vue, Svelte, and vanilla web apps.', category: 'icons-assets', tags: ['icons', 'svg', 'react', 'minimal', 'open-source'], featured: true, resourceType: 'library', whenToUse: 'Use as the default minimal stroke icon system for clean dashboards, developer tools, and SaaS interfaces.', stack: ['react', 'vue', 'svelte', 'svg'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'phosphor-icons', name: 'Phosphor Icons', url: '[https://phosphoricons.com/](https://phosphoricons.com/)', description: 'Flexible open-source icon family designed for interfaces and diagrams across six weights: thin, light, regular, bold, fill, and duotone.', category: 'icons-assets', tags: ['icons', 'svg', 'duotone', 'multi-weight', 'open-source'], featured: true, resourceType: 'library', whenToUse: 'Use when an interface needs expressive multi-weight icons (such as duotone or fill states) with strong visual consistency.', stack: ['react', 'vue', 'svg', 'figma'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'svgl', name: 'SVGL', url: '[https://svgl.app/](https://svgl.app/)', repoUrl: '[https://github.com/pheralb/svgl](https://github.com/pheralb/svgl)', description: 'Curated open-source library and API of clean SVG brand, framework, and developer tool logos ready to copy or fetch programmatically.', category: 'icons-assets', tags: ['svg', 'logos', 'brands', 'api', 'open-source'], featured: true, resourceType: 'tool', whenToUse: 'Use to grab crisp, standardized SVG logos of tech stacks, AI models, and platforms without hunting brand kits.', stack: ['svg', 'api'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'oklch-color-picker', name: 'OKLCH Color Picker', url: '[https://oklch.com/](https://oklch.com/)', repoUrl: '[https://github.com/evilmartians/oklch-picker](https://github.com/evilmartians/oklch-picker)', description: 'Perceptually uniform OKLCH color picker and CSS converter by Evil Martians with P3 wide-gamut visualization and contrast awareness.', category: 'icons-assets', tags: ['color', 'oklch', 'css', 'p3-gamut', 'accessibility'], featured: true, resourceType: 'tool', whenToUse: 'Use when authoring modern Tailwind v4 / CSS OKLCH color palettes with predictable lightness and contrast.', stack: ['css', 'tailwind'], pricing: 'open-source', agentConsumable: false,
  },
  {
    id: 'radix-colors', name: 'Radix Colors', url: '[https://www.radix-ui.com/colors](https://www.radix-ui.com/colors)', description: 'Accessible 12-step UI color system with automatic light/dark mode parity, P3 gamut support, transparent scales, and APCA contrast guarantees.', category: 'icons-assets', tags: ['color-system', 'dark-mode', 'accessibility', 'apca', 'css'], featured: true, resourceType: 'library', whenToUse: 'Use to adopt battle-tested 12-step neutral and accent color scales guaranteed to pass UI text contrast in light and dark mode.', stack: ['css', 'react', 'tailwind'], pricing: 'open-source', agentConsumable: true,
  },

  // === DESIGN SYSTEMS & A11Y ===
  {
    id: 'base-ui', name: 'Base UI', url: '[https://base-ui.com/](https://base-ui.com/)', repoUrl: '[https://github.com/mui/base-ui](https://github.com/mui/base-ui)', description: 'Headless, unstyled, accessible React UI component primitives built by the MUI team for crafting custom design systems with zero styling lock-in.', category: 'design-systems', tags: ['headless-ui', 'react', 'accessibility', 'primitives', 'design-system'], featured: true, resourceType: 'library', whenToUse: 'Use as the accessible behavioral foundation (dialogs, popovers, selects, menus) when styling entirely with Tailwind or custom CSS.', stack: ['react', 'typescript', 'tailwind'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'style-dictionary', name: 'Style Dictionary', url: '[https://styledictionary.com/](https://styledictionary.com/)', repoUrl: '[https://github.com/style-dictionary/style-dictionary](https://github.com/style-dictionary/style-dictionary)', description: 'Open-source build system for transforming a single source of design tokens into CSS variables, TypeScript, iOS, Android, and documentation outputs.', category: 'design-systems', tags: ['design-tokens', 'build-tool', 'css-variables', 'cross-platform', 'design-system'], featured: true, resourceType: 'tool', whenToUse: 'Use to compile standardized JSON design tokens into multi-platform theme variables in automated CI pipelines.', stack: ['json', 'css', 'typescript', 'ios', 'android'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'component-gallery', name: 'The Component Gallery', url: '[https://component.gallery/](https://component.gallery/)', description: 'Reference index cataloging real-world UI component naming, anatomy, and implementation patterns across dozens of public production design systems.', category: 'design-systems', tags: ['design-systems', 'components', 'reference', 'naming', 'ux-architecture'], featured: true, resourceType: 'gallery', whenToUse: 'Use to compare component APIs, accessibility conventions, and naming standards across top public design systems.', pricing: 'free', agentConsumable: false,
  },
  {
    id: 'design-systems-surf', name: 'Design Systems Surf', url: '[https://designsystems.surf/](https://designsystems.surf/)', description: 'Browsable directory of public design systems, component libraries, and token guidelines enabling side-by-side pattern benchmarking.', category: 'design-systems', tags: ['design-systems', 'directory', 'benchmarks', 'ui-guidelines'], featured: false, resourceType: 'gallery', whenToUse: 'Use to inspect how leading product teams structure foundations, spacing scales, and component documentation.', pricing: 'free', agentConsumable: false,
  },
];

/** 43 verified free/open-source MCP servers. */
const FREE_MCP_SERVERS: Resource[] = [
  // === 1. REFERENCE, SDKS, GATEWAYS & PROXIES ===
  {
    id: 'mcp-reference-servers', name: 'MCP Official Reference Servers', url: '[https://github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)', repoUrl: '[https://github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)', description: 'Official open-source collection of reference MCP servers including Filesystem, Memory, Fetch, Git, Sequential Thinking, and Time with Streamable HTTP support.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-reference', 'filesystem', 'memory', 'git', 'sequential-thinking'], featured: true, resourceType: 'github-repo', whenToUse: 'Use as the baseline free local MCP servers for safe filesystem access, persistent graph memory, web fetch, and structured reasoning.', stack: ['mcp', 'typescript', 'python', 'npx', 'uvx'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'punkpeye-awesome-mcp-servers', name: 'Awesome MCP Servers (punkpeye)', url: '[https://github.com/punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers)', repoUrl: '[https://github.com/punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers)', description: 'Massive community-curated GitHub index of open-source and hosted MCP servers tagged by language, OS compatibility, and local/cloud execution.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'directory', 'awesome-list', 'open-source'], featured: true, resourceType: 'github-repo', whenToUse: 'Use when scanning the broader open-source ecosystem for niche or domain-specific MCP servers.', stack: ['mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'mcp-so-free-collection', name: 'MCP.so Free MCP Servers', url: '[https://mcp.so/collections/free-mcp-servers](https://mcp.so/collections/free-mcp-servers)', description: 'Curated collection of zero-login remote MCP endpoints and top open-source local MCP servers that work without paid API keys.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'directory', 'no-auth', 'remote-mcp'], featured: false, resourceType: 'tool', whenToUse: 'Use to discover free remote no-auth MCP endpoints and high-star local servers quickly.', stack: ['mcp'], pricing: 'free', agentConsumable: true,
  },
  {
    id: 'mcpservers-org', name: 'MCPServers.org Directory', url: '[https://mcpservers.org/](https://mcpservers.org/)', description: 'Categorized directory highlighting official vendor-maintained and community MCP servers across development, databases, browser automation, and cloud.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'directory', 'official', 'discovery'], featured: false, resourceType: 'tool', whenToUse: 'Use to filter verified official MCP servers by topic such as web scraping, browser automation, or databases.', stack: ['mcp'], pricing: 'free', agentConsumable: true,
  },
  {
    id: 'fastmcp', name: 'FastMCP', url: '[https://github.com/PrefectHQ/fastmcp](https://github.com/PrefectHQ/fastmcp)', repoUrl: '[https://github.com/PrefectHQ/fastmcp](https://github.com/PrefectHQ/fastmcp)', description: 'Pythonic open-source framework for rapidly building production MCP servers and clients with automatic schema generation and validation.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-sdk', 'python', 'framework'], featured: true, resourceType: 'library', whenToUse: 'Use to build custom Python MCP servers cleanly with decorator-based tools, resources, and built-in validation.', stack: ['python', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'mcp-use', name: 'mcp-use', url: '[https://github.com/mcp-use/mcp-use](https://github.com/mcp-use/mcp-use)', repoUrl: '[https://github.com/mcp-use/mcp-use](https://github.com/mcp-use/mcp-use)', description: 'Open-source fullstack MCP framework for connecting any LLM to MCP servers and building MCP apps for Claude, ChatGPT, and custom agents.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-sdk', 'framework', 'fullstack'], featured: false, resourceType: 'library', whenToUse: 'Use to connect custom LLM pipelines to any MCP server or scaffold fullstack MCP-powered agent apps.', stack: ['typescript', 'python', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'docker-mcp-gateway', name: 'Docker MCP Gateway', url: '[https://github.com/docker/mcp-gateway](https://github.com/docker/mcp-gateway)', repoUrl: '[https://github.com/docker/mcp-gateway](https://github.com/docker/mcp-gateway)', description: 'Official open-source Docker CLI plugin and MCP gateway for running, isolating, and managing containerized MCP servers securely.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-proxy', 'docker', 'containers', 'security'], featured: true, resourceType: 'tool', whenToUse: 'Use to isolate third-party MCP servers inside Docker containers and expose them through a single controlled gateway.', stack: ['docker', 'go', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: '1mcp-agent', name: '1MCP Agent', url: '[https://github.com/1mcp-app/agent](https://github.com/1mcp-app/agent)', repoUrl: '[https://github.com/1mcp-app/agent](https://github.com/1mcp-app/agent)', description: 'Unified open-source Model Context Protocol server that aggregates multiple MCP servers behind a single multiplexed endpoint.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-proxy', 'aggregator', 'multiplexer'], featured: false, resourceType: 'tool', whenToUse: 'Use to consolidate dozens of local and remote MCP servers into one unified client configuration.', stack: ['typescript', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'terse-mcp', name: 'Terse MCP Proxy', url: '[https://github.com/inth3shadows/terse](https://github.com/inth3shadows/terse)', repoUrl: '[https://github.com/inth3shadows/terse](https://github.com/inth3shadows/terse)', description: 'Transparent, lossless local proxy for any MCP server that shrinks verbose tool payloads and sends deltas on repeated calls to save context tokens.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-proxy', 'token-optimization', 'context'], featured: true, resourceType: 'tool', whenToUse: 'Use in front of verbose MCP servers to reduce LLM token consumption without dropping data or running an extra model.', stack: ['python', 'uv', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },

  // === 2. CODE INTELLIGENCE, AST, LSP & DEVTOOLS ===
  {
    id: 'chrome-devtools-mcp', name: 'Chrome DevTools MCP', url: '[https://github.com/ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)', repoUrl: '[https://github.com/ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)', description: 'Official Google Chrome DevTools MCP server allowing coding agents to control, debug, inspect network/console logs, and profile a live Chrome browser.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-coding', 'chrome', 'devtools', 'debugging', 'performance'], featured: true, resourceType: 'github-repo', whenToUse: 'Use when coding agents need live DOM inspection, console/network debugging, or Core Web Vitals profiling in Chrome.', stack: ['typescript', 'chrome', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'serena-mcp', name: 'Serena', url: '[https://github.com/oraios/serena](https://github.com/oraios/serena)', repoUrl: '[https://github.com/oraios/serena](https://github.com/oraios/serena)', description: 'Open-source coding agent MCP toolkit offering IDE-grade semantic symbol retrieval and targeted code editing via Language Server Protocol (LSP).', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-coding', 'lsp', 'semantic-search', 'refactoring'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to give coding agents precise symbol-level navigation, find-references, and surgical edits across large codebases.', stack: ['python', 'lsp', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'codebase-memory-mcp', name: 'Codebase Memory MCP', url: '[https://github.com/DeusData/codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp)', repoUrl: '[https://github.com/DeusData/codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp)', description: 'Single-binary local code intelligence MCP server that indexes repositories into a persistent knowledge graph across 160+ languages for sub-ms queries.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-coding', 'knowledge-graph', 'token-optimization'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to map code, docs, configs, and call graphs locally so agents answer architecture queries using far fewer tokens.', stack: ['mcp', 'ast', 'graph'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'jcodemunch-mcp', name: 'jCodeMunch MCP', url: '[https://github.com/jgravelle/jcodemunch-mcp](https://github.com/jgravelle/jcodemunch-mcp)', repoUrl: '[https://github.com/jgravelle/jcodemunch-mcp](https://github.com/jgravelle/jcodemunch-mcp)', description: 'Local tree-sitter AST MCP server for symbol-level code retrieval, fetching exact functions and classes instead of whole files to save ~96% tokens.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-coding', 'tree-sitter', 'ast', 'token-optimization'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to retrieve specific symbols from local or GitHub repositories without burning context window on full-file reads.', stack: ['python', 'tree-sitter', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'octocode-mcp', name: 'Octocode MCP', url: '[https://github.com/bgauryy/Octocode](https://github.com/bgauryy/Octocode)', repoUrl: '[https://github.com/bgauryy/Octocode](https://github.com/bgauryy/Octocode)', description: 'Open-source code research MCP server combining GitHub pull-request history search with local ripgrep, filesystem, and LSP navigation tools.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-coding', 'github', 'ripgrep', 'lsp'], featured: false, resourceType: 'github-repo', whenToUse: 'Use when investigating why code exists across local files and GitHub PR history with structured research tools.', stack: ['typescript', 'github', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'next-devtools-mcp', name: 'Next.js DevTools MCP', url: '[https://github.com/vercel/next-devtools-mcp](https://github.com/vercel/next-devtools-mcp)', repoUrl: '[https://github.com/vercel/next-devtools-mcp](https://github.com/vercel/next-devtools-mcp)', description: 'Official Vercel MCP server providing Next.js development diagnostics, route inspection, runtime errors, and documentation tools for coding agents.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-coding', 'nextjs', 'vercel', 'devtools'], featured: false, resourceType: 'github-repo', whenToUse: 'Use inside Next.js repositories to expose runtime errors, route structures, and official docs directly to coding agents.', stack: ['typescript', 'nextjs', 'vercel', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'executeautomation-playwright-mcp', name: 'ExecuteAutomation Playwright MCP', url: '[https://github.com/executeautomation/mcp-playwright](https://github.com/executeautomation/mcp-playwright)', repoUrl: '[https://github.com/executeautomation/mcp-playwright](https://github.com/executeautomation/mcp-playwright)', description: 'Community open-source Playwright MCP server for automating both web browsers and REST API tests from Claude, Cursor, and Cline.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-browser', 'playwright', 'api-testing', 'qa'], featured: false, resourceType: 'github-repo', whenToUse: 'Use when combining Playwright browser E2E actions with direct HTTP API assertions inside a single free MCP server.', stack: ['typescript', 'playwright', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'markitdown-mcp', name: 'Microsoft MarkItDown', url: '[https://github.com/microsoft/markitdown](https://github.com/microsoft/markitdown)', repoUrl: '[https://github.com/microsoft/markitdown](https://github.com/microsoft/markitdown)', description: 'Official Microsoft open-source Python tool and MCP server converting PDFs, PowerPoint, Word, Excel, HTML, and audio into clean LLM-ready Markdown.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-coding', 'markdown', 'pdf', 'document-parsing'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to let AI agents cleanly ingest local PDF, DOCX, XLSX, and PPTX files as structured Markdown.', stack: ['python', 'markdown', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },

  // === 3. DESIGN, UI, 3D & KNOWLEDGE ===
  {
    id: 'figma-official-mcp', name: 'Figma Official MCP Server', url: '[https://github.com/figma/mcp-server-guide](https://github.com/figma/mcp-server-guide)', repoUrl: '[https://github.com/figma/mcp-server-guide](https://github.com/figma/mcp-server-guide)', description: 'Official Figma MCP server guide and integration enabling coding agents to read Figma design frames, variables, components, and tokens.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-design', 'figma', 'design-to-code', 'official'], featured: true, resourceType: 'docs', whenToUse: 'Use to connect coding agents directly to Figma design files and design tokens for accurate UI implementation.', stack: ['figma', 'mcp'], pricing: 'freemium', agentConsumable: true,
  },
  {
    id: 'framelink-figma-context-mcp', name: 'Framelink Figma Context MCP', url: '[https://github.com/glips/figma-context-mcp](https://github.com/glips/figma-context-mcp)', repoUrl: '[https://github.com/glips/figma-context-mcp](https://github.com/glips/figma-context-mcp)', description: 'Open-source MCP server that compresses Figma API responses into clean layout and styling metadata optimized for AI coding agents.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-design', 'figma', 'layout', 'design-to-code'], featured: true, resourceType: 'github-repo', whenToUse: 'Use as a lightweight open-source bridge to feed simplified Figma layout hierarchy to Cursor, Windsurf, or Claude Code.', stack: ['typescript', 'figma', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: '21st-magic-mcp', name: '21st.dev Magic MCP', url: '[https://github.com/21st-dev/magic-mcp](https://github.com/21st-dev/magic-mcp)', repoUrl: '[https://github.com/21st-dev/magic-mcp](https://github.com/21st-dev/magic-mcp)', description: 'Open-source MCP server that lets AI editors search 10,000+ React and Tailwind UI components and scaffold polished interface blocks directly in code.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-design', 'react', 'tailwind', 'ui-components'], featured: true, resourceType: 'github-repo', whenToUse: 'Use inside coding agents to search and insert modern React + Tailwind UI components on demand.', stack: ['typescript', 'react', 'tailwind', 'mcp'], pricing: 'freemium', agentConsumable: true,
  },
  {
    id: 'shadcn-ui-mcp', name: 'shadcn/ui Official MCP Server', url: '[https://ui.shadcn.com/docs/official](https://ui.shadcn.com/docs/official)', repoUrl: '[https://github.com/shadcn-ui/ui](https://github.com/shadcn-ui/ui)', description: 'Official shadcn/ui registry and MCP server allowing coding agents to discover, inspect, and install accessible React/Tailwind components accurately.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-design', 'shadcn', 'react', 'tailwind'], featured: true, resourceType: 'library', whenToUse: 'Use so coding agents pull exact shadcn/ui registry schemas and component code without hallucinating props.', stack: ['react', 'typescript', 'tailwind', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'blender-mcp', name: 'Blender MCP', url: '[https://github.com/ahujasid/mcp-for-blender](https://github.com/ahujasid/mcp-for-blender)', repoUrl: '[https://github.com/ahujasid/mcp-for-blender](https://github.com/ahujasid/mcp-for-blender)', description: 'Open-source MCP integration connecting AI agents directly to Blender to create, modify, inspect, and render 3D scenes via natural language.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-design', '3d', 'blender', 'python'], featured: false, resourceType: 'github-repo', whenToUse: 'Use when controlling Blender scenes, geometry, materials, and lighting directly from an AI agent.', stack: ['python', 'blender', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'notion-mcp-server', name: 'Notion Official MCP Server', url: '[https://github.com/makenotion/notion-mcp-server](https://github.com/makenotion/notion-mcp-server)', repoUrl: '[https://github.com/makenotion/notion-mcp-server](https://github.com/makenotion/notion-mcp-server)', description: 'Official open-source Notion MCP server designed for token-efficient workspace search, page reading, database queries, and updates.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-knowledge', 'notion', 'docs', 'official'], featured: false, resourceType: 'github-repo', whenToUse: 'Use to let AI agents search product specs, read docs, and update Notion databases with low token overhead.', stack: ['typescript', 'notion', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'obsidian-mcp', name: 'Obsidian MCP Server', url: '[https://github.com/MarkusPfundstein/mcp-obsidian](https://github.com/MarkusPfundstein/mcp-obsidian)', repoUrl: '[https://github.com/MarkusPfundstein/mcp-obsidian](https://github.com/MarkusPfundstein/mcp-obsidian)', description: 'Open-source local MCP server connecting AI agents to Obsidian vaults via the Local REST API plugin for reading, searching, and updating Markdown notes.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-knowledge', 'obsidian', 'markdown', 'local'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to give local AI agents read/write access to personal or project knowledge bases stored in Obsidian.', stack: ['python', 'obsidian', 'markdown', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },

  // === 4. DATABASES, SQL, NOSQL & VECTOR MEMORY ===
  {
    id: 'google-mcp-toolbox-databases', name: 'Google MCP Toolbox for Databases', url: '[https://github.com/googleapis/mcp-toolbox](https://github.com/googleapis/mcp-toolbox)', repoUrl: '[https://github.com/googleapis/mcp-toolbox](https://github.com/googleapis/mcp-toolbox)', description: 'Official Google open-source MCP server (formerly Gen AI Toolbox) for secure, connection-pooled, YAML-configured SQL and database tools.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-database', 'google', 'sql', 'postgres', 'bigquery'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to expose governed, parameterized database queries across Postgres, MySQL, BigQuery, AlloyDB, and Spanner to agents.', stack: ['go', 'sql', 'gcp', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'bytebase-dbhub', name: 'DBHub (Bytebase)', url: '[https://github.com/bytebase/dbhub](https://github.com/bytebase/dbhub)', repoUrl: '[https://github.com/bytebase/dbhub](https://github.com/bytebase/dbhub)', description: 'Universal, token-conscious open-source database MCP server supporting PostgreSQL, MySQL, MariaDB, SQL Server, and SQLite with a built-in workbench.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-database', 'postgres', 'sqlite', 'sqlserver', 'mysql'], featured: true, resourceType: 'github-repo', whenToUse: 'Use as a single universal MCP server to inspect schemas and run safe read-only SQL queries across multiple SQL engines.', stack: ['typescript', 'sql', 'postgres', 'sqlite', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'supabase-mcp', name: 'Supabase MCP Server', url: '[https://github.com/supabase-community/supabase-mcp](https://github.com/supabase-community/supabase-mcp)', repoUrl: '[https://github.com/supabase-community/supabase-mcp](https://github.com/supabase-community/supabase-mcp)', description: 'Official open-source MCP server for managing Supabase projects, Postgres migrations, SQL queries, Edge Functions, logs, and TypeScript type generation.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-database', 'supabase', 'postgres', 'backend'], featured: true, resourceType: 'github-repo', whenToUse: 'Use when developing Supabase backends to run migrations, inspect tables, read logs, and sync types from an AI agent.', stack: ['typescript', 'supabase', 'postgres', 'mcp'], pricing: 'freemium', agentConsumable: true,
  },
  {
    id: 'neon-mcp-server', name: 'Neon MCP Server', url: '[https://github.com/neondatabase/mcp-server-neon](https://github.com/neondatabase/mcp-server-neon)', repoUrl: '[https://github.com/neondatabase/mcp-server-neon](https://github.com/neondatabase/mcp-server-neon)', description: 'Official open-source MCP server for Neon serverless Postgres supporting database branching, safe schema migrations, and SQL execution.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-database', 'neon', 'postgres', 'serverless'], featured: false, resourceType: 'github-repo', whenToUse: 'Use to let coding agents create isolated Postgres branches, test migrations, and inspect Neon databases safely.', stack: ['typescript', 'postgres', 'mcp'], pricing: 'freemium', agentConsumable: true,
  },
  {
    id: 'mongodb-mcp-server', name: 'MongoDB Official MCP Server', url: '[https://github.com/mongodb-js/mongodb-mcp-server](https://github.com/mongodb-js/mongodb-mcp-server)', repoUrl: '[https://github.com/mongodb-js/mongodb-mcp-server](https://github.com/mongodb-js/mongodb-mcp-server)', description: 'Official open-source MongoDB MCP server for querying collections, inspecting document schemas, and managing local MongoDB or Atlas clusters.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-database', 'mongodb', 'nosql', 'official'], featured: false, resourceType: 'github-repo', whenToUse: 'Use to connect AI agents to local MongoDB instances or Atlas clusters for schema inspection and aggregation queries.', stack: ['typescript', 'mongodb', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'redis-mcp-server', name: 'Redis Official MCP Server', url: '[https://github.com/redis/mcp-redis](https://github.com/redis/mcp-redis)', repoUrl: '[https://github.com/redis/mcp-redis](https://github.com/redis/mcp-redis)', description: 'Official open-source Redis MCP server enabling AI agents to inspect keys, manage caches, run vector/full-text search, and interact with streams.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-database', 'redis', 'cache', 'vector-search'], featured: false, resourceType: 'github-repo', whenToUse: 'Use to debug Redis caches, manage key-value/stream structures, or query Redis vector indexes from an agent.', stack: ['python', 'redis', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'qdrant-mcp-server', name: 'Qdrant Official MCP Server', url: '[https://github.com/qdrant/mcp-server-qdrant](https://github.com/qdrant/mcp-server-qdrant)', repoUrl: '[https://github.com/qdrant/mcp-server-qdrant](https://github.com/qdrant/mcp-server-qdrant)', description: 'Official open-source Qdrant MCP server acting as a semantic long-term memory layer to store and retrieve embeddings locally or in Qdrant Cloud.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-database', 'qdrant', 'vector-db', 'agent-memory'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to give coding or personal agents persistent semantic vector memory backed by open-source Qdrant.', stack: ['python', 'qdrant', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'chroma-mcp', name: 'Chroma Official MCP Server', url: '[https://github.com/chroma-core/chroma-mcp](https://github.com/chroma-core/chroma-mcp)', repoUrl: '[https://github.com/chroma-core/chroma-mcp](https://github.com/chroma-core/chroma-mcp)', description: 'Official open-source Chroma MCP server for creating local vector collections, ingesting documents, and performing semantic retrieval for AI agents.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-database', 'chroma', 'vector-db', 'rag'], featured: false, resourceType: 'github-repo', whenToUse: 'Use for lightweight local RAG collections and semantic document retrieval with zero external infrastructure.', stack: ['python', 'chroma', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },

  // === 5. CLOUD, DEVOPS, INFRASTRUCTURE & OBSERVABILITY ===
  {
    id: 'awslabs-mcp', name: 'AWS Labs MCP Servers', url: '[https://github.com/awslabs/mcp](https://github.com/awslabs/mcp)', repoUrl: '[https://github.com/awslabs/mcp](https://github.com/awslabs/mcp)', description: 'Official AWS Labs open-source suite of specialized MCP servers covering AWS documentation, CDK, cost/FinOps analysis, Bedrock, and serverless services.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-cloud', 'aws', 'finops', 'serverless', 'official'], featured: true, resourceType: 'github-repo', whenToUse: 'Use when building or auditing AWS architectures to fetch live AWS docs, CDK best practices, and cost diagnostics.', stack: ['python', 'aws', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'hashicorp-terraform-mcp', name: 'HashiCorp Terraform MCP Server', url: '[https://github.com/hashicorp/terraform-mcp-server](https://github.com/hashicorp/terraform-mcp-server)', repoUrl: '[https://github.com/hashicorp/terraform-mcp-server](https://github.com/hashicorp/terraform-mcp-server)', description: 'Official HashiCorp open-source MCP server providing real-time access to Terraform Registry providers, modules, policies, and IaC documentation.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-cloud', 'terraform', 'iac', 'devops', 'official'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to prevent outdated HCL syntax by querying live Terraform provider schemas and registry modules directly from agents.', stack: ['go', 'terraform', 'docker', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'cloudflare-mcp-server', name: 'Cloudflare Official MCP Server', url: '[https://github.com/cloudflare/mcp-server-cloudflare](https://github.com/cloudflare/mcp-server-cloudflare)', repoUrl: '[https://github.com/cloudflare/mcp-server-cloudflare](https://github.com/cloudflare/mcp-server-cloudflare)', description: 'Official open-source Cloudflare MCP servers for inspecting and managing Workers, KV, R2, D1, observability logs, and documentation.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-cloud', 'cloudflare', 'workers', 'edge', 'official'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to query Cloudflare docs or inspect Workers, D1 databases, R2 buckets, and edge logs from your coding agent.', stack: ['typescript', 'cloudflare', 'mcp'], pricing: 'freemium', agentConsumable: true,
  },
  {
    id: 'kubernetes-mcp-server', name: 'Kubernetes MCP Server', url: '[https://github.com/flux159/mcp-server-kubernetes](https://github.com/flux159/mcp-server-kubernetes)', repoUrl: '[https://github.com/flux159/mcp-server-kubernetes](https://github.com/flux159/mcp-server-kubernetes)', description: 'Open-source MCP server for inspecting pods, deployments, events, logs, and Helm releases across local or remote Kubernetes clusters.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-cloud', 'kubernetes', 'k8s', 'devops'], featured: false, resourceType: 'github-repo', whenToUse: 'Use to diagnose pod crashes, read container logs, and audit Kubernetes resources using kubectl context safely.', stack: ['typescript', 'kubernetes', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'grafana-mcp-server', name: 'Grafana Official MCP Server', url: '[https://github.com/grafana/mcp-grafana](https://github.com/grafana/mcp-grafana)', repoUrl: '[https://github.com/grafana/mcp-grafana](https://github.com/grafana/mcp-grafana)', description: 'Official open-source Grafana MCP server giving AI agents access to dashboards, Prometheus metrics, Loki logs, alerts, and incident context.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-cloud', 'grafana', 'observability', 'prometheus', 'loki'], featured: true, resourceType: 'github-repo', whenToUse: 'Use during incident investigation to let agents query Prometheus metrics, Loki logs, and Grafana dashboards directly.', stack: ['go', 'grafana', 'prometheus', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'sentry-mcp-server', name: 'Sentry Official MCP Server', url: '[https://github.com/getsentry/sentry-mcp](https://github.com/getsentry/sentry-mcp)', repoUrl: '[https://github.com/getsentry/sentry-mcp](https://github.com/getsentry/sentry-mcp)', description: 'Official open-source Sentry MCP server optimized for coding agents to retrieve stack traces, analyze production issues, and trace regressions.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-cloud', 'sentry', 'error-tracking', 'debugging'], featured: false, resourceType: 'github-repo', whenToUse: 'Use to pull real production stack traces and issue metadata straight into Cursor or Claude Code for root-cause fixes.', stack: ['typescript', 'sentry', 'mcp'], pricing: 'freemium', agentConsumable: true,
  },

  // === 6. WEB SEARCH, SCRAPING & WORKFLOW AUTOMATION ===
  {
    id: 'duckduckgo-mcp-server', name: 'DuckDuckGo MCP Server', url: '[https://github.com/nickclyde/duckduckgo-mcp-server](https://github.com/nickclyde/duckduckgo-mcp-server)', repoUrl: '[https://github.com/nickclyde/duckduckgo-mcp-server](https://github.com/nickclyde/duckduckgo-mcp-server)', description: 'Free, open-source MCP server providing web search and webpage content fetching via DuckDuckGo with zero API keys required.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-browser', 'search', 'duckduckgo', 'no-api-key'], featured: true, resourceType: 'github-repo', whenToUse: 'Use when local agents need free web search and content fetching without configuring paid search API keys.', stack: ['python', 'uvx', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'scrapling-mcp', name: 'Scrapling MCP Server', url: '[https://github.com/d4vinci/Scrapling](https://github.com/d4vinci/Scrapling)', repoUrl: '[https://github.com/d4vinci/Scrapling](https://github.com/d4vinci/Scrapling)', description: 'Official open-source MCP server from the Scrapling framework offering adaptive scraping, stealth browser requests, screenshots, and network inspection.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-browser', 'scraping', 'stealth-browser', 'python'], featured: true, resourceType: 'github-repo', whenToUse: 'Use when agents need resilient local web extraction and stealth browser crawling without paid scraping SaaS.', stack: ['python', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'firecrawl-mcp-server', name: 'Firecrawl MCP Server', url: '[https://github.com/mendableai/firecrawl-mcp-server](https://github.com/mendableai/firecrawl-mcp-server)', repoUrl: '[https://github.com/mendableai/firecrawl-mcp-server](https://github.com/mendableai/firecrawl-mcp-server)', description: 'Official open-source Firecrawl MCP server enabling agents to crawl, map, search, and extract clean Markdown or structured JSON from websites (self-hostable or cloud free tier).', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-browser', 'scraping', 'markdown', 'crawl'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to convert full documentation sites or dynamic web pages into clean structured Markdown for agent context.', stack: ['typescript', 'markdown', 'mcp'], pricing: 'freemium', agentConsumable: true,
  },
  {
    id: 'n8n-mcp', name: 'n8n MCP Server', url: '[https://github.com/czlonkowski/n8n-mcp](https://github.com/czlonkowski/n8n-mcp)', repoUrl: '[https://github.com/czlonkowski/n8n-mcp](https://github.com/czlonkowski/n8n-mcp)', description: 'Open-source MCP server giving coding agents full documentation, node schemas, and template context to build and validate n8n workflows accurately.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-automation', 'n8n', 'workflows', 'low-code'], featured: true, resourceType: 'github-repo', whenToUse: 'Use when generating, auditing, or debugging n8n automation workflows with exact node schemas via AI agents.', stack: ['typescript', 'n8n', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'activepieces-mcp', name: 'Activepieces MCP Ecosystem', url: '[https://github.com/activepieces/activepieces](https://github.com/activepieces/activepieces)', repoUrl: '[https://github.com/activepieces/activepieces](https://github.com/activepieces/activepieces)', description: 'Open-source AI workflow automation platform exposing hundreds of self-hostable integrations as ready-to-use MCP servers for AI agents.', category: 'mcp-protocols', tags: ['mcp', 'free-mcp', 'mcp-automation', 'workflows', 'integrations', 'open-source'], featured: false, resourceType: 'github-repo', whenToUse: 'Use to expose hundreds of SaaS and webhook connectors as governed MCP tools via a single self-hosted open-source hub.', stack: ['typescript', 'docker', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
];


/** 40 open-source AI agent templates and starter kits. */
const AI_AGENT_TEMPLATES: Resource[] = [
  // === 1. OFFICIAL PROVIDER, CLOUD & A2A STARTER TEMPLATES ===
  {
    id: 'vercel-ai-chatbot', name: 'Vercel AI Chatbot', url: '[https://github.com/vercel/ai-chatbot](https://github.com/vercel/ai-chatbot)', repoUrl: '[https://github.com/vercel/ai-chatbot](https://github.com/vercel/ai-chatbot)', description: 'Official full-stack Next.js and Vercel AI SDK starter template with streaming responses, artifacts canvas, tool calling, auth, and Postgres persistence.', category: 'agent-templates', tags: ['agent-template', 'template-starter', 'template-ui', 'nextjs', 'vercel-ai-sdk', 'artifacts'], featured: true, resourceType: 'github-repo', whenToUse: 'Use as the fastest production full-stack boilerplate for building a ChatGPT/Claude-style web agent with artifacts and auth on Vercel.', stack: ['typescript', 'nextjs', 'react', 'tailwind', 'postgres', 'vercel'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'anthropic-claude-quickstarts', name: 'Anthropic Claude Quickstarts', url: '[https://github.com/anthropics/claude-quickstarts](https://github.com/anthropics/claude-quickstarts)', repoUrl: '[https://github.com/anthropics/claude-quickstarts](https://github.com/anthropics/claude-quickstarts)', description: 'Official collection of deployable Claude agent starter projects including Customer Support Agent, Financial Data Analyst, and Computer Use reference apps.', category: 'agent-templates', tags: ['agent-template', 'template-starter', 'claude', 'computer-use', 'anthropic'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to clone turnkey Anthropic reference apps demonstrating tool use, data analysis charts, and Computer Use loops.', stack: ['python', 'typescript', 'claude', 'docker'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'anthropic-cookbook-agents', name: 'Anthropic Cookbook (Agent Patterns)', url: '[https://github.com/anthropics/anthropic-cookbook](https://github.com/anthropics/anthropic-cookbook)', repoUrl: '[https://github.com/anthropics/anthropic-cookbook](https://github.com/anthropics/anthropic-cookbook)', description: 'Official Anthropic code templates implementing composable agent architectures: prompt chaining, routing, parallelization, orchestrator-workers, and evaluator-optimizer.', category: 'agent-templates', tags: ['agent-template', 'template-starter', 'template-multi-agent', 'patterns', 'claude'], featured: true, resourceType: 'github-repo', whenToUse: 'Use when implementing clean, minimal, framework-free agentic workflow patterns directly over the LLM API.', stack: ['python', 'claude'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'google-adk-samples', name: 'Google ADK Agent Samples', url: '[https://github.com/google/adk-samples](https://github.com/google/adk-samples)', repoUrl: '[https://github.com/google/adk-samples](https://github.com/google/adk-samples)', description: 'Official Google Agent Development Kit gallery of production-ready multi-agent templates covering software bug triage, data science, research, RAG, and A2A.', category: 'agent-templates', tags: ['agent-template', 'template-starter', 'template-multi-agent', 'google-adk', 'gemini', 'a2a'], featured: true, resourceType: 'github-repo', whenToUse: 'Use as a multi-domain blueprint for structured multi-agent delegation, tool integration, and A2A-compatible agents with Gemini.', stack: ['python', 'gemini', 'gcp', 'a2a'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'gemini-fullstack-langgraph-quickstart', name: 'Gemini Fullstack LangGraph Quickstart', url: '[https://github.com/google-gemini/gemini-fullstack-langgraph-quickstart](https://github.com/google-gemini/gemini-fullstack-langgraph-quickstart)', repoUrl: '[https://github.com/google-gemini/gemini-fullstack-langgraph-quickstart](https://github.com/google-gemini/gemini-fullstack-langgraph-quickstart)', description: 'Official Google full-stack research agent template pairing a React frontend with a LangGraph + Gemini backend that generates queries, reflects on gaps, and cites sources.', category: 'agent-templates', tags: ['agent-template', 'template-starter', 'template-research', 'gemini', 'langgraph', 'react'], featured: true, resourceType: 'github-repo', whenToUse: 'Use as a complete React + Python template for iterative web-research agents with reflection loops and cited answers.', stack: ['react', 'typescript', 'python', 'langgraph', 'gemini'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'openai-agents-python', name: 'OpenAI Agents SDK Templates (Python)', url: '[https://github.com/openai/openai-agents-python](https://github.com/openai/openai-agents-python)', repoUrl: '[https://github.com/openai/openai-agents-python](https://github.com/openai/openai-agents-python)', description: 'Official lightweight Python multi-agent framework and example templates featuring agent handoffs, input/output guardrails, tracing, MCP tools, and research bots.', category: 'agent-templates', tags: ['agent-template', 'template-starter', 'template-multi-agent', 'openai', 'guardrails', 'handoffs'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to scaffold Python multi-agent pipelines with native handoffs, deterministic guardrails, and built-in trace inspection.', stack: ['python', 'openai', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'openai-agents-js', name: 'OpenAI Agents SDK Templates (TypeScript)', url: '[https://github.com/openai/openai-agents-js](https://github.com/openai/openai-agents-js)', repoUrl: '[https://github.com/openai/openai-agents-js](https://github.com/openai/openai-agents-js)', description: 'Official TypeScript/JavaScript multi-agent SDK with ready-to-run templates for handoffs, human-in-the-loop approvals, MCP servers, and realtime voice agents.', category: 'agent-templates', tags: ['agent-template', 'template-starter', 'template-voice', 'typescript', 'openai', 'handoffs'], featured: true, resourceType: 'github-repo', whenToUse: 'Use when building Node.js or browser TypeScript agents needing handoffs, tool approvals, or realtime voice sessions.', stack: ['typescript', 'node', 'openai', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'cloudflare-agents-starter', name: 'Cloudflare Agents Starter', url: '[https://github.com/cloudflare/agents-starter](https://github.com/cloudflare/agents-starter)', repoUrl: '[https://github.com/cloudflare/agents-starter](https://github.com/cloudflare/agents-starter)', description: 'Official serverless edge agent template running on Cloudflare Workers and Durable Objects with persistent SQL state, WebSockets, scheduled tasks, and HITL confirmation.', category: 'agent-templates', tags: ['agent-template', 'template-starter', 'cloudflare', 'edge', 'durable-objects', 'stateful'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to deploy low-latency, stateful edge agents with built-in scheduling, WebSockets, and human-in-the-loop tool approvals.', stack: ['typescript', 'react', 'cloudflare', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'aws-bedrock-agent-samples', name: 'AWS Amazon Bedrock Agent Samples', url: '[https://github.com/aws-samples/amazon-bedrock-samples](https://github.com/aws-samples/amazon-bedrock-samples)', repoUrl: '[https://github.com/aws-samples/amazon-bedrock-samples](https://github.com/aws-samples/amazon-bedrock-samples)', description: 'Official AWS enterprise repository packed with end-to-end agent blueprints, multi-agent collaboration, knowledge bases, and guardrails templates.', category: 'agent-templates', tags: ['agent-template', 'template-starter', 'aws', 'bedrock', 'enterprise', 'guardrails'], featured: false, resourceType: 'github-repo', whenToUse: 'Use when deploying governed enterprise agents, RAG knowledge bases, and multi-agent topologies inside AWS.', stack: ['python', 'aws'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'a2a-official-samples', name: 'A2A Protocol Official Agent Samples', url: '[https://github.com/a2aproject/a2a-samples](https://github.com/a2aproject/a2a-samples)', repoUrl: '[https://github.com/a2aproject/a2a-samples](https://github.com/a2aproject/a2a-samples)', description: 'Official Agent2Agent reference implementations demonstrating interoperable A2A servers and clients built with LangGraph, CrewAI, Google ADK, and TypeScript.', category: 'agent-templates', tags: ['agent-template', 'template-starter', 'a2a', 'json-rpc', 'interoperability', 'multi-framework'], featured: true, resourceType: 'github-repo', whenToUse: 'Use as working reference code for exposing Agent Cards and orchestrating cross-framework A2A agent calls.', stack: ['python', 'typescript', 'a2a', 'langgraph'], pricing: 'open-source', agentConsumable: true,
  },

  // === 2. DEEP RESEARCH, RAG & KNOWLEDGE AGENT TEMPLATES ===
  {
    id: 'langchain-open-deep-research', name: 'Open Deep Research (LangChain)', url: '[https://github.com/langchain-ai/open_deep_research](https://github.com/langchain-ai/open_deep_research)', repoUrl: '[https://github.com/langchain-ai/open_deep_research](https://github.com/langchain-ai/open_deep_research)', description: 'Configurable open-source deep research agent template built on LangGraph that plans outlines, dispatches parallel search subagents, and compiles cited reports.', category: 'agent-templates', tags: ['agent-template', 'template-research', 'langgraph', 'deep-research', 'mcp'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to build customizable deep research pipelines supporting multiple LLM providers, web search APIs, and MCP data sources.', stack: ['python', 'langgraph', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'langchain-agent-chat-ui', name: 'LangChain Agent Chat UI', url: '[https://github.com/langchain-ai/agent-chat-ui](https://github.com/langchain-ai/agent-chat-ui)', repoUrl: '[https://github.com/langchain-ai/agent-chat-ui](https://github.com/langchain-ai/agent-chat-ui)', description: 'Official open-source Next.js frontend template for any LangGraph agent featuring tool-call visualization, file uploads, generative UI, and human-in-the-loop interrupts.', category: 'agent-templates', tags: ['agent-template', 'template-ui', 'langgraph', 'nextjs', 'human-in-the-loop'], featured: true, resourceType: 'github-repo', whenToUse: 'Use as a drop-in web interface for any LangGraph backend that needs streaming tool inspection and approval checkpoints.', stack: ['typescript', 'nextjs', 'react', 'tailwind', 'langgraph'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'chat-langchain', name: 'Chat LangChain (Production RAG Template)', url: '[https://github.com/langchain-ai/chat-langchain](https://github.com/langchain-ai/chat-langchain)', repoUrl: '[https://github.com/langchain-ai/chat-langchain](https://github.com/langchain-ai/chat-langchain)', description: 'Full-stack documentation Q&A agent template demonstrating query routing, hybrid retrieval, streaming citations, and user feedback telemetry.', category: 'agent-templates', tags: ['agent-template', 'template-research', 'rag', 'docs-qa', 'citations'], featured: false, resourceType: 'github-repo', whenToUse: 'Use as a reference blueprint for high-accuracy technical documentation chatbots with grounded source citations.', stack: ['python', 'typescript', 'nextjs', 'langgraph'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'gpt-researcher', name: 'GPT Researcher', url: '[https://github.com/assafelovic/gpt-researcher](https://github.com/assafelovic/gpt-researcher)', repoUrl: '[https://github.com/assafelovic/gpt-researcher](https://github.com/assafelovic/gpt-researcher)', description: 'Autonomous deep research agent architecture using planner and execution subagents to crawl web and local documents and synthesize long-form cited reports.', category: 'agent-templates', tags: ['agent-template', 'template-research', 'template-multi-agent', 'autonomous', 'reports'], featured: true, resourceType: 'github-repo', whenToUse: 'Use when you need a turnkey autonomous researcher capable of multi-source web/local synthesis into Markdown, PDF, or DOCX.', stack: ['python', 'fastapi', 'nextjs', 'docker'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'stanford-storm', name: 'Stanford STORM', url: '[https://github.com/stanford-oval/storm](https://github.com/stanford-oval/storm)', repoUrl: '[https://github.com/stanford-oval/storm](https://github.com/stanford-oval/storm)', description: 'Stanford open-source multi-perspective knowledge curation agent template that simulates expert interviews to research topics and draft structured Wikipedia-style articles.', category: 'agent-templates', tags: ['agent-template', 'template-research', 'multi-perspective', 'knowledge-curation', 'stanford'], featured: false, resourceType: 'github-repo', whenToUse: 'Use to study or deploy perspective-driven multi-agent research that uncovers blind spots before drafting long-form reports.', stack: ['python'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'morphic-ai-search', name: 'Morphic', url: '[https://github.com/miurla/morphic](https://github.com/miurla/morphic)', repoUrl: '[https://github.com/miurla/morphic](https://github.com/miurla/morphic)', description: 'Open-source AI-powered answer engine template (Perplexity-style) built with Next.js and Vercel AI SDK featuring generative UI, search citations, and multi-model support.', category: 'agent-templates', tags: ['agent-template', 'template-research', 'template-ui', 'search-engine', 'nextjs'], featured: true, resourceType: 'github-repo', whenToUse: 'Use as a polished open-source starting point for building an AI search and answer engine with streaming visual cards.', stack: ['typescript', 'nextjs', 'react', 'tailwind', 'vercel'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'perplexica', name: 'Perplexica', url: '[https://github.com/ItzCrazyKns/Perplexica](https://github.com/ItzCrazyKns/Perplexica)', repoUrl: '[https://github.com/ItzCrazyKns/Perplexica](https://github.com/ItzCrazyKns/Perplexica)', description: 'Privacy-first self-hosted AI search agent template combining SearXNG metasearch with local Ollama or cloud LLMs across focus modes (web, academic, code, video).', category: 'agent-templates', tags: ['agent-template', 'template-research', 'template-local', 'ollama', 'searxng', 'self-hosted'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to self-host a private Perplexity-like research agent backed by local Ollama models and SearXNG via Docker.', stack: ['typescript', 'nextjs', 'docker', 'ollama'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'onyx-enterprise-rag', name: 'Onyx (formerly Danswer)', url: '[https://github.com/onyx-dot-app/onyx](https://github.com/onyx-dot-app/onyx)', repoUrl: '[https://github.com/onyx-dot-app/onyx](https://github.com/onyx-dot-app/onyx)', description: 'Open-source enterprise workspace AI assistant and RAG agent platform with 40+ connectors (Drive, Slack, GitHub, Confluence), custom assistants, and access-control sync.', category: 'agent-templates', tags: ['agent-template', 'template-research', 'template-local', 'enterprise-rag', 'connectors'], featured: false, resourceType: 'github-repo', whenToUse: 'Use when deploying a self-hosted company knowledge assistant that respects document-level permissions across SaaS tools.', stack: ['python', 'typescript', 'docker', 'postgres'], pricing: 'open-source', agentConsumable: true,
  },

  // === 3. MULTI-AGENT ORCHESTRATION & WORKFLOW TEMPLATES ===
  {
    id: 'crewai-examples', name: 'CrewAI Examples', url: '[https://github.com/crewAIInc/crewAI-examples](https://github.com/crewAIInc/crewAI-examples)', repoUrl: '[https://github.com/crewAIInc/crewAI-examples](https://github.com/crewAIInc/crewAI-examples)', description: 'Official gallery of 20+ complete role-based multi-agent crew templates including financial stock analysis, landing page generation, recruiting, marketing, and trip planning.', category: 'agent-templates', tags: ['agent-template', 'template-multi-agent', 'crewai', 'role-based', 'python'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to clone ready-made multi-agent team definitions with clear role separation, YAML task specs, and custom tools.', stack: ['python', 'crewai'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'microsoft-autogen', name: 'Microsoft AutoGen & Magentic-One', url: '[https://github.com/microsoft/autogen](https://github.com/microsoft/autogen)', repoUrl: '[https://github.com/microsoft/autogen](https://github.com/microsoft/autogen)', description: 'Event-driven multi-agent framework by Microsoft including Magentic-One generalist team templates, sandboxed code execution, and the AutoGen Studio visual builder.', category: 'agent-templates', tags: ['agent-template', 'template-multi-agent', 'microsoft', 'autogen', 'magentic-one'], featured: true, resourceType: 'github-repo', whenToUse: 'Use for asynchronous multi-agent collaboration architectures or Magentic-One web/file/coder orchestrator teams.', stack: ['python', 'dotnet', 'docker'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'agno-agent-templates', name: 'Agno (formerly Phidata)', url: '[https://github.com/agno-agi/agno](https://github.com/agno-agi/agno)', repoUrl: '[https://github.com/agno-agi/agno](https://github.com/agno-agi/agno)', description: 'High-speed Python multimodal agent framework packed with cookbook templates for finance, SQL analytics, agentic RAG, structured memory, and coordinated multi-agent teams.', category: 'agent-templates', tags: ['agent-template', 'template-multi-agent', 'python', 'multimodal', 'memory', 'sql'], featured: true, resourceType: 'github-repo', whenToUse: 'Use when you want lightweight, low-overhead Python agent templates with built-in memory, vector knowledge, and team routing.', stack: ['python', 'postgres', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'create-llama', name: 'create-llama', url: '[https://github.com/run-llama/create-llama](https://github.com/run-llama/create-llama)', repoUrl: '[https://github.com/run-llama/create-llama](https://github.com/run-llama/create-llama)', description: 'Official LlamaIndex CLI scaffolding tool generating full-stack agentic RAG and multi-agent web apps in Next.js or FastAPI with citations and artifact UIs.', category: 'agent-templates', tags: ['agent-template', 'template-starter', 'llamaindex', 'rag', 'cli', 'fullstack'], featured: false, resourceType: 'tool', whenToUse: 'Use to interactively scaffold a complete LlamaIndex RAG or multi-agent app in seconds with TypeScript or Python backends.', stack: ['typescript', 'nextjs', 'python', 'fastapi'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'n8n-self-hosted-ai-starter-kit', name: 'n8n Self-Hosted AI Starter Kit', url: '[https://github.com/n8n-io/self-hosted-ai-starter-kit](https://github.com/n8n-io/self-hosted-ai-starter-kit)', repoUrl: '[https://github.com/n8n-io/self-hosted-ai-starter-kit](https://github.com/n8n-io/self-hosted-ai-starter-kit)', description: 'Official Docker Compose starter kit bundling n8n, Ollama, Qdrant, and PostgreSQL preconfigured with local AI agent and RAG workflow templates.', category: 'agent-templates', tags: ['agent-template', 'template-local', 'template-multi-agent', 'n8n', 'ollama', 'qdrant', 'docker'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to spin up a 100% local, zero-API-cost agentic workflow lab with visual orchestration, vector storage, and local LLMs.', stack: ['docker', 'n8n', 'ollama', 'qdrant', 'postgres'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'dify-agent-platform', name: 'Dify', url: '[https://github.com/langgenius/dify](https://github.com/langgenius/dify)', repoUrl: '[https://github.com/langgenius/dify](https://github.com/langgenius/dify)', description: 'Open-source visual LLM app and agentic workflow platform featuring a library of importable DSL templates for autonomous tool agents, RAG pipelines, and ops bots.', category: 'agent-templates', tags: ['agent-template', 'template-multi-agent', 'template-local', 'visual-builder', 'dsl', 'rag'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to visually assemble, test, version, and expose production AI agent workflows via REST APIs with self-hosted control.', stack: ['python', 'typescript', 'docker'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'flowise-agentflows', name: 'Flowise', url: '[https://github.com/FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise)', repoUrl: '[https://github.com/FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise)', description: 'Open-source low-code visual builder for multi-agent graphs and RAG flows offering dozens of ready-to-import JSON templates and embeddable chat widgets.', category: 'agent-templates', tags: ['agent-template', 'template-multi-agent', 'low-code', 'visual-builder', 'chat-widget'], featured: false, resourceType: 'github-repo', whenToUse: 'Use to rapidly prototype and ship visual multi-agent flows or embeddable website AI assistants using prebuilt templates.', stack: ['typescript', 'node', 'docker'], pricing: 'open-source', agentConsumable: true,
  },

  // === 4. CODING, APP-BUILDER & BROWSER-USE AGENT TEMPLATES ===
  {
    id: 'openhands-agent', name: 'OpenHands (formerly OpenDevin)', url: '[https://github.com/All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands)', repoUrl: '[https://github.com/All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands)', description: 'Open-source autonomous software engineering agent architecture equipped with Docker sandboxes, shell execution, browser tools, and automated GitHub issue resolvers.', category: 'agent-templates', tags: ['agent-template', 'template-coding', 'autonomous', 'sandbox', 'github', 'swe'], featured: true, resourceType: 'github-repo', whenToUse: 'Use as a production reference architecture for building autonomous coding agents operating inside isolated Docker runtimes.', stack: ['python', 'typescript', 'docker'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'princeton-swe-agent', name: 'SWE-agent (Princeton)', url: '[https://github.com/SWE-agent/SWE-agent](https://github.com/SWE-agent/SWE-agent)', repoUrl: '[https://github.com/SWE-agent/SWE-agent](https://github.com/SWE-agent/SWE-agent)', description: 'Open-source coding agent harness and YAML configuration templates designed to autonomously diagnose and patch real GitHub issues with a dedicated Agent-Computer Interface.', category: 'agent-templates', tags: ['agent-template', 'template-coding', 'swe-bench', 'github', 'aci', 'harness'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to study or customize deterministic Agent-Computer Interfaces (ACI), guardrails, and benchmarked issue-solving loops.', stack: ['python', 'docker'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'bolt-diy', name: 'Bolt.diy', url: '[https://github.com/stackblitz-labs/bolt.diy](https://github.com/stackblitz-labs/bolt.diy)', repoUrl: '[https://github.com/stackblitz-labs/bolt.diy](https://github.com/stackblitz-labs/bolt.diy)', description: 'Open-source full-stack AI app builder agent template running live full-stack code previews inside browser WebContainers with pluggable cloud or local Ollama models.', category: 'agent-templates', tags: ['agent-template', 'template-coding', 'template-ui', 'app-builder', 'webcontainers', 'ollama'], featured: true, resourceType: 'github-repo', whenToUse: 'Use as the complete reference codebase for building a prompt-to-fullstack-app IDE agent with live browser execution.', stack: ['typescript', 'react', 'webcontainers', 'ollama'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'browser-use', name: 'Browser Use', url: '[https://github.com/browser-use/browser-use](https://github.com/browser-use/browser-use)', repoUrl: '[https://github.com/browser-use/browser-use](https://github.com/browser-use/browser-use)', description: 'Open-source autonomous web browser agent framework with turnkey Python templates for form filling, multi-tab research, shopping, and UI workflow automation.', category: 'agent-templates', tags: ['agent-template', 'template-browser', 'playwright', 'web-agent', 'automation'], featured: true, resourceType: 'github-repo', whenToUse: 'Use when an AI agent needs to visually and structurally operate real websites via Playwright with minimal custom selectors.', stack: ['python', 'playwright'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'browserbase-stagehand', name: 'Stagehand', url: '[https://github.com/browserbase/stagehand](https://github.com/browserbase/stagehand)', repoUrl: '[https://github.com/browserbase/stagehand](https://github.com/browserbase/stagehand)', description: 'Open-source TypeScript AI browser automation SDK and templates blending deterministic Playwright scripts with natural-language act, extract, and observe primitives.', category: 'agent-templates', tags: ['agent-template', 'template-browser', 'typescript', 'playwright', 'structured-extraction'], featured: true, resourceType: 'github-repo', whenToUse: 'Use when building reliable production browser agents in TypeScript that combine strict Zod extraction with self-healing selectors.', stack: ['typescript', 'playwright', 'zod'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'e2b-fragments', name: 'E2B Fragments', url: '[https://github.com/e2b-dev/fragments](https://github.com/e2b-dev/fragments)', repoUrl: '[https://github.com/e2b-dev/fragments](https://github.com/e2b-dev/fragments)', description: 'Open-source Claude Artifacts-style code interpreter and live app preview template executing AI-generated Next.js, Vue, Streamlit, and Gradio apps inside E2B sandboxes.', category: 'agent-templates', tags: ['agent-template', 'template-coding', 'template-ui', 'artifacts', 'sandbox', 'nextjs'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to build a multi-language AI code generator that safely executes and previews live generated apps in isolated sandboxes.', stack: ['typescript', 'nextjs', 'python', 'e2b'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'aider-coding-agent', name: 'Aider', url: '[https://github.com/Aider-AI/aider](https://github.com/Aider-AI/aider)', repoUrl: '[https://github.com/Aider-AI/aider](https://github.com/Aider-AI/aider)', description: 'Open-source CLI coding agent reference architecture featuring tree-sitter repo maps, structured search/replace git diffs, automated lint/test loops, and architect/editor split.', category: 'agent-templates', tags: ['agent-template', 'template-coding', 'cli', 'tree-sitter', 'git', 'architect-editor'], featured: false, resourceType: 'github-repo', whenToUse: 'Use as a gold-standard reference for repo-map context packing, reliable diff application, and dual-model architect/editor coding harnesses.', stack: ['python', 'git', 'tree-sitter'], pricing: 'open-source', agentConsumable: true,
  },

  // === 5. COPILOTS, GENERATIVE UI, VOICE, SELF-HOSTED & MEMORY TEMPLATES ===
  {
    id: 'copilotkit', name: 'CopilotKit', url: '[https://github.com/CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit)', repoUrl: '[https://github.com/CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit)', description: 'Open-source framework and starter templates for building in-app AI copilots and CoAgents with shared frontend state, AG-UI protocol, generative UI, and HITL actions.', category: 'agent-templates', tags: ['agent-template', 'template-ui', 'copilot', 'ag-ui', 'generative-ui', 'react'], featured: true, resourceType: 'github-repo', whenToUse: 'Use when embedding an interactive AI copilot directly inside an existing React/Next.js app with shared state and agent-driven UI.', stack: ['typescript', 'react', 'nextjs', 'langgraph'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'assistant-ui', name: 'assistant-ui', url: '[https://github.com/assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui)', repoUrl: '[https://github.com/assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui)', description: 'Open-source React and Tailwind primitives plus full-stack starter templates for AI chat agents with streaming tool-call UIs, branching threads, and AI SDK/LangGraph adapters.', category: 'agent-templates', tags: ['agent-template', 'template-ui', 'react', 'tailwind', 'shadcn', 'chat-ui'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to build bespoke, accessible React agent interfaces with custom generative tool components and clean state management.', stack: ['typescript', 'react', 'tailwind', 'nextjs'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'livekit-agents', name: 'LiveKit Agents', url: '[https://github.com/livekit/agents](https://github.com/livekit/agents)', repoUrl: '[https://github.com/livekit/agents](https://github.com/livekit/agents)', description: 'Official open-source framework and starter templates for realtime multimodal voice and video AI agents with WebRTC, semantic turn detection, telephony, and tool calling.', category: 'agent-templates', tags: ['agent-template', 'template-voice', 'webrtc', 'realtime', 'multimodal', 'telephony'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to ship low-latency voice or video AI agents capable of natural interruption handling and live tool execution.', stack: ['python', 'typescript', 'webrtc'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'pipecat-voice-agents', name: 'Pipecat', url: '[https://github.com/pipecat-ai/pipecat](https://github.com/pipecat-ai/pipecat)', repoUrl: '[https://github.com/pipecat-ai/pipecat](https://github.com/pipecat-ai/pipecat)', description: 'Open-source Python framework with dozens of ready-to-run voice and multimodal agent templates integrating Gemini Live, OpenAI Realtime, WebRTC, and Twilio.', category: 'agent-templates', tags: ['agent-template', 'template-voice', 'python', 'realtime', 'gemini-live', 'multimodal'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to compose customizable real-time audio/video agent pipelines swapping STT, LLM, and TTS providers freely.', stack: ['python', 'webrtc', 'gemini', 'openai'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'open-webui', name: 'Open WebUI', url: '[https://github.com/open-webui/open-webui](https://github.com/open-webui/open-webui)', repoUrl: '[https://github.com/open-webui/open-webui](https://github.com/open-webui/open-webui)', description: 'Feature-rich self-hosted AI workbench and agent platform template supporting Ollama, OpenAI-compatible APIs, built-in RAG, custom Python Pipelines/Functions, and MCP.', category: 'agent-templates', tags: ['agent-template', 'template-local', 'template-ui', 'ollama', 'self-hosted', 'rag'], featured: true, resourceType: 'github-repo', whenToUse: 'Use as a turnkey self-hosted multi-user agent interface running local Ollama models with extensible Python tools and RAG.', stack: ['python', 'svelte', 'docker', 'ollama', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'librechat', name: 'LibreChat', url: '[https://github.com/danny-avila/LibreChat](https://github.com/danny-avila/LibreChat)', repoUrl: '[https://github.com/danny-avila/LibreChat](https://github.com/danny-avila/LibreChat)', description: 'Open-source multi-provider AI workspace and no-code Agents platform template supporting MCP servers, code interpreter, artifacts, multi-model routing, and enterprise auth.', category: 'agent-templates', tags: ['agent-template', 'template-local', 'template-ui', 'mcp', 'self-hosted', 'multi-model'], featured: true, resourceType: 'github-repo', whenToUse: 'Use when deploying a unified self-hosted team AI hub with custom no-code agents, MCP tools, and multi-provider API routing.', stack: ['typescript', 'react', 'node', 'mongodb', 'docker', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'anything-llm', name: 'AnythingLLM', url: '[https://github.com/Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm)', repoUrl: '[https://github.com/Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm)', description: 'All-in-one desktop and Docker self-hosted workspace template with built-in document RAG, custom no-code @agent skills, MCP support, and local/cloud model compatibility.', category: 'agent-templates', tags: ['agent-template', 'template-local', 'rag', 'desktop', 'no-code-agents', 'mcp'], featured: false, resourceType: 'github-repo', whenToUse: 'Use for a fast all-in-one local workspace turning PDFs, repos, and docs into an MCP-enabled private agent assistant.', stack: ['javascript', 'react', 'docker', 'ollama', 'mcp'], pricing: 'open-source', agentConsumable: true,
  },
  {
    id: 'mem0-agent-memory', name: 'Mem0 (Universal Agent Memory)', url: '[https://github.com/mem0ai/mem0](https://github.com/mem0ai/mem0)', repoUrl: '[https://github.com/mem0ai/mem0](https://github.com/mem0ai/mem0)', description: 'Open-source persistent memory layer and integration templates providing user, session, and episodic memory across LangGraph, CrewAI, AutoGen, and custom agents.', category: 'agent-templates', tags: ['agent-template', 'template-starter', 'memory', 'personalization', 'python', 'typescript'], featured: true, resourceType: 'github-repo', whenToUse: 'Use to add structured long-term memory extraction and retrieval to any stateless AI agent template.', stack: ['python', 'typescript', 'qdrant', 'postgres'], pricing: 'open-source', agentConsumable: true,
  },
];

/** Normalizes markdown-wrapped/protocol-prefixed URLs for safe deduplication. */
function normalizeCatalogUrl(url: string): string {
  return url
    .replace(/^\[(https?:\/\/[^\]]+)\]\([^)]*\)$/, '$1')
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/+$/, '');
}

function plainCatalogUrl(url: string): string {
  return url.replace(/^\[(https?:\/\/[^\]]+)\]\([^)]*\)$/, '$1').trim();
}

/** Inserts new resources, merging enriched metadata and tags into existing entries. */
function mergeResources(base: Resource[], incoming: Resource[]): Resource[] {
  const byId = new Map<string, Resource>();
  const byUrl = new Map<string, Resource>();
  const result: Resource[] = base.map((resource) => {
    const copy: Resource = { ...resource, tags: [...resource.tags] };
    byId.set(copy.id, copy);
    byUrl.set(normalizeCatalogUrl(copy.url), copy);
    return copy;
  });

  for (const raw of incoming) {
    const item: Resource = {
      ...raw,
      url: plainCatalogUrl(raw.url),
      ...(raw.repoUrl ? { repoUrl: plainCatalogUrl(raw.repoUrl) } : {}),
      tags: [...raw.tags],
    };
    const target = byId.get(item.id) ?? byUrl.get(normalizeCatalogUrl(item.url));
    if (!target) {
      result.push(item);
      byId.set(item.id, item);
      byUrl.set(normalizeCatalogUrl(item.url), item);
      continue;
    }
    if (!target.repoUrl && item.repoUrl) target.repoUrl = item.repoUrl;
    if (!target.whenToUse && item.whenToUse) target.whenToUse = item.whenToUse;
    if (!target.stack && item.stack) target.stack = item.stack;
    if (!target.pricing && item.pricing) target.pricing = item.pricing;
    if (!target.resourceType && item.resourceType) target.resourceType = item.resourceType;
    if (target.agentConsumable === undefined && item.agentConsumable !== undefined) {
      target.agentConsumable = item.agentConsumable;
    }
    target.tags = [...new Set([...target.tags, ...item.tags])];
  }
  return result;
}

export const resources: Resource[] = mergeResources(BASE_RESOURCES, [
  ...PHASE1_RESOURCES,
  ...FREE_MCP_SERVERS,
  ...AI_AGENT_TEMPLATES,
]);


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