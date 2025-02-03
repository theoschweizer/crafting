//import React from 'react';
import ReactDOM from 'react-dom/client';
import { Sidebar } from './Sidebar';

function makeRoomForSidebar() {
 // Inject Sidebar into Page
const sidebarContainer = document.createElement("div");
sidebarContainer.id = "crafting-sidebar";
document.body.appendChild(sidebarContainer);

// Adjust Page Content to Prevent Overlap
document.body.style.marginLeft = "300px"; // Push content to the right
document.body.style.transition = "margin 0.3s ease-in-out"; // Smooth transition

// Render Sidebar
const root = ReactDOM.createRoot(sidebarContainer);
root.render(<Sidebar />);
}

const pageObserver = new MutationObserver(() => {
  document.getElementById("crafting-sidebar") || makeRoomForSidebar();

  const inputBox = document.getElementById("prompt-textarea");

  if (inputBox) {
    pageObserver.disconnect(); // Stop observing once found

    const observer = new MutationObserver(() => {
      let textContent = inputBox?.children[0]?.textContent || "";
      // Check if input is fully cleared (edge case fix)
      if (!inputBox.children[0] || textContent.trim() === "") {
        textContent = ""; // Explicitly set empty string when fully cleared
      }
      chrome.runtime.sendMessage({ textContent });
    });

    observer.observe(inputBox, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
});

// Watch the entire document for changes
pageObserver.observe(document.body, { childList: true, subtree: true });