import { AISummary, Section, Geo, TopCategory } from './types';

/**
 * Build the prompt for Claude to generate summaries
 */
export function buildSummaryPrompt(
    geo: Geo,
    sections: Section[],
    topCategories?: TopCategory[],
    userMessage?: string
): string {
    const locationStr = [geo.city, geo.county, geo.state_name]
        .filter(Boolean)
        .join(', ');

    // Extract government actions
    const allGovActions = sections.flatMap(s => s.government_actions);
    const govActionsText = allGovActions
        .map(action => {
            const title = action.title || 'Untitled';
            const summary = action.summary || '';
            const date = action.date || '';
            const tags = action.tags.join(', ');
            return `- ${title}\n  Date: ${date}\n  Summary: ${summary}\n  Tags: ${tags}`;
        })
        .join('\n\n');

    // Extract citizen issues
    const allCitizenIssues = sections.flatMap(s => s.citizen_issues);
    const citizenIssuesText = allCitizenIssues
        .map(issue => {
            return `- ${issue.title} (Score: ${issue.score}, Category: ${issue.primary_category})`;
        })
        .join('\n');

    // Top categories context
    const topCategoriesText = topCategories
        ? topCategories.map(tc => `${tc.label} (${tc.count} items)`).join(', ')
        : 'Not available';

    // Hardcoded LA officials for MVP
    const officialsText = `
**Los Angeles Officials:**
- Karen Bass, Mayor of Los Angeles
  Phone: (213) 978-0600
  Email: mayor.helpline@lacity.org
  
- Hydee Feldstein Soto, Los Angeles City Attorney
  Phone: (213) 978-8100
  Email: ethics.commission@lacity.org

- Paul Krekorian, City Council President (District 2)
  Phone: (818) 755-7676
  Email: councilmember.krekorian@lacity.org

- Bob Blumenfield, City Councilmember (District 3)
  Phone: (818) 774-4330
  Email: councilmember.blumenfield@lacity.org

- Nithya Raman, City Councilmember (District 4)
  Phone: (323) 957-6415
  Email: councilmember.raman@lacity.org

- Lindsey Horvath, LA County Supervisor (District 3)
  Phone: (213) 974-3333
  Email: ThirdDistrict@bos.lacounty.gov

- Hilda Solis, LA County Supervisor (District 1)
  Phone: (213) 974-4111
  Email: HildaSolis@bos.lacounty.gov

**State Officials:**
- Alex Padilla, U.S. Senator for California
  Phone: (310) 231-4494
  Email: https://www.padilla.senate.gov/contact/

- Laphonza Butler, U.S. Senator for California
  Phone: (202) 224-3553
  Email: https://www.butler.senate.gov/contact/

- Gavin Newsom, Governor of California
  Phone: (916) 445-2841
  Email: https://www.gov.ca.gov/contact/
`;

    // Build the base prompt
    let prompt = `You are an intermediary between local government and citizens, helping people understand what's happening in their community and take effective action.

Your task is to analyze government actions and citizen concerns for ${locationStr}, then create clear, accessible summaries.

# Context

**Location:** ${locationStr}

**Top Categories:** ${topCategoriesText}`;

    // Add user message context if provided
    if (userMessage) {
        prompt += `

**User's Concern:** "${userMessage}"`;
    }

    prompt += `

**Government Actions (${allGovActions.length} total):**
${govActionsText || 'No recent government actions.'}

**Citizen Issues (${allCitizenIssues} total):**
${citizenIssuesText || 'No recent citizen issues reported.'}

# Your Task

Create summaries and guidance:

1. **Government Summary**: What is the local government working on?
   - Keep it factual and informative
   - Highlight key initiatives (2-4 main points)
   - Identify priority areas

2. **Citizen Summary**: What are citizens concerned about?
   - What issues keep coming up?
   - Overall sentiment (positive, neutral, concerned, or critical)
   - Highlight top concerns (2-4 main points)

3. **Insights**: Connections between government actions and citizen concerns`;

    // Add action plan section if user provided a message
    if (userMessage) {
        prompt += `

4. **Action Plan**: Based on the user's concern and the data, create an actionable plan:
   - **Overview**: Why taking action on this issue matters (1-2 sentences)
   - **Contacts**: Select 1-3 RELEVANT officials from the list above based on the issue type:
     * Local issues (potholes, local crime, parks) → City Council Member or Mayor
     * County issues (health, larger infrastructure) → County Supervisor  
     * State/federal issues (state laws, major policy) → State Senator or Governor
     Use the EXACT names, titles, phone numbers, and emails from the officials list above.
   - **Call Script**: A short, effective phone script template (3-4 sentences)
   - **Email Template**: A professional email template they can customize (subject line + 2-3 paragraph body)
   - **Tips**: 3-4 best practices for effective communication with officials
   - **Next Steps**: 2-3 additional actions they can take (attend meetings, join groups, etc.)`;
    }

    // Output format changes based on whether action plan is needed
    const outputFormat = userMessage ? `
{
  "government": {
    "overview": "A 2-3 sentence overview of what government is focusing on",
    "keyInitiatives": ["Initiative 1", "Initiative 2", "Initiative 3"],
    "priorityAreas": ["Area 1", "Area 2"]
  },
  "citizens": {
    "overview": "A 2-3 sentence overview of citizen concerns",
    "topConcerns": ["Concern 1", "Concern 2", "Concern 3"],
    "sentiment": "positive" | "neutral" | "concerned" | "critical"
  },
  "insights": "1-2 sentences connecting government actions to citizen concerns",
  "actionPlan": {
    "overview": "Why this action matters",
    "contacts": [
      {
        "name": "[Official Name or Placeholder]",
        "title": "State Senator",
        "phone": "xxx-xxx-xxxx (optional)",
        "email": "email@example.gov (optional)",
        "officeHours": "Mon-Fri 9am-5pm (optional)",
        "website": "https://example.gov (optional)"
      }
    ],
    "callScript": "Hi, my name is [Your Name] and I'm a constituent from [City]. I'm calling about...",
    "emailTemplate": "Subject: [Clear subject line]\\n\\nDear [Title] [Name],\\n\\n[Body paragraphs]\\n\\nSincerely,\\n[Your Name]",
    "tips": ["Tip 1", "Tip 2", "Tip 3"],
    "nextSteps": ["Action 1", "Action 2"]
  }
}` : `
{
  "government": {
    "overview": "A 2-3 sentence overview of what government is focusing on",
    "keyInitiatives": ["Initiative 1", "Initiative 2", "Initiative 3"],
    "priorityAreas": ["Area 1", "Area 2"]
  },
  "citizens": {
    "overview": "A 2-3 sentence overview of citizen concerns",
    "topConcerns": ["Concern 1", "Concern 2", "Concern 3"],
    "sentiment": "positive" | "neutral" | "concerned" | "critical"
  },
  "insights": "Optional: 1-2 sentences connecting government actions to citizen concerns"
}`;

    prompt += `

# Output Format

Return ONLY a valid JSON object with this structure (no markdown, no code blocks, just pure JSON):
${outputFormat}

# Guidelines

- Be concise but informative
- Use accessible language (avoid jargon)
- Focus on the city-level data provided
- If data is limited, say so honestly
- Maintain a neutral, helpful tone${userMessage ? '\n- Make action plans specific and realistic\n- Ensure call scripts and emails are professional yet personal\n- Contact info can use placeholders if specific officials aren\'t identifiable' : ''}
- Return ONLY the JSON object, nothing else`;

    return prompt;
}

/**
 * Parse Claude's response into our AISummary type
 */
export function parseClaudeResponse(response: string): AISummary {
    try {
        // Claude should return pure JSON, but just in case, try to extract it
        let jsonStr = response.trim();

        // Remove markdown code blocks if present
        if (jsonStr.startsWith('```')) {
            jsonStr = jsonStr.replace(/```json?\n?/g, '').replace(/```\n?$/g, '').trim();
        }

        const parsed = JSON.parse(jsonStr);

        // Validate structure
        if (!parsed.government || !parsed.citizens) {
            throw new Error('Invalid response structure from Claude');
        }

        // Return with timestamp
        return {
            ...parsed,
            generatedAt: new Date().toISOString(),
        } as AISummary;
    } catch (error) {
        console.error('Failed to parse Claude response:', error);
        throw new Error('Failed to parse AI summary response');
    }
}

/**
 * Call Claude API via our Next.js API route (server-side only)
 * This function should only be called from the client to hit /api/summarize
 */
export async function generateSummary(
    geo: Geo,
    sections: Section[],
    topCategories?: TopCategory[],
    userMessage?: string
): Promise<AISummary> {
    const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            geo,
            sections,
            top_categories: topCategories,
            user_message: userMessage,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate summary');
    }

    const data = await response.json();
    return data.summary;
}