let cart = [];
let discount = 0;
let deliveryCharge = 0;


// =========================
// ADD TO CART
// =========================

let buttons = document.querySelectorAll(".add-cart");

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        let name = button.getAttribute("data-name");
        let price = Number(button.getAttribute("data-price"));

        let existingProduct = cart.find(function(item) {
            return item.name === name;
        });

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        displayCart();

        alert(name + " added to cart! 🛒");

        // Move to cart
        document.getElementById("cart").scrollIntoView({
            behavior: "smooth"
        });

    });

});


// =========================
// DISPLAY CART
// =========================

function displayCart() {

    let cartItems = document.getElementById("cart-items");

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    } else {

        cart.forEach(function(item, index) {

            cartItems.innerHTML += `

                <div class="cart-item">

                    <div class="cart-item-info">

                        <h3>🛒 ${item.name}</h3>

                        <p>₹${item.price}</p>

                    </div>

                    <div class="quantity">

                        <button onclick="decreaseQuantity(${index})">
                            -
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button onclick="increaseQuantity(${index})">
                            +
                        </button>

                    </div>

                    <button
                        class="delete-btn"
                        onclick="removeItem(${index})">

                        🗑️

                    </button>

                </div>

            `;

        });

    }

    calculateTotal();
    updateCartCount();

}


// =========================
// INCREASE QUANTITY
// =========================

function increaseQuantity(index) {

    cart[index].quantity++;

    displayCart();

}


// =========================
// DECREASE QUANTITY
// =========================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    displayCart();

}


// =========================
// REMOVE ITEM
// =========================

function removeItem(index) {

    cart.splice(index, 1);

    displayCart();

}


// =========================
// CALCULATE TOTAL
// =========================

function calculateTotal() {

    let subtotal = 0;

    cart.forEach(function(item) {

        subtotal += item.price * item.quantity;

    });


    // Delivery charge
    if (subtotal === 0) {

        deliveryCharge = 0;

    } else {

        deliveryCharge = 40;

    }


    let total =
        subtotal -
        discount +
        deliveryCharge;


    document.getElementById("cart-subtotal").innerText =
        subtotal;

    document.getElementById("cart-discount").innerText =
        discount;

    document.getElementById("delivery-charge").innerText =
        deliveryCharge;

    document.getElementById("cart-total").innerText =
        total;

}


// =========================
// CART COUNT
// =========================

function updateCartCount() {

    let count = 0;

    cart.forEach(function(item) {

        count += item.quantity;

    });

    document.getElementById("cart-count").innerText =
        count;

}


// =========================
// COUPON
// =========================

function applyCoupon() {

    let code =
        document
        .getElementById("coupon-code")
        .value
        .trim()
        .toUpperCase();

    let message =
        document.getElementById("coupon-message");


    if (code === "SAVE10") {

        discount = 10;

        message.innerText =
            "✅ Coupon applied! ₹10 discount.";

    } else {

        discount = 0;

        message.innerText =
            "❌ Invalid coupon code.";

    }

    calculateTotal();

}


// =========================
// CHECKOUT
// =========================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty! 🛒");

        return;

    }


    let date =
        document.getElementById("delivery-date").value;

    let time =
        document.getElementById("delivery-time").value;


    if (date === "") {

        alert("Please select a delivery date.");

        return;

    }


    if (time === "") {

        alert("Please select a delivery time.");

        return;

    }


    let subtotal = 0;

    cart.forEach(function(item) {

        subtotal += item.price * item.quantity;

    });


    let total =
        subtotal -
        discount +
        deliveryCharge;


    alert(
        "🎉 ORDER PLACED SUCCESSFULLY!\n\n" +
        "📅 Delivery Date: " + date + "\n" +
        "⏰ Delivery Time: " + time + "\n" +
        "💰 Total Amount: ₹" + total
    );


    // Empty cart after order
    cart = [];

    discount = 0;

    displayCart();

}


// =========================
// SEARCH PRODUCTS
// =========================

function searchProducts() {

    let searchText =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();


    let products =
        document.querySelectorAll(".product");


    products.forEach(function(product) {

        let productName =
            product
            .querySelector("h3")
            .innerText
            .toLowerCase();


        if (productName.includes(searchText)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


// =========================
// CATEGORY FILTER
// =========================

function filterCategory(category) {

    let products =
        document.querySelectorAll(".product");


    products.forEach(function(product) {

        let productCategory =
            product.getAttribute("data-category");


        if (productCategory === category) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });


    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// =========================
// SHOP NOW BUTTON
// =========================

function goToProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// =========================
// CLOSE CART
// =========================

function closeCart() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// =========================
// TRACK ORDER
// =========================

function trackOrder() {

    let orderId =
        document
        .getElementById("order-id")
        .value
        .trim();


    let message =
        document.getElementById("tracking-message");


    if (orderId === "") {

        message.innerText =
            "❌ Please enter your Order ID.";

        return;

    }


    message.innerText =
        "📦 Order " +
        orderId +
        " is being prepared for delivery.";

}


// =========================
// START CART
// =========================

displayCart();