'use client';

import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { 
  Bold, 
  Italic, 
  Link as LinkIcon, 
  Heading1, 
  Heading2, 
  Image as ImageIcon,
  List,
  Quote,
  Loader2
} from 'lucide-react';
import { useCallback } from 'react';

interface EditorProps {
  content: any;
  onChange: (content: any) => void;
  onSave: () => void;
  loading?: boolean;
}

const Editor = ({ content, onChange, onSave, loading }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline decoration-primary/30 underline-offset-4',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-2xl border border-slate-100 shadow-lg my-8',
        },
      }),
    ],
    content: content || '<p>Start writing your story...</p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg md:prose-xl lg:prose-2xl prose-slate focus:outline-none max-w-none font-serif',
      },
    },
  });

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt('Image URL');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="relative min-h-[500px] w-full max-w-3xl mx-auto py-10">
      {/* Bubble Menu */}
      <BubbleMenu 
        editor={editor} 
        tippyOptions={{ duration: 100 }}
        className="flex items-center gap-1 bg-slate-900 text-white p-1 rounded-lg border border-slate-800 shadow-xl overflow-hidden"
      >
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 hover:bg-slate-800 rounded transition-colors ${editor.isActive('bold') ? 'text-primary bg-slate-800' : ''}`}
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 hover:bg-slate-800 rounded transition-colors ${editor.isActive('italic') ? 'text-primary bg-slate-800' : ''}`}
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          onClick={setLink}
          className={`p-2 hover:bg-slate-800 rounded transition-colors ${editor.isActive('link') ? 'text-primary bg-slate-800' : ''}`}
        >
          <LinkIcon className="w-4 h-4" />
        </button>
      </BubbleMenu>

      {/* Floating Menu */}
      <FloatingMenu 
        editor={editor} 
        tippyOptions={{ duration: 100 }}
        className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 shadow-lg overflow-hidden translate-x-[-120%]"
      >
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 hover:bg-slate-50 rounded transition-colors ${editor.isActive('heading', { level: 1 }) ? 'text-primary bg-slate-100' : 'text-slate-600'}`}
        >
          <Heading1 className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 hover:bg-slate-50 rounded transition-colors ${editor.isActive('heading', { level: 2 }) ? 'text-primary bg-slate-100' : 'text-slate-600'}`}
        >
          <Heading2 className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 hover:bg-slate-50 rounded transition-colors ${editor.isActive('bulletList') ? 'text-primary bg-slate-100' : 'text-slate-600'}`}
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 hover:bg-slate-50 rounded transition-colors ${editor.isActive('blockquote') ? 'text-primary bg-slate-100' : 'text-slate-600'}`}
        >
          <Quote className="w-5 h-5" />
        </button>
        <button
          onClick={addImage}
          className="p-2 hover:bg-slate-50 rounded transition-colors text-slate-600"
        >
          <ImageIcon className="w-5 h-5" />
        </button>
      </FloatingMenu>

      {/* Text Canvas */}
      <div className="bg-white rounded-3xl min-h-[600px] p-8 md:p-12 shadow-sm border border-slate-100">
        <EditorContent editor={editor} />
      </div>

      {/* Floating Save Button */}
      <div className="fixed bottom-10 right-10 z-50">
        <button
          onClick={onSave}
          disabled={loading}
          className="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50 disabled:scale-100"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Editor;
