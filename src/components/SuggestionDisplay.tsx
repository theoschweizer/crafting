interface SuggestionDisplayProps {
    text: string;
}

export function SuggestionDisplay({ text }: SuggestionDisplayProps) {
    return (
        <div>
            <h4 style={{marginBottom: '2px'}}>Suggestions:</h4>
            <p style={{marginBottom: '2px'}}>To optimize response, consider the following.</p>
            <div style={{ display:'flex', flexDirection:'column', border: '1px solid var(--border-color)', backgroundColor:'var(--text-background-color)', borderRadius: '4px', padding: '6px'}}>
                <p>{text}</p>
            </div>
        </div>
    )
}