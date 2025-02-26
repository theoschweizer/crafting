import { TextArea } from "./TextArea";
import { IconCopy, IconRepeat } from "@tabler/icons-react"
import { isDefinedandNotNullorEmpty } from "../util";
import { useEffect } from "react";
import DOMPurify from "dompurify";
import { Loader } from "./Loader";

interface OptimizedDisplayProps {
    text: string;
    setText: (text: string) => void;
    isLoading: boolean;
}

export function OptimizedDisplay({ text, setText, isLoading}: OptimizedDisplayProps) {
    useEffect(() => {  
        const p = document.getElementById("optimized-text")
        if (p) {
            p.innerHTML = DOMPurify.sanitize(text);
        }
    }
    , [text])

    return (
        <div style={{display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden'}}>
            <h4 style={{marginBottom: '2px'}}>Optimized:</h4>
            {
                isDefinedandNotNullorEmpty(text) ?
                <div style={{ display:'flex', flexDirection:'column', border: '1px solid var(--border-color)', backgroundColor:'var(--text-background-color)', borderRadius: '4px', padding: '6px', minHeight: '80px', overflow: 'hidden'}}>
                    <p id="optimized-text" style={{overflow: 'auto'}}></p> 
                    {/* <TextArea value={text} handleValueChange={setText} /> */}
                    <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "6px" }}>
                        <button onClick={() => setChatGPTText(text)}><IconRepeat size={20}/></button>
                        <button onClick={() => navigator.clipboard.writeText(text)} style={{marginLeft: "8px"}}><IconCopy size={20}/></button>
                    </div>
                </div> :
                <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: 80}}>{isLoading ? <Loader /> : 'Enter prompt to optimize.'}</p>
            }
        </div>
    )
}

function stripHtmlTags(htmlString: string) {
    return htmlString.replace(/<[^>]*>/g, '').trim();
}

function setChatGPTText(text: string) {
    const inputBox = document.getElementById("prompt-textarea");
    if (!inputBox) return;

    inputBox.children[0].textContent = stripHtmlTags(text)
}

