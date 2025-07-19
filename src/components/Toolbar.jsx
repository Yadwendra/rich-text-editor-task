const Toolbar = ({ editor }) => {
  if (!editor) return null;

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      editor.chain().focus().setImage({ src: reader.result }).run();
    };
    reader.readAsDataURL(file);
  };

  const exportHTML = () => {
    const content = editor.getHTML();
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "content.html";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className="btn">Bold</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className="btn">Italic</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="btn">H1</button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="btn">Bullet</button>
      <label className="btn cursor-pointer">
        Upload
        <input type="file" accept="image/*" onChange={uploadImage} hidden />
      </label>
      <button onClick={exportHTML} className="btn">Export as HTML</button>
    </div>
  );
};

export default Toolbar;
