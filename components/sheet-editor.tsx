"use client";

// Temporary stub - react-data-grid has React 19 compatibility issues
// TODO: Re-enable when react-data-grid supports React 19 or downgrade to React 18

type SheetEditorProps = {
  content: string;
  saveContent: (content: string, isCurrentVersion: boolean) => void;
  currentVersion: string;
  status: string;
};

export default function SheetEditor({
  content,
  saveContent,
  currentVersion,
  status,
}: SheetEditorProps) {
  return (
    <div className="p-4 border rounded-md">
      <p className="text-sm text-muted-foreground mb-2">
        Sheet editor temporarily disabled due to React 19 compatibility.
      </p>
      <pre className="text-xs overflow-auto max-h-96 bg-muted p-4 rounded">
        {content}
      </pre>
    </div>
  );
}
