import { useEffect, useState } from "react";
import Anthropic from '@anthropic-ai/sdk'

function App() {
  const [text, setText] = useState("");

  // Anthropic Instance
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  })
  
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

 {/*   

async function analyzefeedback() {
  try {

      const text = textInputArea.value

      const response = await anthropic.messages.create({
          model: 'claude-3-5-sonnet-20240620',
          max_tokens: 500,
          system: 'You are tasked with providing feedback on inputs to Large Language Models (LLMs). Your goal is to evaluate the given input text based on specific criteria and provide constructive feedback. This feedback will help improve the quality of inputs used for LLMs.',
          messages: [
              {
                  'role': 'user',
                  'content': [
                      {
                          'type': 'text',
                          'text': `<input_text> ${text} </input_text> You will evaluate this input text based on the following criteria:
                            <criteria>
                            Clarity and Specificity
                            Context and Background Information
                            Focus and Scope
                            Tone and Style Requirements
                            Constraints and Formatting
                            Ambiguity and Open-Endedness
                            Intent and Purpose
                            Examples and Analogies
                            Flexibility and Adaptability
                            </criteria>

                            Please analyze the input text carefully, considering each criterion listed above. 
                            Pay attention to both the strengths and areas for improvement in the input.

                            To provide feedback:
                            1. For each criterion, assess how well the input text meets the requirement.
                            2. Identify specific examples from the text that support your assessment.
                            3. Offer constructive suggestions for improvement where applicable.
                            4. Be objective and balanced in your evaluation.

                            Present your feedback in the following format:

                            <feedback>
                            <criterion_name>
                            [Name of the criterion]
                            </criterion_name>
                            <assessment>
                            [Your assessment of how well the input meets this criterion]
                            </assessment>
                            <examples>
                            [Specific examples from the text supporting your assessment]
                            </examples>
                            <suggestions>
                            [Constructive suggestions for improvement, if any]
                            </suggestions>

                            [Repeat the above structure for each criterion]

                            <overall_impression>
                            [Provide a brief overall impression of the input text, summarizing its strengths and main areas for improvement]
                            </overall_impression>
                            </feedback>

                            Remember to be specific, constructive, and objective in your feedback. 
                            Your goal is to help improve the quality of inputs for LLMs, so focus on providing actionable insights and suggestions.`
                      }
                  ]
              }
          ]
      })
  } catch(error) {
      handleError(error)
  }
}
*/}

export default App;
