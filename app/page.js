/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    organization: '',
    message: '',
    agreed: false,
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll('[data-reveal]'));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.agreed) {
      setStatus('error');
      return;
    }
    try {
      setStatus('sending');
      const res = await fetch('/api/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message = data?.error || 'Request failed';
        throw new Error(message);
      }
      setStatus('success');
      setErrorMsg('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Request failed');
    }
  };

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (status !== 'idle') {
      setStatus('idle');
      setErrorMsg('');
    }
  };

  return (
    <main>
      <div className="container">
        <header className="page-header card">
          <div className="logo-row">
            <div className="logo-chip">
              <Image
                src="/CCBM_TV1.png"
                alt="CCBM Broadcasting logo"
                width={949}
                height={227}
                className="logo-img ccbm"
                sizes="(max-width: 900px) 70vw, 190px"
                priority
              />
            </div>
            <div className="logo-spine">
              <span>+</span>
            </div>
            <div className="logo-chip revvit">
              <Image
                src="/png-white%20%20version%20copy.png"
                alt="Revvit white logo"
                width={2500}
                height={1670}
                className="logo-img revvit"
                sizes="(max-width: 900px) 80vw, 320px"
                priority
              />
            </div>
          </div>
          <div className="header-meta">
            <div className="pill pill-contrast">Unified team: CCBM brand + Revvit delivery</div>
          </div>
        </header>

        <section className="hero card brand-hero" data-reveal="center">
          <div>
            <div className="eyebrow">Phase 1 scope</div>
            <h1>CCBM + Revvit: Rapid Broadcast Rebuild</h1>
            <p>
              A focused Phase 1 that pairs CCBM’s brand with Revvit’s delivery team to ship a live-ready build and unlock
              the path to OTT.
            </p>
            <div className="badges">
              <div className="pill" data-reveal="left">
                Live + PWA Ready
              </div>
              <div className="pill" data-reveal="right">
                Donor &amp; Sponsor Friendly
              </div>
              <div className="pill" data-reveal="left">
                OTT-Ready Roadmap
              </div>
            </div>
            <div className="cta-row">
              <a className="button button-primary" href="#ready">
                Approve Proposal &amp; Start Build
              </a>
              <a className="button button-ghost" href="#walkthrough">
                Book a 30-Minute Walkthrough
              </a>
            </div>
          </div>
          <div className="side-card">
            <h3>At a glance</h3>
            <ul className="check-list">
              <li>Unified CCBM + Revvit team delivering Phase 1.</li>
              <li>Clear donor/sponsor story with live and OTT path.</li>
              <li>Board-ready scope, pricing, and next steps in one place.</li>
            </ul>
          </div>
        </section>

        <section className="card" data-reveal>
          <div className="eyebrow">Why we’re here</div>
          <h2>Why CCBM Needs This Now</h2>
          <ul>
            <li>Broadcasting on local television, but currently no reliable live online presence.</li>
            <li>$60,000+ already spent this year “to get more viewers” with no clear digital ROI.</li>
            <li>No simple, modern place to send viewers, donors, or sponsors.</li>
            <li>No clear digital plan that connects today’s reality to a future OTT channel.</li>
          </ul>
          <p>
            <strong>This page is the plan to fix that — and the kickoff scope to start.</strong>
          </p>
        </section>

        <section className="card" data-reveal>
          <div className="eyebrow">What we will build</div>
          <h2>Phase 1: Live Experience</h2>
          <div className="deliverables">
            <div className="deliverable-block">
              <strong>Live launch page</strong>
              <ul>
                <li>Mobile-first, Google-friendly, and fast.</li>
                <li>Shares the story for viewers, donors, and sponsors.</li>
                <li>Clear CTAs for approval and kickoff.</li>
              </ul>
            </div>
            <div className="deliverable-block">
              <strong>Viewership &amp; search foundation</strong>
              <ul>
                <li>SEO + GEO (LLM model search) structure explaining what CCBM is and how to watch.</li>
                <li>Content hooks for analytics/pixels when you’re ready.</li>
              </ul>
            </div>
            <div className="deliverable-block">
              <strong>Donor &amp; sponsor story</strong>
              <ul>
                <li>Why to give, how to give, and who benefits.</li>
                <li>Digital rate card space for Local / Regional / Premium tiers.</li>
              </ul>
            </div>
            <div className="deliverable-block">
              <strong>Future experience preview</strong>
              <ul>
                <li>Where the live player will sit on the page.</li>
                <li>How the PWA (“mini OTT”) will feel.</li>
                <li>Ad placements planned with VAST tags and Google Ads/AdSense alignment for ROI.</li>
                <li>A second promo microsite concept for ads and trailers.</li>
              </ul>
            </div>
          </div>
          <p>
            <strong>What’s not in Phase 1:</strong> Full OTT apps, programmatic ad tech, and paid media. Those are in later phases once this foundation is live.
          </p>
        </section>

        <section className="card" data-reveal>
          <div className="eyebrow">Why this will work</div>
          <h2>Clear story, clear asks, ready for what’s next</h2>
          <ul>
            <li>One destination that explains how to watch, give, and sponsor.</li>
            <li>Built for mobile first so viewers and donors can act quickly.</li>
            <li>SEO/GEO (LLM model) copy that helps people find CCBM when they search.</li>
            <li>Visual placement for the live player and PWA so the path to OTT is obvious.</li>
            <li>Ad-ready placements (VAST tag support, Google Ads/AdSense hooks) so sponsor ROI is measurable.</li>
            <li>Rate card space so sponsors see options and can say yes faster.</li>
          </ul>
        </section>

        <section className="card" data-reveal>
          <div className="eyebrow">Future phases</div>
          <h2>Roadmap After This Proposal</h2>
          <div className="two-col">
            <div className="card">
              <h3>Phase 2 – Execution Layer (Not included yet)</h3>
              <ul>
                <li>Implementing a live player sourced from your existing broadcast feed.</li>
                <li>Building a PWA (installable app with Live + basic VOD).</li>
                <li>Integrating your chosen donation platform.</li>
                <li>Ad ops setup: Google Ads/AdSense and VAST tag deployment for sponsor/ads ROI tracking.</li>
                <li>Spinning up the promo/hype microsite for Meta and ad campaigns.</li>
                <li>Basic analytics and viewership reporting.</li>
              </ul>
              <p className="note">This will be scoped and quoted after Phase 1 is approved and live.</p>
            </div>
            <div className="card">
              <h3>Phase 3 – Full OTT Expansion (Not included yet)</h3>
              <ul>
                <li>Native Roku channel built from your PWA/stream infrastructure.</li>
                <li>Native Fire TV app.</li>
                <li>Automated episode feeds for sermons and broadcasts.</li>
                <li>Advanced sponsor ad reporting and placements.</li>
              </ul>
              <p className="note">Quoted separately once it makes strategic and financial sense.</p>
            </div>
          </div>
        </section>

        <section className="card" data-reveal>
          <div className="eyebrow">Timeline</div>
          <h2>Timeline</h2>
          <div className="timeline">
            <div className="timeline-step">
              <div className="step-tag">1</div>
              <div>
                <h3>Week 1 – Story &amp; ROI Alignment</h3>
                <p>Lock messaging for viewers/donors/sponsors and map ad/ROI placements (VAST/Adsense) into the plan.</p>
              </div>
            </div>
            <div className="timeline-step">
              <div className="step-tag">2</div>
              <div>
                <h3>Week 2 – Publish &amp; Capture Demand</h3>
                <p>Publish this page on your domain, activate lead/contact flows, and wire tracking for viewership and sponsor interest.</p>
              </div>
            </div>
            <div className="timeline-step">
              <div className="step-tag">3</div>
              <div>
                <h3>Week 3+ – Monetization &amp; Viewership Lift</h3>
                <p>Turn on VAST tags, Google Ads/AdSense, and donor/sponsor funnels; then schedule the live player / PWA build.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="card" data-reveal>
          <div className="eyebrow">Investment</div>
          <h2>Simple Pricing</h2>
          <div className="scope-grid">
            <div className="card">
              <h3>One-Time Setup — $10,000</h3>
              <ul>
                <li>Design and build this page.</li>
                <li>SEO/GEO (LLM model search) friendly structure and copy.</li>
                <li>Donor and sponsor sections with rate card space.</li>
                <li>Future experience previews (live player, PWA, promo microsite).</li>
              </ul>
            </div>
            <div className="card">
              <h3>Monthly Retainer — $1,500</h3>
              <ul>
                <li>Hosting, monitoring, and maintenance.</li>
                <li>Copy and pricing updates as you refine offers.</li>
                <li>Light SEO/GEO (LLM model search) tuning over time.</li>
                <li>Guidance on donation provider, live streaming, PWA, and OTT timing.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="card sign-card" data-reveal>
          <div className="eyebrow">Sign &amp; Send</div>
          <h2>Accept Phase 1 and kick off</h2>
          <p className="muted">
            Fill this out to send acceptance to CCBM + Revvit. You and our team will both receive a copy via email.
          </p>
          <form className="sign-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                <span>Name *</span>
                <input name="name" value={formData.name} onChange={handleChange} required />
              </label>
              <label>
                <span>Title</span>
                <input name="title" value={formData.title} onChange={handleChange} />
              </label>
              <label>
                <span>Email *</span>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </label>
              <label>
                <span>Organization</span>
                <input name="organization" value={formData.organization} onChange={handleChange} />
              </label>
            </div>
            <label>
              <span>Notes (optional)</span>
              <textarea name="message" value={formData.message} onChange={handleChange} rows={3} />
            </label>
            <label className="agree">
              <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleChange} />
              <span>I accept the CCBM Phase 1 scope, pricing, and timeline described on this page.</span>
            </label>
            <div className="cta-row">
              <button className="button button-primary" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Sign & Send Acceptance'}
              </button>
              {status === 'success' && <div className="status success">Sent! Check your email for a copy.</div>}
              {status === 'error' && (
                <div className="status error">{errorMsg || 'There was a problem. Please try again.'}</div>
              )}
            </div>
          </form>
        </section>

        <section className="cta-footer card" id="ready" data-reveal>
          <div className="eyebrow">Ready to begin?</div>
          <h2>Once you sign off on this page, we treat it as the official scope of work for Phase 1.</h2>
          <p>
            Two options: approve and start the build immediately, or schedule a short walkthrough to review the scope
            with your team.
          </p>
          <div className="cta-row">
            <a className="button button-primary" href="mailto:?subject=Approve%20CCBM%20Phase%201%20Proposal">
              Approve This Proposal
            </a>
            <a className="button button-ghost" href="mailto:?subject=Schedule%20CCBM%20Kickoff" id="walkthrough">
              Schedule a Kickoff Call
            </a>
          </div>
          <div className="fine-print">
            This page will live on your domain as the Phase 1 experience. Future phases (live player, PWA, OTT) are
            scoped and quoted separately once Phase 1 is live.
          </div>
        </section>
      </div>
    </main>
  );
}
