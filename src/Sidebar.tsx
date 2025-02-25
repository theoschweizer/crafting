import { useEffect, useState } from "react";
// import Anthropic from "@anthropic-ai/sdk";
// import { analyzefeedback } from "./api";
import { PromptInput } from "./components/PromptInput";
import "./main.css"
import { SelectedDisplay } from "./types";
import { IconBolt, IconBoltFilled, IconClipboardList, IconClipboardListFilled } from "@tabler/icons-react";
import { PromptDisplay } from "./components/PromptDisplay";
import { SuggestionDisplay } from "./components/SuggestionDisplay";

export function Sidebar () {
    const [text, setText] = useState("");
    const [selectedDisplay, setSelectedDisplay] = useState<SelectedDisplay>("prompt");
    const [modelResponseText, setModelResponseText] = useState("This is an **example** model response.");
    const imgURL = chrome.runtime.getURL("Logo_16.png");

    // Anthropic Instance
    // const anthropic = new Anthropic({
    //     apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
    //     dangerouslyAllowBrowser: true
    // })

    useEffect(() => {
        chrome.runtime.onMessage.addListener((message) => {
          if (message.type === "textbox") {
            setText(message.data); // Update state
          }
        });
      }, []);

    // async function handleGetFeedback() {
    //     const content = await analyzefeedback(anthropic, text);
    //     if (content?.[0]?.type === "text") {
    //         setModelResponseText(content[0].text);
    //     }
    // }


    return (
        <div style={{
            width: "300px",
            height: "100vh",
            position: "fixed",
            top: "0",
            left: "0",
            backgroundColor: "var(--background-color)",
            boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
            padding: "8px 16px",
            zIndex: 9999,
          }}>
            <div style={{ display: "flex", flexDirection: 'row', marginBottom: "8px" }}>
              <p style={{fontWeight: 'bold', marginRight: '6px'}}>Crafting</p>
              <img src={imgURL} alt="Logo" style={{width: '16px', height:'16px'}} />
            </div>
            <div style={{ margin: "24px 0" }}>
              <PromptInput text={text} setText={setText} handleGetFeedback={() => alert('button pushed')} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end"}}>
              <button onClick={() => setSelectedDisplay("prompt")}>
                {
                  selectedDisplay === "prompt" ? 
                    <IconBoltFilled size={24} /> :
                    <IconBolt size={24} />
                }
              </button>
              <button onClick={() => setSelectedDisplay("feedback")}>
                {
                  selectedDisplay === "feedback" ? 
                    <IconClipboardListFilled size={24} /> :
                    <IconClipboardList size={24} />
                }
              </button>
            </div>
            {
                selectedDisplay === "prompt" ? 
                  <PromptDisplay text={modelResponseText} setText={setModelResponseText} /> :
                  <SuggestionDisplay text={modelResponseText} />
              }
        </div>
    );
    }