import { IconCircleArrowRight } from '@tabler/icons-react';
import { TextArea } from './TextArea';

interface PromptInputProps {
    text: string;
    setText: (text: string) => void;
    handleGetFeedback: () => void;
    maxLength?: number;
}

export function PromptInput ({text, setText, handleGetFeedback, maxLength = 300}: PromptInputProps) {
    return (
        <div>
            <h4 style={{marginBottom: '2px'}}>My prompt:</h4>
            <div style={{ display:'flex', flexDirection:'column', border: '1px solid var(--border-color)', backgroundColor:'var(--input-background-color)', borderRadius: '4px', padding: '6px'}}>
               <TextArea maxRows={5} value={text} handleValueChange={setText} maxLength={maxLength} /> 
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                    <p style={{fontSize: '10px'}}>{text.length}/{maxLength} Char</p>
                    <button onClick={handleGetFeedback}> <IconCircleArrowRight /> </button> 
                </div>
            </div>
        </div>
    );
}