/* globals chrome */

/**
 * Save data to the sync chrome storage
 * @param {string} key The key for the data in the storage, need to be unique.
 * @param {object} value The object data to save.
 */
const saveToStorage = (key, value) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ [key]: value }, () => {
      const err = chrome.runtime.lastError;
      if (err) reject(err);

      resolve(true);
    });
  });
};

/**
 * Load data from the sync chrome storage
 * @param {string} key The key of which data need to load.
 */
const loadFromStorage = (key) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], data => {
      const err = chrome.runtime.lastError;
      if (err) reject(err);

      resolve(data[key]);
    });
  });
};

/**
 * Clear data from the sync chrome storage
 */
const clearStorage = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.clear(() => {
      const err = chrome.runtime.lastError;
      if (err) reject(err);

      resolve(true);
    });
  });
};

export { saveToStorage, loadFromStorage, clearStorage };