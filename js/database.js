class Database {
    constructor() {
        this.dbName = 'BVPSevaDB';
        this.dbVersion = 1;
        this.db = null;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                if (!db.objectStoreNames.contains('restaurants')) {
                    const restaurantStore = db.createObjectStore('restaurants', { keyPath: 'id' });
                    restaurantStore.createIndex('name', 'name', { unique: false });
                    restaurantStore.createIndex('cuisine', 'cuisine', { unique: false });
                }

                if (!db.objectStoreNames.contains('cart')) {
                    const cartStore = db.createObjectStore('cart', { keyPath: 'id', autoIncrement: true });
                    cartStore.createIndex('restaurantId', 'restaurantId', { unique: false });
                }

                if (!db.objectStoreNames.contains('orders')) {
                    db.createObjectStore('orders', { keyPath: 'id' });
                }
            };
        });
    }

    async getRestaurants() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['restaurants'], 'readonly');
            const store = transaction.objectStore('restaurants');
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async addRestaurant(restaurant) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['restaurants'], 'readwrite');
            const store = transaction.objectStore('restaurants');
            const request = store.add(restaurant);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async searchRestaurants(searchTerm) {
        const restaurants = await this.getRestaurants();
        return restaurants.filter(restaurant => 
            restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
            restaurant.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    async getCart() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['cart'], 'readonly');
            const store = transaction.objectStore('cart');
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async addToCart(item) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['cart'], 'readwrite');
            const store = transaction.objectStore('cart');
            const request = store.add(item);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async clearCart() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['cart'], 'readwrite');
            const store = transaction.objectStore('cart');
            const request = store.clear();

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async placeOrder(order) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['orders'], 'readwrite');
            const store = transaction.objectStore('orders');
            const request = store.add(order);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getOrders() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['orders'], 'readonly');
            const store = transaction.objectStore('orders');
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}

const db = new Database();
export default db;