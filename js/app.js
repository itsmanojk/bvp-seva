import db from './database.js';

// Sample restaurant data
const sampleRestaurants = [
    {
        id: 1,
        name: "Domino's Pizza",
        image: "./images/food1.jpg",
        rating: 4.2,
        cuisine: "Pizza, Italian, Fast Food",
        deliveryTime: "30-40 min",
        priceRange: "₹200-600",
        address: "Shop 123, BVP Mall, Paschim Vihar",
        isPromoted: true,
        discount: "50% OFF up to ₹100"
    },
    {
        id: 2,
        name: "McDonald's",
        image: "./images/food2.jpg",
        rating: 4.3,
        cuisine: "Burgers, Fast Food",
        deliveryTime: "25-35 min",
        priceRange: "₹100-500",
        address: "BVP Food Court, Delhi",
        discount: "20% OFF on combos"
    },
    {
        id: 3,
        name: "Biryani Blues",
        image: "./images/food3.jpg",
        rating: 4.4,
        cuisine: "Biryani, North Indian, Mughlai",
        deliveryTime: "40-50 min",
        priceRange: "₹200-800",
        address: "Near Metro Station, Paschim Vihar",
        isPromoted: true,
        discount: "Free delivery"
    },
    {
        id: 4,
        name: "Subway",
        image: "./images/food1.jpg",
        rating: 4.1,
        cuisine: "Healthy Food, Sandwiches",
        deliveryTime: "20-30 min",
        priceRange: "₹150-600",
        address: "BVP Market Complex",
        discount: "Buy 1 Get 1 Free"
    },
    {
        id: 5,
        name: "Chinese Corner",
        image: "./images/food2.jpg",
        rating: 4.0,
        cuisine: "Chinese, Asian",
        deliveryTime: "35-45 min",
        priceRange: "₹100-400",
        address: "Shop 45, BVP Market",
        discount: "30% OFF on first order"
    },
    {
        id: 6,
        name: "Pizza Hut",
        image: "./images/food3.jpg",
        rating: 4.2,
        cuisine: "Pizza, Italian, Fast Food",
        deliveryTime: "30-40 min",
        priceRange: "₹200-700",
        address: "Near BVP College Gate",
        isPromoted: true,
        discount: "40% OFF up to ₹80"
    }
];

// Initialize the application
const initializeApp = async () => {
    try {
        const restaurants = await db.getRestaurants();
        if (restaurants.length === 0) {
            for (const restaurant of sampleRestaurants) {
                await db.addRestaurant(restaurant);
            }
        }
        loadRestaurants();
        updateCartCount();
    } catch (error) {
        showNotification('Error initializing app: ' + error);
    }
};

// Load restaurants
const loadRestaurants = async () => {
    try {
        const container = document.getElementById('restaurant-container');
        if (!container) {
            console.error('Restaurant container not found');
            return;
        }

        container.innerHTML = ''; // Clear existing content

        // Load sample restaurants directly if needed
        sampleRestaurants.forEach(restaurant => {
            container.appendChild(createRestaurantCard(restaurant));
        });

    } catch (error) {
        console.error('Error loading restaurants:', error);
    }
};

const createRestaurantCard = (restaurant) => {
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    card.innerHTML = `
        <div class="restaurant-image-container">
            ${restaurant.isPromoted ? '<span class="promoted-tag">Promoted</span>' : ''}
            <img src="${restaurant.image}" alt="${restaurant.name}" 
                 onerror="this.src='./images/default-restaurant.jpg'">
        </div>
        <div class="restaurant-info">
            <div class="restaurant-header">
                <h3>${restaurant.name}</h3>
                <span class="rating ${restaurant.rating >= 4.0 ? 'good-rating' : 'average-rating'}">
                    <i class="fas fa-star"></i> ${restaurant.rating}
                </span>
            </div>
            <div class="cuisine">${restaurant.cuisine}</div>
            <div class="restaurant-meta">
                <span class="meta-item">
                    <i class="far fa-clock"></i> ${restaurant.deliveryTime}
                </span>
                <span class="meta-item">
                    <i class="fas fa-rupee-sign"></i> ${restaurant.priceRange}
                </span>
            </div>
            <div class="restaurant-details">
                <span class="meta-item">
                    <i class="fas fa-map-marker-alt"></i> ${restaurant.address}
                </span>
                ${restaurant.discount ? `
                <div class="discount">
                    <i class="fas fa-tag"></i> ${restaurant.discount}
                </div>` : ''}
            </div>
        </div>
    `;
    return card;
};

// Add this at the beginning of your app.js file
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await db.init();
        await initializeApp();
        loadRestaurants(); // Add this line to ensure restaurants are loaded
    } catch (error) {
        console.error('Failed to initialize app:', error);
    }
});
