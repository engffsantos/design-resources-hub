'use client';

import { motion } from 'framer-motion';
import { categories, resources } from '@/data/resources';
import { useReducedMotion } from '@/hooks';
import { ptBR } from '@/locales/pt-BR';

interface StatsBarProps {
  filteredCount: number;
}

function StatItem({ label, value, index, prefersReduced }: { label: string; value: number; index: number; prefersReduced: boolean }) {
  if (prefersReduced) {
    return (
      <div className="text-center p-4 bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl border border-border/50">
        <span className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          {value}
        </span>
        <p className="mt-1 text-sm text-muted-foreground">{label}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="text-center p-4 bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm rounded-xl border border-border/50"
    >
      <span className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
        {value}
      </span>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
}

export function StatsBar({ filteredCount }: StatsBarProps) {
  const prefersReduced = useReducedMotion();

  const stats = [
    { label: ptBR.totalResources, value: resources.length },
    { label: ptBR.categories, value: categories.length },
    { label: ptBR.featured, value: resources.filter(r => r.featured).length },
    { label: ptBR.showing, value: filteredCount },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReduced ? 0 : 0.5 }}
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatItem 
            key={stat.label} 
            label={stat.label} 
            value={stat.value} 
            index={index} 
            prefersReduced={prefersReduced} 
          />
        ))}
      </div>
    </motion.div>
  );
}