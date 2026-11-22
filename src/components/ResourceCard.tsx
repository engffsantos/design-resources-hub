'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Resource } from '@/data/resources';
import { cn, getCategoryColor, formatUrl } from '@/lib/utils';
import { ptBR } from '@/locales/pt-BR';
import { useReducedMotion } from '@/hooks';

interface ResourceCardProps {
  resource: Resource;
  index: number;
  disableStagger?: boolean;
}

export function ResourceCard({ resource, index, disableStagger = false }: ResourceCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion || disableStagger ? 0 : index * 0.05,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="group"
    >
      <Card
        className={cn(
          'overflow-hidden relative h-full flex flex-col',
          'bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm',
          'border-border/50 dark:border-dark-600/50',
          'hover:border-primary/30 dark:hover:border-primary/700',
          'transition-all duration-300'
        )}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardContent className="flex-1 flex flex-col p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {resource.featured && (
                  <Badge variant="warning" className="gap-1">
                    <Star className="h-3 w-3" />
                    Em destaque
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className={cn(
                    'text-xs px-2 py-0.5',
                    getCategoryColor(resource.category)
                  )}
                >
                  {resource.category.replace('-', ' ')}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-foreground truncate">
                {resource.name}
              </h3>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3 flex-1 mb-4">
            {resource.description}
          </p>

          {resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {resource.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground border border-border"
                >
                  {tag}
                </span>
              ))}
              {resource.tags.length > 4 && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground border border-border">
                  +{resource.tags.length - 4}
                </span>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between p-4 pt-0 border-t border-border/50">
          <span className="text-xs text-muted-foreground font-mono truncate max-w-[150px]">
            {formatUrl(resource.url)}
          </span>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium text-decoration-none hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={ptBR.visitResource.replace('{{name}}', resource.name)}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{ptBR.visit}</span>
          </a>
        </CardFooter>
      </Card>
    </motion.div>
  );
}