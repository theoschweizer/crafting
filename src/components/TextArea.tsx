import React from "react";
import DOMPurify from "dompurify";
import { EditorProvider, Editor } from "@tiptap/react";


interface TextAreaProps extends React.HTMLAttributes<HTMLParagraphElement> {
    value: string
    handleValueChange: (value: string) => void
    maxRows?: number
}

export function TextArea ({value, handleValueChange, maxRows = 0, ...props}: TextAreaProps) {
    const [text, setText] = React.useState("");
    const textareaRef = React.useRef<HTMLParagraphElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setText(DOMPurify.sanitize(value));
        adjustHeight();
    }, [value]);
        
    function adjustHeight() {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }

    function handleInput () {
        if (contentRef.current) {
            const divContent = contentRef.current.innerHTML
            const markdown = htmlToMarkdown(divContent)
            handleValueChange(markdown)
            const newHtml = parseMarkdown(markdown)
            // convert it to markdown
            // add new line characters
            // set the state
            // convert back to html
        }
    };

    return (
        <div
            ref={contentRef}
            contentEditable
            onInput={handleInput}
            style={{
                minHeight: "100px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                outline: "none",
                whiteSpace: "pre-wrap",
            }}
            suppressContentEditableWarning
        >
            {DOMPurify.sanitize(parseMarkdown(text))}
        </div>
    );
} 

function parseMarkdown(text: string) {
    return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold (**text**)
        .replace(/_(.*?)_/g, "<em>$1</em>"); // Italic (_text_)
}

function htmlToMarkdown(html: string) {
    return html
        .replace(/<strong>(.*?)<\/strong>/g, "**$1**") // Convert <strong> to **
        .replace(/<em>(.*?)<\/em>/g, "_$1_"); // Convert <em> to _
}