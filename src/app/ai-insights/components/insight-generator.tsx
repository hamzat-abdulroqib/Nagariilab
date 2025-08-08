'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, Bot } from 'lucide-react';
import { aiReportInsights } from '@/ai/flows/report-insights';
import { Skeleton } from '@/components/ui/skeleton';

export function InsightGenerator() {
  const [reportData, setReportData] = React.useState('');
  const [insights, setInsights] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGenerate = async () => {
    if (!reportData.trim()) return;
    setIsLoading(true);
    setInsights('');
    try {
      const result = await aiReportInsights({ reportData });
      setInsights(result.insights);
    } catch (error) {
      console.error('Error generating insights:', error);
      setInsights('Failed to generate insights. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Lab Report Input</CardTitle>
          <CardDescription>Paste the lab report data below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter lab report data here..."
            className="h-64 resize-none"
            value={reportData}
            onChange={(e) => setReportData(e.target.value)}
          />
          <Button onClick={handleGenerate} disabled={isLoading || !reportData.trim()} className="w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            {isLoading ? 'Generating...' : 'Generate Insights'}
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>AI-Generated Insights</CardTitle>
          <CardDescription>Potential trends or areas of concern.</CardDescription>
        </CardHeader>
        <CardContent className="h-64">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
            </div>
          ) : insights ? (
            <div className="flex items-start gap-4">
               <div className="bg-primary/20 p-2 rounded-full">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm text-foreground leading-relaxed pt-1.5">{insights}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <Bot className="h-12 w-12 mb-4" />
                <p>Insights will appear here once generated.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
