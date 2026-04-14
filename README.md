# FNDI — Future Native Digital Intelligence

AI-powered business automation for local businesses.

**Live site:** [fndi-site.vercel.app](https://fndi-site.vercel.app)
**Booking:** [fndi-site.vercel.app/book](https://fndi-site.vercel.app/book)

---

## Project Structure

```
fndi-project/
├── index.html          ← Main website (deploy this to GitHub repo root)
├── vercel.json         ← Vercel config
├── book/
│   └── index.html      ← Booking landing page (Calendly embedded)
├── branding/
│   ├── fndi-logo.png / .svg
│   ├── fndi-logo-compact.png / .svg
│   ├── fndi-logo-email.png / .svg
│   └── fndi-email-signature.html
├── docs/
│   ├── FNDI-Business-Plan.pptx
│   └── FNDI-Launch-Plan.xlsx
└── README.md
```

## Deployment

This project deploys to **Vercel** via GitHub.

**GitHub repo:** `github.com/stefano10345-code/fndi-site`

### How to deploy changes:
1. Open this folder in VS Code
2. Edit `index.html` (main site) or `book/index.html` (booking page)
3. Push to GitHub → Vercel auto-deploys

### To connect this folder to GitHub:
```bash
git init
git remote add origin https://github.com/stefano10345-code/fndi-site.git
git pull origin main
```
Then you can push changes directly from VS Code.

### Important Vercel rules:
- The booking page MUST be at `book/index.html` (folder structure), NOT `book.html`
- `vercel.json` keeps it simple: `{"buildCommand":"","outputDirectory":".","cleanUrls":true}`

---

## Tech Stack

| Tool | Purpose | Cost/mo |
|------|---------|---------|
| GoHighLevel | CRM & automations | $97 |
| Synthflow AI | Voice agent platform | $29 |
| Twilio | Phone numbers & routing | ~$20 |
| OpenAI API | AI conversation engine | ~$20 |
| ElevenLabs | Voice synthesis (via Synthflow) | Included |
| Vercel | Hosting | Free |
| Calendly | Booking | Free |

**Total: ~$173/mo**

---

## Team

- **Stefano** — CEO & Founder (sales, strategy, client relationships)
- **Mac** — COO & Co-Founder (technical execution, AI setup, operations)

---

## Mac's Week 1 Priorities

1. Set up GoHighLevel account → configure CRM pipeline
2. Set up Synthflow AI → create first voice agent
3. Get Twilio phone number → connect to Synthflow
4. Get OpenAI API key → connect to Synthflow
5. Build test AI agent for dental office (first target industry)
6. End-to-end test: call → AI answers → books appointment → CRM → auto follow-up
7. Fix bugs before Stefano starts selling

---

## Client Pricing

| Tier | Price | Includes |
|------|-------|----------|
| Starter | $297/mo | AI voice (100 min), chatbot, basic CRM |
| Growth | $497/mo | AI voice (300 min), full CRM, SMS + email automation |
| Premium | $997/mo | Unlimited voice, multi-channel AI, custom integrations |

---

## Contact

- stefano10345@gmail.com
- +1 (786) 843-0145
- Miami, FL
