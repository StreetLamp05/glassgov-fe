import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildSummaryPrompt, parseClaudeResponse } from '@/lib/claude';
import { CLAUDE_CONFIG } from '@/lib/constants';
import { SummarizeRequest, SummarizeResponse } from '@/lib/types';

// Initialize Anthropic client
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(request: NextRequest) {
    try {
        // Check if API key is configured
        if (!process.env.ANTHROPIC_API_KEY) {
            return NextResponse.json(
                { error: 'Claude API key not configured' },
                { status: 500 }
            );
        }

        // Parse request body
        const body: SummarizeRequest = await request.json();

        console.log('=== SUMMARIZE REQUEST ===');
        console.log('Geo:', body.geo);
        console.log('User message:', body.user_message);
        console.log('Has message:', !!body.user_message);
        console.log('========================');

        // Validate request
        if (!body.geo || !body.sections) {
            return NextResponse.json(
                { error: 'Missing required fields: geo and sections' },
                { status: 400 }
            );
        }

        // Check if there's any data to summarize
        if (body.sections.length === 0) {
            return NextResponse.json(
                { error: 'No data to summarize' },
                { status: 400 }
            );
        }

        // Build the prompt
        const prompt = buildSummaryPrompt(
            body.geo,
            body.sections,
            body.top_categories,
            body.user_message
        );

        console.log('Calling Claude API...');
        console.log('Prompt length:', prompt.length, 'characters');

        // Call Claude API
        const message = await anthropic.messages.create({
            model: CLAUDE_CONFIG.MODEL,
            max_tokens: CLAUDE_CONFIG.MAX_TOKENS,
            temperature: CLAUDE_CONFIG.TEMPERATURE,
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        });

        console.log('Claude API response received');
        console.log('Stop reason:', message.stop_reason);
        console.log('Usage:', message.usage);

        // Extract text content from Claude's response
        const textContent = message.content.find((block) => block.type === 'text');
        if (!textContent || textContent.type !== 'text') {
            throw new Error('No text content in Claude response');
        }

        const responseText = textContent.text;
        console.log('Response text length:', responseText.length, 'characters');

        // Parse the response
        const summary = parseClaudeResponse(responseText);

        // Return the summary
        const response: SummarizeResponse = {
            summary,
        };

        return NextResponse.json(response);
    } catch (error: any) {
        console.error('Summarize API error:', error);

        // Handle specific Anthropic errors
        if (error.status === 401) {
            return NextResponse.json(
                { error: 'Invalid Claude API key' },
                { status: 500 }
            );
        }

        if (error.status === 429) {
            return NextResponse.json(
                { error: 'Rate limit exceeded. Please try again later.' },
                { status: 429 }
            );
        }

        if (error.status === 529) {
            return NextResponse.json(
                { error: 'Claude API is temporarily overloaded. Please try again.' },
                { status: 503 }
            );
        }

        // Generic error
        return NextResponse.json(
            { error: error.message || 'Failed to generate summary' },
            { status: 500 }
        );
    }
}