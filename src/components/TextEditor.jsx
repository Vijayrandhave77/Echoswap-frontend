import { useState, useRef } from "react";
import JoditEditor from "jodit-react";

export default function TextEditor({ setFormData }) {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) =>
          setFormData((prev) => ({
            ...prev,
            description: newContent,
          }))
        }
      />
    </div>
  );
}
