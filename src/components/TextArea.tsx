import React from "react";

type TextAreaProps = {
    handleValueChange: (value: string) => void;
    maxRows?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea ({value, handleValueChange, maxRows = 0, ...props}: TextAreaProps) {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
        adjustHeight();
    }, [value]);
        
    function adjustHeight() {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }

    return (
        <div 
            style={{ maxHeight: maxRows > 0 ? `${maxRows * 1.2}em` : 'none', overflowY: 'auto' }}
        >
        <textarea {...props} style={{ width: "100%", resize: "none", overflow: "hidden" }} ref={textareaRef} name="text" value={value} onChange={(e) => handleValueChange(e.target.value)}></textarea>
      </div>

    );
} 