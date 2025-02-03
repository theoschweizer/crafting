chrome.runtime.onMessage.addListener((message, sender) => {  
    // Relay the message to the content script
    if (message.textContent) {
      chrome.tabs.sendMessage(sender.tab.id, { textContent: message.textContent });
    }
  });