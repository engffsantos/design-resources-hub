'use client';

import {
  Bot, Boxes, FileText, Layers3, Palette, ShieldCheck, Sparkles, Type, Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { CatalogResource } from '@/lib/catalog';
import { cn } from '@/lib/utils';

interface ResourcePreviewProps {
  resource: CatalogResource;
  featured?: boolean;
}

const gradients: Record<string, string> = {
  'ai-prompts': 'from-violet-500/20 via-fuchsia-500/10 to-transparent',
  landings: 'from-sky-500/20 via-blue-500/10 to-transparent',
  components: 'from-emerald-500/20 via-green-500/10 to-transparent',
  motion: 'from-pink-500/20 via-rose-500/10 to-transparent',
  'micro-interactions': 'from-orange-500/20 via-amber-500/10 to-transparent',
  typography: 'from-amber-500/20 via-yellow-500/10 to-transparent',
  'ux-flows': 'from-indigo-500/20 via-blue-500/10 to-transparent',
  libraries: 'from-cyan-500/20 via-sky-500/10 to-transparent',
  security: 'from-red-500/20 via-rose-500/10 to-transparent',
  'agent-skills': 'from-purple-500/20 via-violet-500/10 to-transparent',
  'mcp-protocols': 'from-teal-500/20 via-emerald-500/10 to-transparent',
  'agent-infra': 'from-sky-500/20 via-cyan-500/10 to-transparent',
  'icons-assets': 'from-fuchsia-500/20 via-pink-500/10 to-transparent',
  'design-systems': 'from-lime-500/20 via-green-500/10 to-transparent',
  'agent-templates': 'from-emerald-500/20 via-teal-500/10 to-transparent',
};

const icons: Record<string, LucideIcon> = {
  'ai-prompts': Sparkles,
  landings: Layers3,
  components: Boxes,
  motion: Sparkles,
  'micro-interactions': Boxes,
  typography: Type,
  'ux-flows': Workflow,
  libraries: Boxes,
  security: ShieldCheck,
  'agent-skills': Bot,
  'mcp-protocols': Workflow,
  'agent-infra': Bot,
  'icons-assets': Palette,
  'design-systems': Layers3,
  'agent-templates': Bot,
};

function BrowserMock() {
  return (
    <div className="w-2/3 rounded-md border border-border bg-card/80 p-2 shadow-sm">
      <div className="mb-2 flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        <span className="h-6 rounded-sm bg-primary/30" />
        <span className="h-6 rounded-sm bg-muted-foreground/20" />
        <span className="h-6 rounded-sm bg-primary/15" />
      </div>
    </div>
  );
}

function NodeMock() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-3 w-3 rounded-full bg-primary/80" />
      <span className="h-px w-8 bg-primary/40" />
      <span className="h-3 w-3 rounded-full border border-primary/60 bg-card" />
      <span className="h-px w-8 bg-primary/40" />
      <span className="h-3 w-3 rounded-full bg-primary/80" />
    </div>
  );
}

function MotionMock() {
  return (
    <div className="flex items-end gap-1.5">
      <span className="h-3 w-2 rounded-full bg-primary/30" />
      <span className="h-6 w-2 rounded-full bg-primary/60" />
      <span className="h-9 w-2 rounded-full bg-primary" />
      <span className="h-6 w-2 rounded-full bg-primary/60" />
      <span className="h-3 w-2 rounded-full bg-primary/30" />
    </div>
  );
}

/**
 * Decorative, deterministic previews built from declared metadata only.
 * They are abstract diagrams — never screenshots or invented brand assets.
 */
export function ResourcePreview({ resource, featured = false }: ResourcePreviewProps) {
  const Icon = icons[resource.category] ?? Boxes;
  const gradient = gradients[resource.category] ?? 'from-primary/15 via-accent/10 to-transparent';
  const isGallery = resource.resourceType === 'gallery' || resource.category === 'landings';
  const isAgent = ['agent-skills', 'agent-infra', 'mcp-protocols', 'agent-templates'].includes(resource.category);

  return (
    <div
      aria-hidden="true"
      data-preview={resource.category}
      className={cn(
        'relative flex items-center justify-center overflow-hidden border-b border-border bg-gradient-to-br',
        gradient,
        featured ? 'h-28' : 'h-20',
      )}
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-xl" />
      <div className="relative flex items-center justify-center">
        {isGallery ? <BrowserMock /> : null}
        {!isGallery && isAgent ? <NodeMock /> : null}
        {!isGallery && !isAgent && resource.category === 'motion' ? <MotionMock /> : null}
        {!isGallery && !isAgent && resource.category === 'typography' ? (
          <span className="text-3xl font-bold tracking-tight text-foreground/80">Aa</span>
        ) : null}
        {!isGallery && !isAgent && resource.category !== 'motion' && resource.category !== 'typography' ? (
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card/80 px-3 py-2 shadow-sm backdrop-blur-sm">
            {resource.category === 'libraries' || resource.category === 'components' || resource.category === 'security'
              ? <FileText className="h-4 w-4 text-primary" />
              : <Icon className="h-4 w-4 text-primary" />}
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {resource.resourceType ?? resource.category}
            </span>
          </div>
        ) : null}
      </div>
      <span className="absolute bottom-2 left-3 h-1 w-8 rounded-full bg-primary/40" />
    </div>
  );
}
