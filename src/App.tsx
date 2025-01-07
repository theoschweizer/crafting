import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

function App () {
  const [searchInputs, setSearchInputs] = useState<string[]>([]);

  useEffect(() => {
    // Get the current tab to ensure we're in the extension context
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id || 0},
        function: () => {
          // This code runs in the context of the web page
          const input = document.querySelector('input[name="q"]');
          return input ? input.nodeValue : '';
        }   
      }).then((results) => {
        const r = results[0].result as string
        if (r) {
          setSearchInputs([r]);
        }
      });
    });
  }, []);

  return (
    <div className="p-4 w-64">
      <h2 className="text-lg font-bold mb-4">Current Search Input</h2>
      <ul className="space-y-2">
        {searchInputs.map((input, index) => (
          <li key={index} className="p-2 bg-gray-100 rounded">
            {input}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Initialize React
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
