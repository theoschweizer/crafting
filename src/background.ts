const searchInputSelectors = {
    'google.com': 'input[name="q"]',
    'bing.com': 'input[name="q"]',
    'duckduckgo.com': 'input[name="q"]',
    'chatgpt.com': 'input[id="prompt-textarea"]'
};

function captureSearchInput() {
// Grabs whatever the current webpages url is I think
const domain = window.location.hostname;
const selector = Object.entries(searchInputSelectors).find(([key]) => 
    domain.includes(key)
)?.[1];

if (!selector) return;

const searchInput = document.querySelector(selector);
if (!searchInput) return;

searchInput.addEventListener('change', (event) => {
    chrome.runtime.sendMessage({
    type: 'SEARCH_INPUT',
    data: event.target?.value
    });
});
}

captureSearchInput();
const observer = new MutationObserver(captureSearchInput);
observer.observe(document.body, {
childList: true,
subtree: true
});