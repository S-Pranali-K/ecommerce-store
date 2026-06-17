const cartItems =
    document.getElementById('cartItems');

const totalPrice =
    document.getElementById('totalPrice');

const user =
    JSON.parse(
        localStorage.getItem('user')
    );

if (!user) {

    alert('Please Login First');

    window.location.href =
        'login.html';

}

function loadCart() {

    const cart =
        JSON.parse(
            localStorage.getItem(
                `cart_${user.email}`
            )
        ) || [];

    cartItems.innerHTML = '';

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <h2>Your Cart Is Empty 🛒</h2>
        `;

        totalPrice.innerText =
            'Total: ₹0';

        return;
    }

    cart.forEach(product => {

        const quantity =
            product.quantity || 1;

        const subtotal =
            product.price * quantity;

        total += subtotal;

        cartItems.innerHTML += `
            <div style="
                border:1px solid #ddd;
                padding:20px;
                margin-bottom:20px;
                display:flex;
                gap:20px;
                align-items:center;
                background:#fff;
                border-radius:10px;
            ">

                <img
                    src="${product.image}"
                    width="150"
                    height="150"
                    style="
                        object-fit:cover;
                        cursor:pointer;
                        border-radius:10px;
                    "
                    onclick="
                        openProduct(
                            '${product._id}'
                        )
                    "
                >

                <div>

                    <h2
                        style="
                            cursor:pointer;
                        "
                        onclick="
                            openProduct(
                                '${product._id}'
                            )
                        "
                    >
                        ${product.name}
                    </h2>

                    <h3>
                        ₹${product.price}
                    </h3>

                    <p>
                        Quantity:
                        ${quantity}
                    </p>

                    <p>
                        Subtotal:
                        ₹${subtotal}
                    </p>

                    <button
                        onclick="
                            increaseQuantity(
                                '${product._id}'
                            )
                        "
                    >
                        +
                    </button>

                    <button
                        onclick="
                            decreaseQuantity(
                                '${product._id}'
                            )
                        "
                    >
                        -
                    </button>

                    <button
                        onclick="
                            removeItem(
                                '${product._id}'
                            )
                        "
                    >
                        Remove
                    </button>

                </div>

            </div>
        `;
    });

    totalPrice.innerText =
        `Grand Total: ₹${total}`;
}

function increaseQuantity(id) {

    let cart =
        JSON.parse(
            localStorage.getItem(
                `cart_${user.email}`
            )
        ) || [];

    const item =
        cart.find(
            product =>
                product._id === id
        );

    if (item) {

        item.quantity =
            (item.quantity || 1) + 1;

    }

    localStorage.setItem(
        `cart_${user.email}`,
        JSON.stringify(cart)
    );

    loadCart();
}

function decreaseQuantity(id) {

    let cart =
        JSON.parse(
            localStorage.getItem(
                `cart_${user.email}`
            )
        ) || [];

    const item =
        cart.find(
            product =>
                product._id === id
        );

    if (item) {

        item.quantity--;

        if (item.quantity <= 0) {

            cart =
                cart.filter(
                    product =>
                        product._id !== id
                );
        }

    }

    localStorage.setItem(
        `cart_${user.email}`,
        JSON.stringify(cart)
    );

    loadCart();
}

function removeItem(id) {

    let cart =
        JSON.parse(
            localStorage.getItem(
                `cart_${user.email}`
            )
        ) || [];

    cart =
        cart.filter(
            product =>
                product._id !== id
        );

    localStorage.setItem(
        `cart_${user.email}`,
        JSON.stringify(cart)
    );

    loadCart();
}

function openProduct(id) {

    window.location.href =
        `product.html?id=${id}`;
}

loadCart();