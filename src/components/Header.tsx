'use client';

import { motion } from 'framer-motion';
import { Sparkles, Sun, Moon, Github } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useLocalStorage, useReducedMotion } from '@/hooks';

export function Header() {
  const prefersReducedMotion = useReducedMotion();
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300',
        scrolled
          ? 'bg-white/80 dark:bg-dark-950/80 border-b border-border/50 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-8 w-8 text-primary" aria-hidden="true" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Hub de Recursos de Design
            </span>
          </motion.div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? 'Alternar para o modo claro' : 'Alternar para o modo escuro'}
              className="h-10 w-10"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Github className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}