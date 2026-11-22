'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Heart, Sparkles } from 'lucide-react';
import { useReducedMotion } from '@/hooks';
import { categories } from '@/data/resources';

export function Footer() {
  const prefersReduced = useReducedMotion();

  return (
    <footer className="border-t border-border/50 bg-white/50 dark:bg-dark-950/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReduced ? 0 : 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Hub de Recursos de Design</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Uma coleção curada dos melhores recursos de design, componentes de UI, prompts de IA{' '}
              e inspiração para desenvolvimento web moderno.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/engffsantos/design-resources-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReduced ? 0 : 0.5, delay: 0.1 }}
          >
            <h3 className="font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {categories.map((cat) => (
                <li key={cat.id}>
                  {cat.id === 'security'
                    ? 'Segurança & Autenticação'
                    : cat.id === 'agent-skills'
                    ? 'Skills de Agente'
                    : cat.label}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReduced ? 0 : 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-semibold">Sobre</h3>
            <p className="text-sm text-muted-foreground">
              Construído com React, TypeScript, Tailwind CSS e Framer Motion.
              Implantado na Vercel.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-red-500" aria-hidden="true" />
              <span>Feito para designers e desenvolvedores</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReduced ? 0 : 0.5, delay: 0.3 }}
          className="mt-10 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground"
        >
          <p>
            Curado com carinho para a comunidade de design.{' '}
            <a href="#" className="underline hover:text-primary">Enviar um recurso</a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}