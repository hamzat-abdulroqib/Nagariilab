import { TestTube } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <TestTube className="h-6 w-6 text-primary" />
      <span className="text-lg font-bold">MediTrack Lite</span>
    </div>
  );
}
