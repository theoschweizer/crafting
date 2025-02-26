import Anthropic from "@anthropic-ai/sdk"
import { SelectedDisplay } from "./types"

export async function analyzefeedback(anthropic: Anthropic, text: string, selectedDisplay: SelectedDisplay) {
    try {  
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
                            'text':  selectedDisplay === 'optimized' ? optimizePrompt(text) : suggestionsPrompt(text)
                        }
                    ]
                }
            ]
        })

    return response.content
    } catch(error) {
        console.error(error)
    }
  }

  const suggestionsPrompt = (text: string) => 
    `<input_text>${text}</input_text>
    You are a large language model prompt input evaluator and have 3 main tasks. 

Task 1:
Take the provided message and reason, analyze, and evaluate it. Determine the top suggestions and feedback that you would have to improve the input message so that it will have the most accurate and useful output. 
In addition to other criteria that you can think of typical things to examine would be clarity, specificity, context and background information, focus, scope, tone, style, formatting, ambiguity, examples, flexibility, and adaptability.
If you can think of more than 7 then only provide the top 7.

Task 2:
Once you have these top 7 suggestions think of a easily comprehendible 1-2 word summary for each suggestion. You can use an ampersand in between 2 words if needed.

Task 3:
To generate the output provide HTML tag formatting based off the following rules:
All of the output should be contained within an <ol> </ol> tag.
Inside these tags wrap a <li></li> around each suggestion. Present the suggestions in a bulleted list ranked by potential impact to improving the prompt.
Each suggestion should start with the summary from task 2 with <strong></strong> tags wrapped around it.
Then provide the actual suggestion after the </strong> tag and have it wrapped in <p></p> tags.`

const optimizePrompt = (text: string) =>
    `<input_text>${text}</input_text>
    You are a large language model prompt input optimizer

Take the provided message and reason, analyze, and evaluate it. Create an optimized version of the input prompt that will create the most accurate and useful output. This new prompt should not exceed 300 tokens.
In addition to other criteria that you can think of typical things to examine would be clarity, specificity, context and background information, focus, scope, tone, style, formatting, ambiguity, examples, flexibility, and adaptability.
Within this new optimal prompt you can also include placeholder variables which should be within closed brackets. Within these brackets can be a large X to indicate a missing character or up to 3 options for suggestion. For example the optimal prompt could include 'The trip should last [X] days' or 'Budget is [luxury/mid-range/budget]'. If you ever choose to include this place <strong></strong> tags around the variables brackets. When you are done wrap the entire text with <p></p> tags. 
    `

  /**
   * 1. 
You are a large language model prompt input evaluator and have 3 main tasks. 

Task 1:
Take the provided message and reason, analyze, and evaluate it. Determine the top suggestions and feedback that you would have to improve the input message so that it will have the most accurate and useful output. 
In addition to other criteria that you can think of typical things to examine would be clarity, specificity, context and background information, focus, scope, tone, style, formatting, ambiguity, examples, flexibility, and adaptability.
If you can think of more than 7 then only provide the top 7.

Task 2:
Once you have these top 7 suggestions think of a easily comprehendible 1-2 word summary for each suggestion. You can use an ampersand in between 2 words if needed.

Task 3:
To generate the output provide HTML tag formatting based off the following rules:
All of the output should be contained within an <ol> </ol> tag.
Inside these tags wrap a <li></li> around each suggestion. Present the suggestions in a bulleted list ranked by potential impact to improving the prompt.
Each suggestion should start with the summary from task 2 with <strong></strong> tags wrapped around it.
Then provide the actual suggestion after the </strong> tag and have it wrapped in <p></p> tags.


2.
You are a large language model prompt input optimizer

Take the provided message and reason, analyze, and evaluate it. Create an optimized version of the input prompt that will create the most accurate and useful output. This new prompt should not exceed 300 tokens.
In addition to other criteria that you can think of typical things to examine would be clarity, specificity, context and background information, focus, scope, tone, style, formatting, ambiguity, examples, flexibility, and adaptability.
Within this new optimal prompt you can also include placeholder variables which should be within closed brackets. Within these brackets can be a large X to indicate a missing character or up to 3 options for suggestion. For example the optimal prompt could include 'The trip should last [X] days' or 'Budget is [luxury/mid-range/budget]'. If you ever choose to include this place <strong></strong> tags around the variables brackets. When you are done wrap the entire text with <p></p> tags. 
   * 
   * 
   */