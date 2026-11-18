import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { BLOG_POSTS } from '../../data/blogPosts';
import { useDocumentHead } from '../../utils/seo';
import { breadcrumbSchema } from '../../utils/schema';
import { BLOG_TITLE, BLOG_DESCRIPTION } from '../../data/blogMeta';

interface Props {
  onNavigatePath: (path: string) => void;
}

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });

export const BlogIndexPage: React.FC<Props> = ({ onNavigatePath }) => {
  useDocumentHead(BLOG_TITLE, BLOG_DESCRIPTION, {
    jsonLd: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
      ]),
    ],
  });

  return (
    <div className="bg-slate-50 pb-16">
      <section className="bg-gradient-to-br from-[#0F2742] via-[#173B5F] to-[#0F2742] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-300 mb-4">
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigatePath('/'); }} className="hover:text-white">Home</a>
            <span className="mx-1.5">/</span>
            <span className="text-white">Blog</span>
          </nav>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">Ottawa Junk Removal Guides</h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-200 leading-relaxed">
            Plain-language answers on City of Ottawa rules, pricing, cleanouts and moving. Written by the crew that does the
            work.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOG_POSTS.map((p) => (
            <article key={p.slug} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-[#173B5F] transition-colors flex flex-col">
              <a
                href={`/blog/${p.slug}`}
                onClick={(e) => { e.preventDefault(); onNavigatePath(`/blog/${p.slug}`); }}
                className="block"
                tabIndex={-1}
                aria-hidden
              >
                <img src={p.image} alt="" loading="lazy" className="w-full h-44 object-cover" />
              </a>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wide text-slate-500 mb-2">
                  <span className="font-bold text-[#FA7415]">{p.category}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {p.readMinutes} min read</span>
                </div>
                <h2 className="text-lg font-extrabold text-[#173B5F] leading-snug">
                  <a
                    href={`/blog/${p.slug}`}
                    onClick={(e) => { e.preventDefault(); onNavigatePath(`/blog/${p.slug}`); }}
                    className="hover:text-[#FA7415]"
                  >
                    {p.title}
                  </a>
                </h2>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">{p.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span>{fmt(p.published)}</span>
                  <a
                    href={`/blog/${p.slug}`}
                    onClick={(e) => { e.preventDefault(); onNavigatePath(`/blog/${p.slug}`); }}
                    className="inline-flex items-center gap-1 font-bold text-[#173B5F] group-hover:text-[#FA7415]"
                  >
                    Read guide <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
