import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { motion } from 'framer-motion';
import type { Components } from 'react-markdown';

export const CompareDocSection = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/docs/compare.md')
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err) => console.error('Failed to load document', err));
  }, []);

  const components: Components = {
    pre({ children, ...props }) {
      return (
        <div className="relative my-6 rounded-xl border border-border/30 bg-[#0d1117] overflow-x-auto shadow-2xl">
          <pre
            {...props}
            className="m-0 p-5 text-sm font-mono leading-relaxed text-slate-300 overflow-x-auto"
          >
            {children}
          </pre>
        </div>
      );
    },
    code({ children, className, ...props }) {
      // block code inside a <pre> will have a className like "language-xxx"
      const isBlock = Boolean(className);
      if (isBlock) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }
      // inline code
      return (
        <code
          className="bg-muted/60 px-1.5 py-0.5 rounded text-[0.82em] text-violet-300 font-mono font-medium border border-border/30"
          {...props}
        >
          {children}
        </code>
      );
    },
    img({ src, alt, ...props }) {
      return (
        <img
          src={src}
          alt={alt}
          {...props}
          className="rounded-2xl border border-border/40 shadow-[0_4px_32px_rgba(0,0,0,0.5)] mx-auto my-8 max-h-[650px] object-contain transition-transform duration-300 hover:scale-[1.015]"
        />
      );
    },
  };

  return (
    <section id="documentation" className="relative py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <style>{`
            .doc-content h1 {
              font-size: 1.85rem;
              font-weight: 800;
              letter-spacing: -0.02em;
              margin-top: 3rem;
              margin-bottom: 0.85rem;
              padding-bottom: 0.5rem;
              border-bottom: 1px solid rgba(255,255,255,0.08);
              color: hsl(var(--foreground));
            }
            .doc-content h1:first-child { margin-top: 0; }
            .doc-content h2 {
              font-size: 1.4rem;
              font-weight: 700;
              margin-top: 2.5rem;
              margin-bottom: 0.6rem;
              color: hsl(var(--foreground));
            }
            .doc-content h3 {
              font-size: 1.1rem;
              font-weight: 600;
              margin-top: 1.75rem;
              margin-bottom: 0.4rem;
              color: hsl(var(--foreground));
            }
            .doc-content h4 {
              font-size: 0.95rem;
              font-weight: 600;
              margin-top: 1.25rem;
              margin-bottom: 0.3rem;
              color: hsl(var(--foreground));
            }
            .doc-content p {
              font-size: 0.975rem;
              line-height: 1.8;
              margin-top: 0;
              margin-bottom: 0.85rem;
              color: hsl(var(--muted-foreground));
            }
            .doc-content ul,
            .doc-content ol {
              margin-top: 0.4rem;
              margin-bottom: 0.85rem;
              padding-left: 1.4rem;
            }
            .doc-content li {
              margin-top: 0.15rem;
              margin-bottom: 0.15rem;
              line-height: 1.7;
              color: hsl(var(--muted-foreground));
              font-size: 0.975rem;
            }
            .doc-content li > p { margin: 0; }
            .doc-content li > ul,
            .doc-content li > ol { margin-top: 0.1rem; margin-bottom: 0.1rem; }
            .doc-content a {
              color: #60a5fa;
              text-decoration: underline;
              text-underline-offset: 3px;
              transition: color 0.2s;
            }
            .doc-content a:hover { color: #93c5fd; }
            .doc-content strong {
              color: hsl(var(--foreground));
              font-weight: 600;
            }
            .doc-content em {
              font-style: italic;
            }
            .doc-content blockquote {
              border-left: 3px solid #f59e0b;
              background: rgba(245,158,11,0.07);
              padding: 0.65rem 1.1rem;
              border-radius: 0 0.5rem 0.5rem 0;
              margin: 1.1rem 0;
            }
            .doc-content blockquote p {
              margin: 0;
              color: #fcd34d;
              font-size: 0.9rem;
            }
            .doc-content mark {
              background: rgba(234,179,8,0.2);
              color: #fcd34d;
              padding: 0 4px;
              border-radius: 3px;
            }
            .doc-content hr {
              border: none;
              border-top: 1px solid rgba(255,255,255,0.07);
              margin: 2rem 0;
            }
            .doc-content table { width: 100%; border-collapse: collapse; margin: 1.25rem 0; font-size: 0.875rem; }
            .doc-content th {
              border: 1px solid rgba(255,255,255,0.1);
              padding: 0.45rem 0.7rem;
              background: rgba(255,255,255,0.05);
              color: hsl(var(--foreground));
              font-weight: 600;
              text-align: left;
            }
            .doc-content td {
              border: 1px solid rgba(255,255,255,0.06);
              padding: 0.45rem 0.7rem;
              color: hsl(var(--muted-foreground));
            }
          `}</style>

          <div className="doc-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={components}
            >
              {content}
            </ReactMarkdown>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
