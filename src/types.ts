export type SelectedDisplay = "optimized" | "feedback";

export type RuntimeMessage = {
    type: 'textbox' | 'show_sidebar'
    data: any
}