import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatUrl(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace('www.', '');
  } catch {
    return url;
  }
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'ai-prompts': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    'landings': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    'components': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    'motion': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
    'micro-interactions': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    'typography': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    'ux-flows': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
    'libraries': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
    'security': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    'agent-skills': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
    'mcp-protocols': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
    'agent-infra': 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
    'icons-assets': 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300',
    'design-systems': 'bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-300',
    'agent-templates': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  };
  return colors[category] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
}
