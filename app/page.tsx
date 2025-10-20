'use client';

import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Toolbar from '@/components/editor/Toolbar';
import Document from '@/components/editor/Document';
import { cn } from '@/lib/utils';

export default function Home() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Underline,
      Image,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-blue-600 dark:text-blue-400 underline cursor-pointer' },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '<p>Start writing your document…</p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: cn(
          'focus:outline-none min-h-[60vh] px-12 py-10',
          'bg-white dark:bg-[#1E1E1E] rounded-b-xl shadow-sm text-gray-900 dark:text-gray-100'
        ),
      },
    },
  });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto w-full">
        <Toolbar editor={editor} />
        <Document editor={editor} />
      </div>
    </div>
  );
}
