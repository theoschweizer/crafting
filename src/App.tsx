import { useEffect, useState } from "react";

function App() {
  const [text, setText] = useState("");
  
  async function scripts() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Inject the script into the current tab
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        const inputBox = document.getElementById("prompt-textarea");

        if (inputBox) {
          const observer = new MutationObserver(() => {
            const textContent = inputBox?.children[0]?.textContent || "";
            chrome.runtime.sendMessage({ textContent }); // Send the updated text to the background script or React component
          });

          observer.observe(inputBox, {
            childList: true, // Detect changes to direct children (e.g., text nodes)
            subtree: true, // Detect changes to nested elements
            characterData: true, // Observe text content changes
          });
        }
      },
    });
  }

  useEffect(() => {
    // Listen for messages from the background script
    chrome.runtime.onMessage.addListener((message) => {
      console.log("Message received in React:", message);
      if (message.textContent) {
        setText(message.textContent);
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      chrome.runtime.onMessage.removeListener(() => {})
    };
  }, []);

  scripts();

  return (
    <div>
      <p>my message:</p>
      <p>{text}</p>
    </div>
  );
}

export default App;
