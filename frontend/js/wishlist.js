const container =
    document.getElementById(
        'wishlistProducts'
    );

const user =
    JSON.parse(
        localStorage.getItem('user')
    );

async function loadWishlist() {

    if (!user) {

        container.innerHTML =
            '<h2>Please Login First</h2>';

        return;

    }

    const wishlist =
        JSON.parse(
            localStorage.getItem(
                `wishlist_${user.email}`
            )
        ) || [];

    const response =
        await fetch(
            'https://ecommerce-store-7ij2.onrender.com/api/products'
        );

    const products =
        await response.json();

    const wishlistProducts =
        products.filter(product =>
            wishlist.includes(product._id)
        );

    container.innerHTML = '';

    if (wishlistProducts.length === 0) {

        container.innerHTML = `
            <h2>
                Wishlist Is Empty
            </h2>
        `;

        return;

    }

    wishlistProducts.forEach(product => {

        container.innerHTML += `

<div class="wishlist-card">

    <img
        src="${product.image}"
        alt="${product.name}"
    >

    <div class="wishlist-info">

        <h3>
            ${product.name}
        </h3>

        <p>
            ⭐ ${product.rating || 4}
        </p>

        <p class="wishlist-price">
            ₹${product.price}
        </p>

        <div class="wishlist-actions">

            <a
                href="product.html?id=${product._id}"
                style="flex:1;"
            >
                <button
                    style="width:100%;"
                >
                    View
                </button>
            </a>

            <button
                onclick="
                    moveToCart(
                        '${product._id}'
                    )
                "
            >
                Cart
            </button>

            <button
                onclick="
                    removeWishlist(
                        '${product._id}'
                    )
                "
            >
                Remove
            </button>

        </div>

    </div>

</div>

`;

    });

}

function removeWishlist(id) {

    let wishlist =
        JSON.parse(
            localStorage.getItem(
                `wishlist_${user.email}`
            )
        ) || [];

    wishlist =
        wishlist.filter(
            productId =>
                productId !== id
        );

    localStorage.setItem(
        `wishlist_${user.email}`,
        JSON.stringify(wishlist)
    );

    loadWishlist();

}

async function moveToCart(id) {

    const response =
        await fetch(
            `https://ecommerce-store-7ij2.onrender.com/api/products/${id}`
        );

    const product =
        await response.json();

    let cart =
        JSON.parse(
            localStorage.getItem(
                `cart_${user.email}`
            )
        ) || [];

    const existingProduct =
        cart.find(
            item =>
                item._id === product._id
        );

    if (existingProduct) {

        existingProduct.quantity =
            (existingProduct.quantity || 1)
            + 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    localStorage.setItem(
        `cart_${user.email}`,
        JSON.stringify(cart)
    );

    removeWishlist(id);

    alert(
        'Moved To Cart'
    );

}

loadWishlist();