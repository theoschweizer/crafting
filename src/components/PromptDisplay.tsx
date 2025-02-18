import { TextArea } from "./TextArea";
import { IconCopy, IconRepeat } from "@tabler/icons-react"

interface PromptDisplayProps {
    text: string;
    setText: (text: string) => void;
}

export function PromptDisplay({ text, setText}: PromptDisplayProps) {
    return (
        <div>
            <h4 style={{marginBottom: '2px'}}>Optimized:</h4>
            <div style={{ display:'flex', flexDirection:'column', border: '1px solid var(--border-color)', backgroundColor:'var(--input-background-color)', borderRadius: '4px', padding: '6px'}}>
                <TextArea value={text} handleValueChange={setText} />
                <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "6px" }}>
                    <button onClick={() => setChatGPTText(text)}><IconRepeat size={20}/></button>
                    <button onClick={() => navigator.clipboard.writeText(text)} style={{marginLeft: "8px"}}><IconCopy size={20}/></button>
                </div>
            </div>
        </div>
    )
}

function setChatGPTText(text: string) {
    const inputBox = document.getElementById("prompt-textarea");
    if (!inputBox) return;

    inputBox.children[0].textContent = text;
}
