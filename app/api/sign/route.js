import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(request) {
  try {
    const { name, title, email, organization, agreed, message } = await request.json();

    if (!name || !email || !agreed) {
      return NextResponse.json({ error: 'Name, email, and agreement are required.' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'RESEND_API_KEY is not set on the server.' }, { status: 500 });
    }

    const summaryHtml = `
      <h2>CCBM Phase 1 Acceptance</h2>
      <p><strong>Signer:</strong> ${name}${title ? `, ${title}` : ''}${organization ? ` (${organization})` : ''}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${message ? `<p><strong>Notes:</strong> ${message}</p>` : ''}
      <h3>Scope Highlights</h3>
      <ul>
        <li>Phase 1 page live on CCBM domain with CCBM/Revvit branding.</li>
        <li>SEO + GEO (LLM model) structure; donor/sponsor story; rate card space.</li>
        <li>Ad-ready placements (VAST tags, Google Ads/AdSense hooks) for ROI tracking.</li>
        <li>Future experience previews: live player placement, PWA (“mini OTT”), promo microsite concept.</li>
      </ul>
      <h3>Pricing</h3>
      <ul>
        <li>One-Time Setup — $10,000</li>
        <li>Monthly Retainer — $1,500</li>
      </ul>
      <h3>Timeline</h3>
      <ul>
        <li>Week 1: Story & ROI alignment; ad/VAST placement mapping.</li>
        <li>Week 2: Publish, capture demand, wire tracking.</li>
        <li>Week 3+: Turn on VAST/Ads/AdSense and donor/sponsor funnels; schedule live player/PWA build.</li>
      </ul>
      <p><em>This email serves as acceptance of the Phase 1 scope unless otherwise noted.</em></p>
    `;

    await resend.emails.send({
      from: 'agreements@documents.revvit.io',
      to: [email, 'matthew@revvit.io'],
      subject: 'CCBM Phase 1 Acceptance',
      html: summaryHtml,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Sign API error', error);
    return NextResponse.json({ error: 'Failed to send acceptance email.' }, { status: 500 });
  }
}
