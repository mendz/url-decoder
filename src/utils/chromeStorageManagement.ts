type StorageObject = { [key: string]: any };

/**
 * Save data to the sync chrome storage
 * @param key The key for the data in the storage, need to be unique.
 * @param value The object data to save.
 */
async function saveToStorage(key: string, value: any): Promise<void> {
  try {
    await chrome.storage.sync.set({ [key]: value });
  } catch (error: any) {
    throw new Error(`Save: ${error?.message}`);
  }
}

/**
 * Load data from the sync chrome storage
 * @param key The key of which data need to load.
 */
async function loadFromStorage(key: string): Promise<any> {
  try {
    const data: StorageObject = await chrome.storage.sync.get([key]);
    return data[key];
  } catch (error: any) {
    throw new Error(`Load: ${error?.message}`);
  }
}

/**
 * Clear data from the sync chrome storage
 */
async function clearStorage(): Promise<void> {
  try {
    await chrome.storage.sync.clear();
  } catch (error: any) {
    throw new Error(`Clear: ${error?.message}`);
  }
}

export { saveToStorage, loadFromStorage, clearStorage };
