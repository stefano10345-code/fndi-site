module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { website, businessName, businessType, problems } = req.body;
  if (!website) return res.status(400).json({ error: 'Website URL required' });

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) return res.status(500).json({ error: 'OpenAI API key not configured' });

  let siteContent = '';
  try {
    // Fetch the client's website
    const url = website.startsWith('http') ? website : 'https://' + website;
    const siteRes = await fetch(url, {
      headers: { 'User-Agent': 'FNDI-Audit-Bot/1.0' },
      signal: AbortSignal.timeout(10000)
    });
    if (siteRes.ok) {
      const html = await siteRes.text();
      // Strip scripts/styles, keep meaningful content (first 8000 chars)
      siteContent = html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 8000);
    }
  } catch (e) {
    siteContent = '[Could not fetch website - may be down or blocking bots]';
  }

  const auditPrompt = `You are a senior digital consultant at FNDI, an AI automation agency that helps small businesses grow with AI tools. A potential new client just submitted their information through the FNDI onboarding portal. Your job is to analyze their business and website, then produce a professional audit report with specific, actionable recommendations tied to FNDI's services.

CLIENT INFORMATION:
- Business Name: ${businessName || 'Not provided'}
- Business Type: ${businessType || 'Not provided'}
- Problems/Challenges: ${problems || 'Not provided'}
- Website: ${website}

WEBSITE CONTENT EXTRACTED:
${siteContent || '[No content available]'}

FNDI'S SERVICES (reference these in your recommendations):
1. AI Voice Receptionist ($297-997/mo) — 24/7 AI phone answering, appointment booking
2. AI Website Chatbot — Smart chat trained on their business, captures leads
3. AI Instagram DM Closer — Auto-responds to DMs, books appointments
4. AI Review Machine — Automated review generation system
5. AI Speed-to-Lead — 60-second lead response via text/email
6. AI Missed-Call Text-Back — Instant text when calls are missed
7. AI Appointment Reminders — Reduces no-shows by 50-60%
8. AI Customer Re-Engagement — Win back inactive customers
9. AI Reputation Monitor — Track and respond to reviews across platforms
10. Website Development — Modern, fast, SEO-optimized websites

PRODUCE A REPORT WITH THESE SECTIONS:

## BUSINESS OVERVIEW
Brief summary of what this business does based on website analysis.

## WEBSITE AUDIT
- Design & User Experience (mobile-friendly? modern? clear CTAs?)
- SEO Assessment (meta tags, headings, content structure, load speed indicators)
- Lead Capture (forms, chat, CTAs — or lack thereof)
- Content Quality (is messaging clear? does it convert?)
- Trust Signals (reviews, testimonials, certifications visible?)

## KEY PROBLEMS IDENTIFIED
Based on their stated problems AND what you observe from the website, list 3-5 specific issues hurting their business.

## RECOMMENDED FNDI SERVICES
For each recommended service, explain:
- Why this business needs it specifically
- Expected impact (use concrete numbers/percentages)
- Priority level (Critical / High / Medium)

## RECOMMENDED PACKAGE
Suggest a specific FNDI pricing tier:
- Starter ($297/mo) — 2 tools
- Growth ($697/mo) — 4-5 tools
- Dominate ($997/mo) — All 9 tools

## QUICK WINS
2-3 things we could fix/improve immediately (within the first week).

## 90-DAY PROJECTION
What their business could look like after 90 days with FNDI.

Keep the tone professional but confident. Use specific data points from their website where possible. This report will be emailed directly to the FNDI founders to prepare for the client call.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: auditPrompt }
        ],
        max_tokens: 2000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('OpenAI audit error:', err);
      return res.status(500).json({ error: 'AI audit service error' });
    }

    const data = await response.json();
    const audit = data.choices[0]?.message?.content || 'Audit could not be generated.';

    return res.status(200).json({ audit });
  } catch (error) {
    console.error('Audit API error:', error);
    return res.status(500).json({ error: 'Something went wrong during audit' });
  }
}
