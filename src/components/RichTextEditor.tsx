import React, { useState } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const RichTextEditor: React.FC<Props> = ({ onChange, value }) => {
  const [editorHtml, setEditorHtml] = useState<string>(value);

  const handleChange = (html: string) => {
    setEditorHtml(html);
    onChange(html);
  };

  return (
    <div className="rich-text-container">
      <ReactQuill
        theme="snow"
        value={editorHtml}
        onChange={handleChange}
      />
    </div>
  );
};

export default RichTextEditor;