

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useEffect, useState } from "react";
import Toolbar from "./Toolbar";
import { saveToLocal, loadFromLocal } from "../utils/storage";

const Editor = () => {
  const [status, setStatus] = useState("Saved");

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: loadFromLocal() || "<h1>My Document Title</h1><p>Start writing here...</p>",
    onUpdate({ editor }) {
      saveToLocal(editor.getHTML());
      setStatus("Saving...");
      setTimeout(() => setStatus("Saved"), 1000);
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (editor) {
        saveToLocal(editor.getHTML());
        setStatus("Saved");
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [editor]);

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 p-4 border rounded shadow bg-white">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="min-h-[300px] mt-4 border p-2 rounded" />
      <div className="text-sm text-dark text-2xl mt-2"><span className="text-gray-500">Auto-save status:</span> {status}</div>
    </div>
  );
};

export default Editor;
