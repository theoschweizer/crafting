import { useEffect, useState } from "react";
import Anthropic from "@anthropic-ai/sdk";
import { analyzefeedback } from "./api";

export function Sidebar () {
    const [text, setText] = useState("");
    const [feedback, setFeedback] = useState("");

    // Anthropic Instance
    const anthropic = new Anthropic({
        apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
        dangerouslyAllowBrowser: true
    })

    useEffect(() => {
        chrome.runtime.onMessage.addListener((message) => {
          setText(message.textContent); // Update state
        });
      }, []);

    async function handleGetFeedback() {
        alert('button pushed');
        const content = await analyzefeedback(anthropic, text);
        if (content?.[0]?.type === "text") {
            setFeedback(content[0].text);
        }
    }


    return (
        <div style={{
            width: "300px",
            height: "100vh",
            position: "fixed",
            top: "0",
            left: "0",
            backgroundColor: "#f4f4f4",
            boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
            padding: "20px",
            zIndex: 9999,
          }}>
        <h2>My Prompt</h2>
        <p>{text}</p>
        <button onClick={handleGetFeedback}>Run the model</button>
        <p>{feedback}</p>
        </div>
    );
    }