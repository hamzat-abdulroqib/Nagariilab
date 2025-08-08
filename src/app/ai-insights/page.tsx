import { PageHeader } from '@/components/page-header';
import { InsightGenerator } from './components/insight-generator';

export default function AiInsightsPage() {
  return (
    <>
      <PageHeader
        title="AI Report Insights"
        description="Generate insightful observations on trends from lab reports using AI."
      />
      <InsightGenerator />
    </>
  );
}
