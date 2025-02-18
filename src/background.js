chrome.runtime.onMessage.addListener((message, sender) => {
  // Check if the message came from a tab
  if (sender.tab && sender.tab.id) {
    chrome.tabs.sendMessage(sender.tab.id, message);
  } else {
    // Fallback: send the message to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, message);
      } else {
        console.error("No active tab found to send the message to.");
      }
    });
  }
});