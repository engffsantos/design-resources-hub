'use client';

import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { ptBR } from '@/locales/pt-BR';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  resultCount?: number;
}

export function SearchBar({ value, onChange, placeholder = ptBR.searchPlaceholder, resultCount }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  }, [onChange]);

  const handleClear = useCallback(() => {
    setLocalValue('');
    onChange('');
  }, [onChange]);

  return (
    <div className="relative w-full max-w-xl">
      <div
        className={cn(
          'relative flex items-center transition-all duration-200',
          isFocused ? 'scale-[1.02]' : ''
        )}
      >
        <Search
          className={cn(
            'absolute left-4 h-5 w-5 transition-colors duration-200 pointer-events-none',
            isFocused || localValue ? 'text-primary' : 'text-muted-foreground'
          )}
          aria-hidden="true"
        />
        <Input
          type="search"
          value={localValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="pl-10 pr-10 bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20"
          aria-label="Buscar recursos"
          autoComplete="off"
        />
        {localValue && (
          <motion.button
            onClick={handleClear}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-3 h-5 w-5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded"
            aria-label="Limpar busca"
          >
            <X className="h-4 w-4" />
          </motion.button>
        )}
      </div>
      {resultCount !== undefined && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-muted-foreground text-right"
        >
          {resultCount} {resultCount === 1 ? ptBR.resource : ptBR.resources} {ptBR.found}
        </motion.p>
      )}
    </div>
  );
}