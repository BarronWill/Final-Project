// Base Storage Interface
class StorageManager {
    setItem(key, value) {
        throw new Error("Method not implemented.");
    }
    
    getItem(key) {
        throw new Error("Method not implemented.");
    }
    
    removeItem(key) {
        throw new Error("Method not implemented.");
    }
}
// LocalStorage Implementation
class LocalStorageManager extends StorageManager {
    setItem(key, value) {
        localStorage.setItem(key, value);
    }
    
    getItem(key) {
        return localStorage.getItem(key);
    }
    
    removeItem(key) {
        localStorage.removeItem(key);
    }
}
// SessionStorage Implementation
class SessionStorageManager extends StorageManager {
    setItem(key, value) {
        sessionStorage.setItem(key, value);
    }
    
    getItem(key) {
        return sessionStorage.getItem(key);
    }
    
    removeItem(key) {
        sessionStorage.removeItem(key);
    }
}
// CookieStorage Implementation
class CookieStorageManager extends StorageManager {
    setItem(key, value, days = 7) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = key + "=" + value + expires + "; path=/";
    }

    getItem(key) {
        const nameEQ = key + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }

    removeItem(key) {
        this.setItem(key, "", -1); // Set past expiry to remove the cookie
    }
}
class StorageFactory {
    static createStorage(type) {
        switch (type) {
            case 'localStorage':
                return new LocalStorageManager();
            case 'sessionStorage':
                return new SessionStorageManager();
            case 'cookie':
                return new CookieStorageManager();
            default:
                throw new Error('Unknown storage type');
        }
    }
}

export default StorageFactory

// Usage Example
// const storageType = 'localStorage'; // Can be 'localStorage', 'sessionStorage', or 'cookie'
// const storage = StorageFactory.createStorage(storageType);

// // Set data in chosen storage type
// storage.setItem("sessionKey", "abc123");

// // Get data
// console.log(storage.getItem("sessionKey"));

// // Remove data
// storage.removeItem("sessionKey");
