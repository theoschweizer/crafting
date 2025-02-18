//import React from 'react';
import ReactDOM from 'react-dom/client';
import { Sidebar } from './Sidebar';

function injectSidebar() {
if (document.getElementById("crafting-sidebar")) return; // Sidebar already injected

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

function injectFont() {
  if (document.getElementById("crafting-font")) return; // Font already injected

  const fontLink = document.createElement('link');
  fontLink.href = "https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap";
  fontLink.rel = "stylesheet";
  fontLink.id = "crafting-font";
  document.head.appendChild(fontLink);
}

const pageObserver = new MutationObserver(() => {
  injectFont();

  const showSidebarJSON = window.localStorage.getItem('show_sidebar')
  if (showSidebarJSON === null || showSidebarJSON === 'true') {
      injectSidebar();
  }

  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "show_sidebar") {
      if (message.data) {
        injectSidebar();
      } else {
        const sidebar = document.getElementById("crafting-sidebar");
        if (sidebar) {
          sidebar.remove();
          document.body.style.marginLeft = "0"; // Reset margin
        }
      }
    }
  });

  const inputBox = document.getElementById("prompt-textarea");

  if (inputBox) {
    pageObserver.disconnect(); // Stop observing once found

    const observer = new MutationObserver(() => {
      let textContent = inputBox?.children[0]?.textContent || "";
      // Check if input is fully cleared (edge case fix)
      if (!inputBox.children[0] || textContent.trim() === "") {
        textContent = ""; // Explicitly set empty string when fully cleared
      }
      chrome.runtime.sendMessage({ type: 'textbox', data: textContent });
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