
export const PopupStyles = {
    container: { 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: "180px", 
        height: "150px", 
        padding: '24px',
    },
    logo: {
        width: '48px',
        height: '48px',
        marginBottom: '8px',
    },
    title: {
        marginBottom: '24px',
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#4285F4',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
} as const;

export type PopupStyleKeys = keyof typeof PopupStyles;