'use client';

import * as Icons from 'lucide-react';
import { type Editor } from '@tiptap/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const ToolBtn = ({ editor, onClick, active, disabled, icon: Icon, label }: {
  editor: Editor;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  icon: any;
  label: string;
}) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'h-8 w-8 p-0 rounded-md transition-colors',
      active
        ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
        : 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
    )}
    aria-label={label}
  >
    <Icon className="h-4 w-4" />
  </Button>
);

const Divider = () => <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-2" />;

export default function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const addImage = () => {
    const url = prompt('Enter image URL:');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const setLink = () => {
    const url = prompt('URL:', editor.getAttributes('link').href);
    if (url === null) return;
    url ? editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run() 
        : editor.chain().focus().extendMarkRange('link').unsetLink().run();
  };

  return (
    <div className="flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 px-4 py-2 bg-white dark:bg-[#1E1E1E] rounded-t-xl shadow-sm overflow-x-auto">
      <ToolBtn editor={editor} onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} icon={Icons.Bold} label="Bold" />
      <ToolBtn editor={editor} onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} icon={Icons.Italic} label="Italic" />
      <ToolBtn editor={editor} onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} icon={Icons.Underline} label="Underline" />
      <ToolBtn editor={editor} onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} icon={Icons.Strikethrough} label="Strikethrough" />
      <Divider />
      <ToolBtn editor={editor} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} icon={Icons.Heading1} label="Heading 1" />
      <ToolBtn editor={editor} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} icon={Icons.Heading2} label="Heading 2" />
      <Divider />
      <ToolBtn editor={editor} onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} icon={Icons.List} label="Bullet List" />
      <ToolBtn editor={editor} onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} icon={Icons.ListOrdered} label="Ordered List" />
      <Divider />
      <ToolBtn editor={editor} onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} icon={Icons.AlignLeft} label="Align Left" />
      <ToolBtn editor={editor} onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} icon={Icons.AlignCenter} label="Align Center" />
      <ToolBtn editor={editor} onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} icon={Icons.AlignRight} label="Align Right" />
      <ToolBtn editor={editor} onClick={() => editor.chain().focus().setTextAlign('justify').run()} active={editor.isActive({ textAlign: 'justify' })} icon={Icons.AlignJustify} label="Align Justify" />
      <Divider />
      <ToolBtn editor={editor} onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} icon={Icons.Code} label="Code Block" />
      <ToolBtn editor={editor} onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} icon={Icons.Quote} label="Blockquote" />
      <ToolBtn editor={editor} onClick={() => editor.chain().focus().setHorizontalRule().run()} icon={Icons.Minus} label="Horizontal Rule" />
      <Divider />
      <ToolBtn editor={editor} onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive('highlight')} icon={Icons.Highlighter} label="Highlight" />
      <ToolBtn editor={editor} onClick={setLink} active={editor.isActive('link')} icon={Icons.Link} label="Add Link" />
      <ToolBtn editor={editor} onClick={addImage} icon={Icons.ImagePlus} label="Add Image" />
      <Divider />
      <ToolBtn editor={editor} onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} icon={Icons.Undo} label="Undo" />
      <ToolBtn editor={editor} onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} icon={Icons.Redo} label="Redo" />
    </div>
  );
}
