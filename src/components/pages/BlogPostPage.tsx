import React from 'react';
import { ArrowRight, CheckCircle2, Clock, Phone } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { OTTAWA_PHONE } from '../../data/junkData';
import { BLOG_POSTS, BlogPost } from '../../data/blogPosts';
import { SERVICE_PAGES } from '../../data/servicePages';
import { useDocumentHead } from '../../utils/seo';
import { blogPostSchema, breadcrumbSchema, faqSchema } from '../../utils/schema';
import { trackEvent } from '../../utils/analytics';
import { FaqList, PriceTable } from './shared/blocks';
import { RichText } from './shared/RichText';

interface Props {
  post: BlogPost;
  onNavigatePath: (path: string) => void;
}

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });

export const BlogPostPage: React.FC<Props> = ({ post, onNavigatePath }) => {
  const path = `/blog/${post.slug}`;
  useDocumentHead(post.title, post.description, {
    jsonLd: [
      blogPostSchema(post),
      faqSchema(post.faqs),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title, path },
      ]),
    ],
  });

  const { openQuote } = useBooking();
  const tel = `tel:${OTTAWA_PHONE.replace(/[^0-9+]/g, '')}`;
  const go = (p: string) => (e: React.MouseEvent) => { e.preventDefault(); onNavigatePath(p); };
  const relatedPosts = post.relatedPosts
    .map((s) => BLOG_POSTS.find((b) => b.slug === s))
    .filter(Boolean) as BlogPost[];
  const relatedServices = post.relatedServices
    .map((s) => SERVICE_PAGES.find((sp) => sp.slug === s))
    .filter(Boolean) as typeof SERVICE_PAGES;

  return (
    <div className="bg-slate-50 pb-16">
      <header className="bg-gradient-to-br from-[#0F2742] via-[#173B5F] to-[#0F2742] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-300 mb-4">
            <a href="/" onClick={go('/')} className="hover:text-white">Home</a>
            <span className="mx-1.5">/</span>
            <a href="/blog" onClick={go('/blog')} className="hover:text-white">Blog</a>
            <span className="mx-1.5">/</span>
            <span className="text-white">{post.category}</span>
          </nav>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">{post.h1}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
            <span>By Junk Trucks Ottawa</span>
            <span>Updated {fmt(post.updated)}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readMinutes} min read</span>
          </div>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <img src={post.image} alt={post.imageAlt} className="w-full h-56 sm:h-72 object-cover rounded-2xl border border-slate-200" />

        <div className="mt-8 space-y-4">
          {post.intro.map((t) => (
            <p key={t} className="text-base sm:text-lg text-slate-700 leading-relaxed">
              <RichText text={t} onNavigatePath={onNavigatePath} />
            </p>
          ))}
        </div>

        <div className="mt-10 space-y-10">
          {post.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#173B5F] mb-3">{s.heading}</h2>
              <div className="space-y-3">
                {s.body.map((t) => (
                  <p key={t} className="text-base text-slate-700 leading-relaxed">
                    <RichText text={t} onNavigatePath={onNavigatePath} />
                  </p>
                ))}
              </div>
              {s.bullets && (
                <ul className="mt-3 space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-base text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#173B5F] mt-1 shrink-0" />
                      <span><RichText text={b} onNavigatePath={onNavigatePath} /></span>
                    </li>
                  ))}
                </ul>
              )}
              {s.showPrices && (
                <div className="mt-5">
                  <PriceTable />
                </div>
              )}
            </section>
          ))}
        </div>

        {post.sourceNote && (
          <p className="mt-10 text-xs text-slate-500 border-t border-slate-200 pt-4">{post.sourceNote}</p>
        )}
      </article>

      <div className="space-y-12 pt-12">
        <FaqList faqs={post.faqs.map((f) => ({ question: f.question, answer: f.answer }))} title="Common questions" />

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#173B5F] text-white rounded-3xl p-8 text-center space-y-4">
            <h2 className="text-2xl font-black">Need it gone? Get a firm price.</h2>
            <p className="text-slate-200 text-sm max-w-md mx-auto">
              Send a photo or call. We confirm the price before we load anything.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => { trackEvent('blog_quote_click', { slug: post.slug }); openQuote(); }}
                className="px-7 py-3.5 rounded-xl bg-[#FA7415] hover:bg-[#E0650A] font-bold text-base transition-colors"
              >
                Get Your Free Quote
              </button>
              <a
                href={tel}
                onClick={() => trackEvent('call_click', { location: `blog_cta_${post.slug}` })}
                className="px-7 py-3.5 rounded-xl border border-white/40 hover:bg-white/10 font-bold text-base transition-colors inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" /> {OTTAWA_PHONE}
              </a>
            </div>
          </div>
        </section>

        {relatedServices.length > 0 && (
          <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-bold text-[#173B5F] mb-4">Related services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedServices.map((sv) => (
                <a
                  key={sv.slug}
                  href={`/${sv.slug}`}
                  onClick={go(`/${sv.slug}`)}
                  className="group flex items-center justify-between gap-3 bg-white rounded-2xl border border-slate-200 px-5 py-4 hover:border-[#173B5F] transition-colors"
                >
                  <span>
                    <span className="block text-sm font-bold text-slate-900">{sv.name} in Ottawa</span>
                    <span className="block text-xs text-slate-500">From $85 · Upfront price</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#FA7415] group-hover:translate-x-0.5 transition-transform" />
                </a>
              ))}
            </div>
          </section>
        )}

        {relatedPosts.length > 0 && (
          <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-bold text-[#173B5F] mb-4">More guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedPosts.map((rp) => (
                <a
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  onClick={go(`/blog/${rp.slug}`)}
                  className="group bg-white rounded-2xl border border-slate-200 px-5 py-4 hover:border-[#173B5F] transition-colors"
                >
                  <span className="block text-[11px] font-mono uppercase font-bold text-[#FA7415]">{rp.category}</span>
                  <span className="block text-sm font-bold text-slate-900 mt-1 group-hover:text-[#173B5F]">{rp.title}</span>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
