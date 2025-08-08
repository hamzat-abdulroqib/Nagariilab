// src/ai/flows/report-insights.ts
'use server';
/**
 * @fileOverview A flow that suggests insightful observations about trends in lab reports using AI.
 *
 * - aiReportInsights - A function that takes a lab report as input and returns AI-suggested insights.
 * - AiReportInsightsInput - The input type for the aiReportInsights function.
 * - AiReportInsightsOutput - The return type for the aiReportInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiReportInsightsInputSchema = z.object({
  reportData: z
    .string()
    .describe('The lab report data as a string, including patient results and lab technician comments.'),
});
export type AiReportInsightsInput = z.infer<typeof AiReportInsightsInputSchema>;

const AiReportInsightsOutputSchema = z.object({
  insights: z.string().describe('AI-suggested insights about trends in the lab report.'),
});
export type AiReportInsightsOutput = z.infer<typeof AiReportInsightsOutputSchema>;

export async function aiReportInsights(input: AiReportInsightsInput): Promise<AiReportInsightsOutput> {
  return aiReportInsightsFlow(input);
}

const aiReportInsightsPrompt = ai.definePrompt({
  name: 'aiReportInsightsPrompt',
  input: {schema: AiReportInsightsInputSchema},
  output: {schema: AiReportInsightsOutputSchema},
  prompt: `You are an AI assistant that provides insightful observations based on lab reports.

  Given the following lab report, provide a short observation (1-2 sentences) about any potential trends or areas of concern.

  Lab Report:
  {{reportData}}
  `,
});

const aiReportInsightsFlow = ai.defineFlow(
  {
    name: 'aiReportInsightsFlow',
    inputSchema: AiReportInsightsInputSchema,
    outputSchema: AiReportInsightsOutputSchema,
  },
  async input => {
    const {output} = await aiReportInsightsPrompt(input);
    return output!;
  }
);
