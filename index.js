async function sayHello () {
  let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: () => {
        alert('Hello from the service worker!');
        }
    });
}
document.getElementById('myButton').addEventListener('click', sayHello);