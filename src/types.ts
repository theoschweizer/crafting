export type SelectedDisplay = "prompt" | "feedback";

export type RuntimeMessage = {
    type: 'textbox' | 'show_sidebar'
    data: any
}