type StorageObject = { [key: string]: any };

/**
 * Save data to the sync chrome storage
 * @param key The key for the data in the storage, need to be unique.
 * @param value The object data to save.
 */
function saveToStorage(key: string, value: any): Promise<boolean> {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ [key]: value }, () => {
      const err = chrome.runtime.lastError;
      if (err) new Error(`Save: ${err.message}`);

      resolve(true);
    });
  });
}

/**
 * Load data from the sync chrome storage
 * @param key The key of which data need to load.
 */
function loadFromStorage(key: string): Promise<any> {
  return new Promise((resolve) => {
    chrome.storage.sync.get([key], (data: StorageObject) => {
      const err = chrome.runtime.lastError;
      if (err) new Error(`Load: ${err.message}`);

      resolve(data[key]);
    });
  });
}

/**
 * Clear data from the sync chrome storage
 */
function clearStorage(): Promise<boolean> {
  return new Promise((resolve) => {
    chrome.storage.sync.clear(() => {
      const err = chrome.runtime.lastError;
      if (err) new Error(`Clear: ${err.message}`);

      resolve(true);
    });
  });
}

export { saveToStorage, loadFromStorage, clearStorage };
