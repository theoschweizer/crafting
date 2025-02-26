import { useEffect, useState } from "react";
// import Anthropic from "@anthropic-ai/sdk";
// import { analyzefeedback } from "./api";
import { PromptInput } from "./components/PromptInput";
import "./main.css"
import { SelectedDisplay } from "./types";
import { IconBolt, IconBoltFilled, IconClipboardList, IconClipboardListFilled } from "@tabler/icons-react";
import { OptimizedDisplay } from "./components/OptimizedDisplay";
import { SuggestionDisplay } from "./components/SuggestionDisplay";
import Anthropic from "@anthropic-ai/sdk";
import { analyzefeedback } from "./api";

const MAX_INPUT_LENGTH = 300;

export function Sidebar () {
    const [text, setText] = useState("");
    const [selectedDisplay, setSelectedDisplay] = useState<SelectedDisplay>("optimized");
    const [modelOptimizeText, setModelOptimizeText] = useState("");
    const [modelSuggestText, setModelSuggestText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const imgURL = chrome.runtime.getURL("Logo_16.png");

    // Anthropic Instance
    const anthropic = new Anthropic({
        apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
        dangerouslyAllowBrowser: true
    })

    useEffect(() => {
        chrome.runtime.onMessage.addListener((message) => {
          if (message.type === "textbox") {
            setText(message.data); // Update state
          }
        });
      }, []);

      useEffect(() => {
        if ((selectedDisplay === "optimized" && modelOptimizeText === "") || (selectedDisplay === "feedback" && modelSuggestText === "")) {
          handleGetFeedback();
        }
      }, [selectedDisplay]);

    async function handleGetFeedback() {
        if (text.length === 0) {
          return
        }

        setIsLoading(true);
        try {
          const content = await analyzefeedback(anthropic, text.slice(0, MAX_INPUT_LENGTH), selectedDisplay);
          if (content?.[0]?.type === "text") {
            if (selectedDisplay === "optimized") {
              setModelOptimizeText(content[0].text);
            } else {
              setModelSuggestText(content[0].text);
            }
          }
        } catch {
          alert('Error fetching feedback');
        } finally {
          setIsLoading(false);
        }
    }

    function handleSubmit() {
        setModelOptimizeText("");
        setModelSuggestText("");
        handleGetFeedback()
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "300px",
            height: "100vh",
            position: "fixed",
            top: "0",
            left: "0",
            backgroundColor: "var(--background-color)",
            boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
            padding: "8px 16px",
            zIndex: 9999,
            overflow: 'hidden',
          }}>
            <div style={{ display: "flex", flexDirection: 'row', marginBottom: "8px" }}>
              <p style={{fontWeight: 'bold', marginRight: '6px'}}>Crafting</p>
              <img src={imgURL} alt="Logo" style={{width: '16px', height:'16px'}} />
            </div>
            <div style={{ margin: "24px 0" }}>
              <PromptInput text={text} setText={setText} handleGetFeedback={handleSubmit} maxLength={MAX_INPUT_LENGTH} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end"}}>
              <button onClick={() => setSelectedDisplay("optimized")}>
                {
                  selectedDisplay === "optimized" ? 
                    <IconBoltFilled size={24} /> :
                    <IconBolt size={24} />
                }              </button>
              <button onClick={() => setSelectedDisplay("feedback")}>
                {
                  selectedDisplay === "feedback" ? 
                    <IconClipboardListFilled size={24} /> :
                    <IconClipboardList size={24} />
                }
              </button>
            </div>
              {
                selectedDisplay === "optimized" ? 
                  <OptimizedDisplay text={modelOptimizeText} setText={setModelOptimizeText} isLoading={isLoading} /> :
                  <SuggestionDisplay text={modelSuggestText} isLoading={isLoading}/>
              }
        </div>
    );
    }