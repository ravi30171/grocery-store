// =====================================================
// FRESHCART - MAIN JAVASCRIPT
// =====================================================


// =====================================================
// VARIABLES
// =====================================================

let cart = [];
let discount = 0;
let deliveryCharge = 0;


// =====================================================
// ADD TO CART
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    let buttons = document.querySelectorAll(".add-cart");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            let name = button.getAttribute("data-name");
            let price = Number(button.getAttribute("data-price"));

            let existingItem = cart.find(function (item) {
                return item.name === name;
            });

            if (existingItem) {

                existingItem.quantity++;

            } else {

                cart.push({
                    name: name,
                    price: price,
                    quantity: 1
                });

            }

            displayCart();
            updateCartCount();

            alert(name + " added to cart! 🛒");

        });

    });


    // Search
    let searchInput = document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener("input", searchProducts);

    }


    // Initial display
    displayCart();
    updateCartCount();
    calculateTotal();
    displayUserName();

});


// =====================================================
// DISPLAY CART
// =====================================================

function displayCart() {

    let cartItems = document.getElementById("cart-items");

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";


    // Empty cart
    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

        deliveryCharge = 0;

        calculateTotal();

        return;
    }


    // Display each product
    cart.forEach(function (item, index) {

        let itemTotal = item.price * item.quantity;

        let div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <div>

                <h3>${item.name}</h3>

                <p>₹${item.price} × ${item.quantity}</p>

                <strong>₹${itemTotal}</strong>

            </div>


            <div class="quantity-controls">

                <button onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

                <button onclick="removeItem(${index})">
                    🗑️
                </button>

            </div>

        `;

        cartItems.appendChild(div);

    });


    calculateTotal();

}


// =====================================================
// INCREASE QUANTITY
// =====================================================

function increaseQuantity(index) {

    if (!cart[index]) {
        return;
    }

    cart[index].quantity++;

    displayCart();

    updateCartCount();

}


// =====================================================
// DECREASE QUANTITY
// =====================================================

function decreaseQuantity(index) {

    if (!cart[index]) {
        return;
    }

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    displayCart();

    updateCartCount();

}


// =====================================================
// REMOVE ITEM
// =====================================================

function removeItem(index) {

    if (!cart[index]) {
        return;
    }

    cart.splice(index, 1);

    displayCart();

    updateCartCount();

}


// =====================================================
// UPDATE CART COUNT
// =====================================================

function updateCartCount() {

    let cartCount = document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    let totalItems = 0;

    cart.forEach(function (item) {

        totalItems += item.quantity;

    });

    cartCount.innerText = totalItems;

}


// =====================================================
// CALCULATE BILL
// =====================================================

function calculateTotal() {

    let subtotal = 0;


    cart.forEach(function (item) {

        subtotal += item.price * item.quantity;

    });


    // Delivery charge
    if (subtotal > 0) {

        deliveryCharge = 40;

    } else {

        deliveryCharge = 0;

    }


    let total = subtotal + deliveryCharge - discount;


    if (total < 0) {

        total = 0;

    }


    // HTML elements
    let subtotalElement =
        document.getElementById("cart-subtotal");

    let discountElement =
        document.getElementById("cart-discount");

    let deliveryElement =
        document.getElementById("delivery-charge");

    let totalElement =
        document.getElementById("cart-total");


    if (subtotalElement) {

        subtotalElement.innerText = subtotal;

    }


    if (discountElement) {

        discountElement.innerText = discount;

    }


    if (deliveryElement) {

        deliveryElement.innerText = deliveryCharge;

    }


    if (totalElement) {

        totalElement.innerText = total;

    }

}


// =====================================================
// APPLY COUPON
// =====================================================

function applyCoupon() {

    let couponInput =
        document.getElementById("coupon-code");

    let couponMessage =
        document.getElementById("coupon-message");


    if (!couponInput) {
        return;
    }


    let coupon =
        couponInput.value.trim().toUpperCase();


    if (coupon === "SAVE10") {


        if (cart.length === 0) {

            if (couponMessage) {

                couponMessage.innerText =
                    "❌ Add products to cart first.";

                couponMessage.style.color = "red";

            }

            return;

        }


        discount = 10;


        if (couponMessage) {

            couponMessage.innerText =
                "🎉 ₹10 discount applied!";

            couponMessage.style.color = "green";

        }


    } else {


        discount = 0;


        if (couponMessage) {

            couponMessage.innerText =
                "❌ Invalid coupon code.";

            couponMessage.style.color = "red";

        }

    }


    calculateTotal();

}


// =====================================================
// SEARCH PRODUCTS
// =====================================================

function searchProducts() {

    let searchInput =
        document.getElementById("searchInput");


    if (!searchInput) {
        return;
    }


    let searchText =
        searchInput.value.toLowerCase().trim();


    let products =
        document.querySelectorAll(".product");


    products.forEach(function (product) {

        let productText =
            product.innerText.toLowerCase();


        if (productText.includes(searchText)) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


// =====================================================
// FILTER CATEGORY
// =====================================================

function filterCategory(category) {

    let products =
        document.querySelectorAll(".product");


    products.forEach(function (product) {

        let productCategory =
            product.getAttribute("data-category");


        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


// =====================================================
// GO TO PRODUCTS
// =====================================================

function goToProducts() {

    let productsSection =
        document.getElementById("products");


    if (productsSection) {

        productsSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// =====================================================
// CLOSE CART
// =====================================================

function closeCart() {

    let cartSection =
        document.getElementById("cart");


    if (cartSection) {

        cartSection.style.display = "none";

    }

}


// =====================================================
// CHECKOUT
// =====================================================

function checkout() {


    // Check cart
    if (cart.length === 0) {

        alert("🛒 Your cart is empty!");

        return;

    }


    // Delivery date
    let deliveryDate =
        document.getElementById("delivery-date");


    if (
        deliveryDate &&
        deliveryDate.value === ""
    ) {

        alert("📅 Please select delivery date.");

        return;

    }


    // Delivery time
    let deliveryTime =
        document.getElementById("delivery-time");


    if (
        deliveryTime &&
        deliveryTime.value === ""
    ) {

        alert("⏰ Please select delivery time.");

        return;

    }


    // Create order ID
    let orderId =
        "FC" +
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    // Save order ID
    localStorage.setItem(
        "lastOrderId",
        orderId
    );


    // Save order date/time
    localStorage.setItem(
        "deliveryDate",
        deliveryDate.value
    );


    localStorage.setItem(
        "deliveryTime",
        deliveryTime.value
    );


    alert(
        "✅ Order placed successfully!\n\n" +
        "Order ID: " +
        orderId
    );


    // Clear cart
    cart = [];

    discount = 0;

    deliveryCharge = 0;


    displayCart();

    updateCartCount();

    calculateTotal();

}


// =====================================================
// TRACK ORDER
// =====================================================

function trackOrder() {

    let input =
        document.getElementById("order-id");


    let result =
        document.getElementById("tracking-message");


    if (!input || !result) {
        return;
    }


    let enteredId =
        input.value.trim().toUpperCase();


    let savedId =
        localStorage.getItem("lastOrderId");


    if (enteredId === "") {

        result.innerText =
            "❌ Please enter your Order ID.";

        result.style.color = "red";

        return;

    }


    if (
        savedId &&
        enteredId === savedId
    ) {

        result.innerText =
            "✅ Your order is confirmed and being prepared.";

        result.style.color = "green";


    } else {

        result.innerText =
            "❌ Order ID not found.";

        result.style.color = "red";

    }

}


// =====================================================
// DISPLAY USER NAME
// =====================================================

function displayUserName() {

    let userNameElement =
        document.getElementById("user-name");


    if (!userNameElement) {
        return;
    }


    let userName =
        localStorage.getItem("userName");


    if (userName) {

        userNameElement.innerText =
            "Welcome, " +
            userName +
            " 👋";

    }

}


// =====================================================
// LOGOUT
// =====================================================

function logoutUser() {

    localStorage.removeItem("loggedIn");

    window.location.href = "login.html";

}