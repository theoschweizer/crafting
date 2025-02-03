import { useEffect, useState } from "react";

export function Sidebar () {
    const [text, setText] = useState("");
    useEffect(() => {
        chrome.runtime.onMessage.addListener((message) => {
          setText(message.textContent); // Update state
        });
      }, []);
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
        </div>
    );
    }