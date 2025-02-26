import { useEffect } from 'react';
import { isDefinedandNotNullorEmpty } from '../util'
import DOMPurify from 'dompurify';
import { Loader } from './Loader';

interface SuggestionDisplayProps {
    text: string;
    isLoading: boolean;
}

export function SuggestionDisplay({ text, isLoading }: SuggestionDisplayProps) {
    useEffect(() => {  
        const p = document.getElementById("suggestion-text")
        if (p) {
            p.innerHTML = DOMPurify.sanitize(text);
        }
    }
    , [text])

    return (
        <div style={{display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden'}}>
            <h4 style={{marginBottom: '2px'}}>Suggestions:</h4>
            {
                isDefinedandNotNullorEmpty(text) ?
                <>
                    <p style={{marginBottom: '2px'}}>To optimize response, consider the following.</p>
                    <div style={{ display:'flex', flexDirection:'column', border: '1px solid var(--border-color)', backgroundColor:'var(--text-background-color)', borderRadius: '4px', padding: '6px', minHeight: '80px', overflow:'hidden'}}>
                        <p id='suggestion-text' style={{overflow: 'auto'}}></p>
                    </div>
                </> :
                <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: 80}}>{isLoading ? <Loader /> : 'Enter prompt to see suggestions.'}</p>
            }

            
        </div>
    )
}