const container = document.getElementById('product-details');

const params = new URLSearchParams(window.location.search);

const id = params.get('id');

const reviewsContainer =
    document.getElementById(
        'reviewsContainer'
    );

const reviewForm =
    document.getElementById(
        'reviewForm'
    );

async function loadProduct() {

    const response = await fetch(
        `https://ecommerce-store-7ij2.onrender.com/api/products/${id}`
    );

    const product = await response.json();

    container.innerHTML = `

<div class="product-layout">

    <div class="product-image">

        <img
            src="${product.image}"
            alt="${product.name}"
        >

    </div>

    <div class="product-content">

        <p class="category">

            ${product.category}

        </p>

        <h1>

            ${product.name}

        </h1>

        <div class="rating-stars">

            ⭐ ${product.rating || 4}

        </div>

        <h2 class="price">

            ₹${product.price}

        </h2>

        <div class="stock-badge">

            ${
                product.stock > 0
                ? `✅ In Stock (${product.stock})`
                : `❌ Out Of Stock`
            }

        </div>

        <p>

            ${product.description}

        </p>

        <div class="product-buttons">

            <button id="cartBtn">

                🛒 Add To Cart

            </button>

            <button id="wishlistBtn">

                ❤️ Wishlist

            </button>

        </div>

    </div>

</div>

`;


    const user =
    JSON.parse(
        localStorage.getItem('user')
    );

if (user) {

    reviewForm.innerHTML = `

        <h3>
            Write A Review
        </h3>

        <select id="rating">

            <option value="5">
                ⭐⭐⭐⭐⭐
            </option>

            <option value="4">
                ⭐⭐⭐⭐
            </option>

            <option value="3">
                ⭐⭐⭐
            </option>

            <option value="2">
                ⭐⭐
            </option>

            <option value="1">
                ⭐
            </option>

        </select>

        <br><br>

        <textarea
            id="comment"
            placeholder="Write Review"
            rows="4"
            cols="50"
        ></textarea>

        <br><br>

        <button id="reviewBtn">
            Submit Review
        </button>

    `;

}

    // ADD TO CART
    document.getElementById('cartBtn')
    .addEventListener('click', () => {

        const user =
            JSON.parse(
                localStorage.getItem('user')
            );

        if (!user) {

            alert('Please Login First');

            window.location.href =
                'login.html';

            return;
        }

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
                (existingProduct.quantity || 1) + 1;

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

        alert('Product Added To Cart');

    });

    // ADD TO WISHLIST
    document.getElementById('wishlistBtn')
    .addEventListener('click', () => {

        const user =
            JSON.parse(
                localStorage.getItem('user')
            );

        if (!user) {

            alert('Please Login First');

            window.location.href =
                'login.html';

            return;
        }

        let wishlist =
            JSON.parse(
                localStorage.getItem(
                    `wishlist_${user.email}`
                )
            ) || [];

        if (
            !wishlist.includes(
                product._id
            )
        ) {

            wishlist.push(
                product._id
            );

            localStorage.setItem(
                `wishlist_${user.email}`,
                JSON.stringify(
                    wishlist
                )
            );

            alert(
                'Added To Wishlist'
            );

        } else {

            alert(
                'Already In Wishlist'
            );

        }

    });

    if (user) {

    document
        .getElementById(
            'reviewBtn'
        )
        ?.addEventListener(
            'click',
            async () => {

                const rating =
                    document.getElementById(
                        'rating'
                    ).value;

                const comment =
                    document.getElementById(
                        'comment'
                    ).value;

                const response =
                    await fetch(
                        fetch(`https://ecommerce-store-7ij2.onrender.com/api/products/${id}`),
                        {
                            method: 'POST',

                            headers: {
                                'Content-Type':
                                    'application/json'
                            },

                            body: JSON.stringify({

                                user:
                                    user.email,

                                rating,

                                comment

                            })

                        }
                    );

                const data =
                    await response.json();

                alert(
                    data.message
                );

                loadProduct();

            }
        );

}

reviewsContainer.innerHTML = '';

if (
    product.reviews &&
    product.reviews.length > 0
) {

    product.reviews.forEach(review => {

        reviewsContainer.innerHTML += `

<div class="review-card">

    <h3>

        ⭐ ${review.rating}

    </h3>

    <p>

        ${review.comment}

    </p>

    <small>

        ${review.user}

    </small>

</div>

`;


    });

}

}

loadProduct();