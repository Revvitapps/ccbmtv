# Proposal Builder (Admin)

This folder contains a standalone admin builder you can drop into another repo.

## How to use in a Next.js app
1. Copy `admin-tool/AdminConfigPage.js` into your project.
2. Add a route at `app/admin/page.js` with:
```js
import AdminConfigPage from '../../admin-tool/AdminConfigPage';
export default AdminConfigPage;
```
3. Add the CSS from `app/globals.css` (admin section) to your global styles:
```css
.admin-shell { padding: 40px 20px 80px; max-width: 1200px; margin: 0 auto; }
.admin-card { background: #fff; border: 1px solid var(--border); border-radius: 18px; box-shadow: var(--shadow); padding: 26px 28px; }
.admin-grid { display: grid; gap: 18px; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); margin: 24px 0; }
.admin-card section { border: 1px solid var(--border); border-radius: 12px; padding: 14px; background: rgba(0, 24, 52, 0.02); }
.copy-block { margin-top: 24px; border: 1px dashed var(--border); border-radius: 12px; padding: 14px; background: #fafcff; }
.copy-actions { display: flex; justify-content: flex-end; margin-bottom: 10px; }
.code { background: #0f1a2f; color: #f2f4ff; padding: 14px; border-radius: 12px; overflow-x: auto; font-size: 13px; }
```
4. Run your app and visit `/admin` to edit config and copy the JSON.

## What it does
- Local form to set client info, colors/logos, pricing/contract terms, CTA links, deliverables, timeline, and fixed legal (NDA, contractor, NC law, 12-month term + 60-day notice).
- Saves to `localStorage` (`ccbmtv-admin-config`) and lets you copy the config JSON to use elsewhere.

## Moving to a separate repo
- Copy this folder and the CSS snippet into the new repo, wire the page route as above, and adjust imports if your structure differs.
