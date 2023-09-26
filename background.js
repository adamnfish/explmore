chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeBackgroundColor({
        color: "rgba(255, 255, 255, 0.3)"
    });
    chrome.action.setBadgeText({
        text: "",
    });
});

// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
    if (tab.title.endsWith("Grafana")) {
        // We retrieve the action badge to check if the extension is enabled
        const currentState = await chrome.action.getBadgeText({ tabId: tab.id });

        if (currentState == "") {
            // Show UI feedback and prevent repeat invocations
            await chrome.action
                .setBadgeText({
                    tabId: tab.id,
                    text: "ON"
                });

            // Execute script in the tab
            await chrome.scripting
                .executeScript({
                    target: { tabId: tab.id },
                    files: ["explmore.js"],
                });
        }
    }
});
