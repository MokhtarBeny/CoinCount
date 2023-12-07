// Function to encrypt data
function encryptData(data: string): string {
    return btoa(data); // Base64 encode (Note: This is not secure encryption)
}

// Function to decrypt data
function decryptData(data: string): string {
    return atob(data); // Base64 decode
}

// Function to save data to localStorage
function saveToLocalStorage(key: string, data: string): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, data);
    }
}

// Function to load data from localStorage
function loadFromLocalStorage(key: string): string | null {
    const encryptedData = localStorage.getItem(key);
    if (encryptedData) {
        return decryptData(encryptedData);
    } else {
        return null; // or handle the absence of data appropriately
    }
}
const storage = { saveToLocalStorage, loadFromLocalStorage };
export default storage;