import {
  getStoredTabIdLogin,
  setStoredTabIdLogin,
} from '../../lib/work-with-api/storage';
import { loginPopupListener } from './loginPopupListener';
import { onInstalled } from './onInstalled';
import { tabUpdaterListener } from './tabUpdaterListener';

console.log('This is the background page.');

// OnInstalled extension functions
onInstalled();

// Listener: Check Login popup page
loginPopupListener();

// Listener: Updated Tab Message to Content Script
tabUpdaterListener();

// Listener: Check Closed Windows and Update Storage
chrome.tabs.onRemoved.addListener((id) => {
  getStoredTabIdLogin().then((tabIdLogin) => {
    if (tabIdLogin === id) setStoredTabIdLogin(null);
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.isEnabled) {
    chrome.action.setIcon({
      path: {
        16: '16x16.png',
        32: '32x32.png',
        64: '64x64.png',
        128: '128x128.png',
        256: '256x256.png',
      },
      tabId: sender.tab.id,
    });
  }
  sendResponse({ status: 'success' });
});
