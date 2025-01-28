chrome.runtime.onMessage.addListener((message, sender) => {
    console.log("Message received in background script:", message);
  
    // Relay the message to the content script
    if (message.textContent) {
      chrome.tabs.sendMessage(sender.tab.id, { textContent: message.textContent });
    }
  });