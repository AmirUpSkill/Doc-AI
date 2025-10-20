'use client';

import { EditorContent, type Editor } from '@tiptap/react';
import { cn } from '@/lib/utils';

interface DocumentProps {
  editor: Editor | null;
  className?: string;
}

export default function Document({ editor, className }: DocumentProps) {
  return (
    <div className={cn('w-full', className)}>
      <EditorContent editor={editor} />
    </div>
  );
}
