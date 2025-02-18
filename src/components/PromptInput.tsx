import { IconCircleArrowRight } from '@tabler/icons-react';
import { TextArea } from './TextArea';

interface PromptInputProps {
    text: string;
    setText: (text: string) => void;
    handleGetFeedback: () => void;
}

export function PromptInput ({text, setText, handleGetFeedback}: PromptInputProps) {
    return (
        <div>
            <h4 style={{marginBottom: '2px'}}>My prompt:</h4>
            <div style={{ display:'flex', flexDirection:'column', border: '1px solid var(--border-color)', backgroundColor:'var(--input-background-color)', borderRadius: '4px', padding: '6px'}}>
               <TextArea maxRows={5} value={text} handleValueChange={setText} maxLength={500} /> 
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                   <button onClick={handleGetFeedback}> <IconCircleArrowRight /> </button> 
                </div>
            </div>
        </div>
    );
}