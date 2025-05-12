import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { PopupStyles } from "../styles";
import { RuntimeMessage } from "../../types";

export function Login() {
    async function handleGoogleLogin () {
        chrome.identity.getAuthToken({ interactive: true }, async (token) => {
            if (chrome.runtime.lastError) {
                console.error('Error:', chrome.runtime.lastError.message);
                return;
            }
            if (token) {
                try {
                    await validateToken(token);
                    chrome.runtime.sendMessage({
                        type: "authenticated",
                        data: true,
                    } as RuntimeMessage);
                } catch (error) {
                    alert('Token expired. Try again.');
                }

            } else {
                alert('Login failed. Login to Google Chrome and try again.');
            }
        });
    };

    return (
        <div style={PopupStyles.container}>
            <img src="./../Logo_48.png" alt="Logo" style={PopupStyles.logo} />
            <h1 style={PopupStyles.title}>Crafting AI</h1>
            <button style={PopupStyles.button} onClick={handleGoogleLogin}>
                Login with <IconBrandGoogleFilled size={18} color="#fff" style={{marginLeft: '4px'}} />
            </button>
        </div>
    );  
};

async function validateToken(token: string) {
    try {
        const resp = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`)
        if (!resp.ok) {
            throw new Error('Invalid token');
        }
        return resp.json();
    } catch (error) {
        chrome.identity.removeCachedAuthToken({ token });
        throw new Error('Invalid token');
    }
}
