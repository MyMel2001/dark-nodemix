// Listen for when the extension is installed
browser.runtime.onInstalled.addListener(() => {
  console.log("Quick Filter Dark extension installed successfully!");
});

// Listen for a message from the content script
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getGreeting") {
    sendResponse({ reply: "Hello from QFD!" });
  }
});
