/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'ccbmtv-admin-config';

const defaultConfig = {
  clientName: 'CCBM',
  contactEmail: 'contact@example.com',
  organization: 'CCBM',
  domain: 'ccbmbroadcasting.tv',
  colors: {
    primary: '#03082b',
    secondary: '#ffd15c',
    accent: '#4c8dff',
    background: '#ffffff',
  },
  logos: {
    clientLogoUrl: '/CCBM_TV1.png',
    revvitLogoUrl: '/png-white%20%20version%20copy.png',
  },
  pricing: {
    setupFee: '10000',
    monthlyFee: '1500',
    contractLengthMonths: '12',
    terminationNotice: '60 days after first year',
  },
  cta: {
    approveMailto: 'mailto:?subject=Approve%20CCBM%20Phase%201%20Proposal',
    bookLink: 'https://cal.com/your-link',
  },
  deliverables: [
    'Phase 1 page live on your domain with CCBM/Revvit branding.',
    'SEO + GEO (LLM model) structure; donor/sponsor story with rate card space.',
    'Ad-ready placements (VAST tags, Google Ads/AdSense hooks).',
    'Future previews: live player placement, PWA (“mini OTT”), promo microsite concept.',
  ],
  timeline: [
    'Week 1: Story & ROI alignment; ad/VAST placement mapping.',
    'Week 2: Publish, capture demand, wire tracking.',
    'Week 3+: Turn on VAST/Ads/AdSense and donor/sponsor funnels; schedule live player/PWA build.',
  ],
  legal: {
    nda: 'Mutual confidentiality for business/data for 2 years.',
    contractor: 'Revvit acts as an independent contractor.',
    governingLaw: 'North Carolina',
    contract: '12-month term, then 60-day notice after first year.',
  },
};

export default function AdminConfigPage() {
  const [config, setConfig] = useState(defaultConfig);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      try {
        setConfig({ ...defaultConfig, ...JSON.parse(stored) });
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    }
  }, [config]);

  const handleChange = (path, value) => {
    setConfig(prev => {
      const next = { ...prev };
      const keys = path.split('.');
      let curr = next;
      keys.forEach((k, idx) => {
        if (idx === keys.length - 1) {
          curr[k] = value;
        } else {
          curr[k] = { ...curr[k] };
          curr = curr[k];
        }
      });
      return next;
    });
    setCopied(false);
  };

  const configJson = useMemo(() => JSON.stringify(config, null, 2), [config]);

  const copyConfig = async () => {
    try {
      await navigator.clipboard.writeText(configJson);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="admin-shell">
      <div className="admin-card">
        <div className="eyebrow">Proposal Builder</div>
        <h1>Configure CCBM Phase 1</h1>
        <p className="muted">
          Set client details, pricing, branding, and links. Copy the JSON to move this config into another repo or
          inject it into the proposal page.
        </p>

        <div className="admin-grid">
          <section>
            <h3>Client</h3>
            <label>
              <span>Client Name</span>
              <input value={config.clientName} onChange={e => handleChange('clientName', e.target.value)} />
            </label>
            <label>
              <span>Contact Email</span>
              <input value={config.contactEmail} onChange={e => handleChange('contactEmail', e.target.value)} />
            </label>
            <label>
              <span>Organization</span>
              <input value={config.organization} onChange={e => handleChange('organization', e.target.value)} />
            </label>
            <label>
              <span>Domain</span>
              <input value={config.domain} onChange={e => handleChange('domain', e.target.value)} />
            </label>
          </section>

          <section>
            <h3>Branding</h3>
            <label>
              <span>Primary Color</span>
              <input value={config.colors.primary} onChange={e => handleChange('colors.primary', e.target.value)} />
            </label>
            <label>
              <span>Secondary Color</span>
              <input value={config.colors.secondary} onChange={e => handleChange('colors.secondary', e.target.value)} />
            </label>
            <label>
              <span>Accent Color</span>
              <input value={config.colors.accent} onChange={e => handleChange('colors.accent', e.target.value)} />
            </label>
            <label>
              <span>Background Color</span>
              <input value={config.colors.background} onChange={e => handleChange('colors.background', e.target.value)} />
            </label>
            <label>
              <span>Client Logo URL</span>
              <input value={config.logos.clientLogoUrl} onChange={e => handleChange('logos.clientLogoUrl', e.target.value)} />
            </label>
            <label>
              <span>Revvit Logo URL</span>
              <input value={config.logos.revvitLogoUrl} onChange={e => handleChange('logos.revvitLogoUrl', e.target.value)} />
            </label>
          </section>

          <section>
            <h3>Pricing & Terms</h3>
            <label>
              <span>Setup Fee (USD)</span>
              <input value={config.pricing.setupFee} onChange={e => handleChange('pricing.setupFee', e.target.value)} />
            </label>
            <label>
              <span>Monthly Fee (USD)</span>
              <input value={config.pricing.monthlyFee} onChange={e => handleChange('pricing.monthlyFee', e.target.value)} />
            </label>
            <label>
              <span>Contract Length (months)</span>
              <input
                value={config.pricing.contractLengthMonths}
                onChange={e => handleChange('pricing.contractLengthMonths', e.target.value)}
              />
            </label>
            <label>
              <span>Termination Notice</span>
              <input
                value={config.pricing.terminationNotice}
                onChange={e => handleChange('pricing.terminationNotice', e.target.value)}
              />
            </label>
          </section>

          <section>
            <h3>CTA Links</h3>
            <label>
              <span>Approve mailto</span>
              <input value={config.cta.approveMailto} onChange={e => handleChange('cta.approveMailto', e.target.value)} />
            </label>
            <label>
              <span>Book link (Cal.com)</span>
              <input value={config.cta.bookLink} onChange={e => handleChange('cta.bookLink', e.target.value)} />
            </label>
          </section>

          <section>
            <h3>Deliverables</h3>
            <label>
              <span>List (one per line)</span>
              <textarea
                rows={6}
                value={config.deliverables.join('\n')}
                onChange={e => handleChange('deliverables', e.target.value.split('\n').filter(Boolean))}
              />
            </label>
          </section>

          <section>
            <h3>Timeline</h3>
            <label>
              <span>Milestones (one per line)</span>
              <textarea
                rows={5}
                value={config.timeline.join('\n')}
                onChange={e => handleChange('timeline', e.target.value.split('\n').filter(Boolean))}
              />
            </label>
          </section>

          <section>
            <h3>Legal (fixed)</h3>
            <p className="muted small">
              NDA: {config.legal.nda} <br />
              Contractor: {config.legal.contractor} <br />
              Governing law: {config.legal.governingLaw} <br />
              Contract: {config.legal.contract}
            </p>
          </section>
        </div>

        <div className="copy-block">
          <div className="eyebrow">Config JSON</div>
          <div className="copy-actions">
            <button className="button button-primary" onClick={copyConfig}>{copied ? 'Copied' : 'Copy JSON'}</button>
          </div>
          <pre className="code">{configJson}</pre>
        </div>
      </div>
    </main>
  );
}
