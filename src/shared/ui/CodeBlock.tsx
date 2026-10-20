import { useEffect, useRef, useState } from 'react';
import { useLocale } from '../hooks/useLocale';
import { t } from '../lib/i18n';
import { Icon } from './Icon';

interface CodeBlockProps {
  code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const locale = useLocale();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard access can be blocked — keep the snippet selectable */
    }
  };

  return (
    <div className="code-block">
      <div className="code-block__bar">
        <span className="code-block__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <button type="button" className="code-block__copy" onClick={handleCopy}>
          <Icon name={copied ? 'check' : 'copy'} size={14} />
          {copied ? t(locale, 'code.copied') : t(locale, 'code.copy')}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
