export interface ModuleMeta {
  code: string;
  accent: string;
  accent2: string;
}

export const moduleMeta: Record<string, ModuleMeta> = {
  'html-css': { code: 'HTML', accent: '#fb923c', accent2: '#f59e0b' },
  git: { code: 'GIT', accent: '#fb7185', accent2: '#ef4444' },
  cli: { code: 'CLI', accent: '#34d399', accent2: '#14b8a6' },
  oop: { code: 'OOP', accent: '#a78bfa', accent2: '#8b5cf6' },
  http: { code: 'HTTP', accent: '#38bdf8', accent2: '#0284c7' },
  'js-core': { code: 'JS', accent: '#facc15', accent2: '#f59e0b' },
  typescript: { code: 'TS', accent: '#60a5fa', accent2: '#4f46e5' },
  react: { code: 'REACT', accent: '#22d3ee', accent2: '#3b82f6' },
  redux: { code: 'RTK', accent: '#e879f9', accent2: '#a855f7' },
  'react-router': { code: 'ROUTER', accent: '#fb923c', accent2: '#f43f5e' },
  nextjs: { code: 'NEXT', accent: '#cbd5e1', accent2: '#64748b' },
  architecture: { code: 'ARCH', accent: '#2dd4bf', accent2: '#0ea5e9' },
};

export const fallbackMeta: ModuleMeta = {
  code: 'JS',
  accent: '#7c6cff',
  accent2: '#22d3ee',
};

export function metaFor(id: string): ModuleMeta {
  return moduleMeta[id] ?? fallbackMeta;
}
