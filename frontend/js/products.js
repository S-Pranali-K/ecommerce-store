const productsContainer =
    document.getElementById(
        'products'
    );

let allProducts = [];

async function loadProducts() {

    try {

        const response = await fetch(
            'https://ecommerce-store-7ij2.onrender.com/api/products'
        );

        allProducts =
            await response.json();

        const products =
            [...allProducts];

        productsContainer.innerHTML = '';

        products.forEach(product => {

            productsContainer.innerHTML += `
                <div
                    class="product-card"
                    data-category="${product.category}"
                >
                    <img src="${product.image}" alt="${product.name}">

                    <div class="product-info">

                        <h3>${product.name}</h3>

                        <p>
                            ⭐ ${product.rating || 4}
                        </p>

                        <p>
                            ${product.category}
                        </p>

                        <p>₹${product.price}</p>

                    <a href="product.html?id=${product._id}">
                        <button>View Details</button>
                    </a>

                    <button
                        onclick="addToWishlist('${product._id}')"
                    >
                        ❤️ Wishlist
                    </button>
                    </div>

                </div>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}

loadProducts();

const logoutBtn =
    document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', () => {

    localStorage.removeItem('user');

    alert('Logged Out');

    window.location.href = 'login.html';

});

const cartLink =
    document.getElementById('cartLink');

const user =
    JSON.parse(
        localStorage.getItem('user')
    );

let cart = [];

if (user) {

    cart =
        JSON.parse(
            localStorage.getItem(
                `cart_${user.email}`
            )
        ) || [];

}

let count = 0;

cart.forEach(item => {
    count += item.quantity || 1;
});

cartLink.innerText =
    `Cart (${count})`;

const searchInput =
    document.getElementById('searchInput');

searchInput.addEventListener('keyup', () => {

    const value =
        searchInput.value.toLowerCase();

    const cards =
        document.querySelectorAll('.product-card');

    cards.forEach(card => {

        const name =
            card.querySelector('h3')
                .innerText
                .toLowerCase();

        if (name.includes(value)) {

            card.style.display = 'block';

        } else {

            card.style.display = 'none';

        }

    });

});
function addToWishlist(id) {

    const user =
        JSON.parse(
            localStorage.getItem('user')
        );

    if (!user) {

        alert('Please Login First');
        return;

    }

    let wishlist =
        JSON.parse(
            localStorage.getItem(
                `wishlist_${user.email}`
            )
        ) || [];

    if (!wishlist.includes(id)) {

        wishlist.push(id);

        localStorage.setItem(
            `wishlist_${user.email}`,
            JSON.stringify(wishlist)
        );

        alert('Added To Wishlist');

    } else {

        alert('Already In Wishlist');

    }

}

function filterProducts(category) {

    const cards =
        document.querySelectorAll(
            '.product-card'
        );

    cards.forEach(card => {

        if (
            category === 'All'
        ) {

            card.style.display =
                'block';

        } else {

            if (
                card.dataset.category ===
                category
            ) {

                card.style.display =
                    'block';

            } else {

                card.style.display =
                    'none';

            }

        }

    });

}

const sortProducts =
    document.getElementById(
        'sortProducts'
    );

sortProducts.addEventListener(
    'change',
    () => {

        const value =
            sortProducts.value;

        let products =
            [...allProducts];

        if (
            value === 'low-high'
        ) {

            products.sort(
                (a, b) =>
                    a.price - b.price
            );

        }

        if (
            value === 'high-low'
        ) {

            products.sort(
                (a, b) =>
                    b.price - a.price
            );

        }

        if (
            value === 'rating'
        ) {

            products.sort(
                (a, b) =>
                    (b.rating || 4)
                    -
                    (a.rating || 4)
            );

        }

        productsContainer.innerHTML = '';

        products.forEach(product => {

            productsContainer.innerHTML += `
                <div
                    class="product-card"
                    data-category="${product.category}"
                >
                    <img src="${product.image}" alt="${product.name}">

                    <div class="product-info">

                        <h3>${product.name}</h3>

                        <p>
                            ⭐ ${product.rating || 4}
                        </p>

                        <p>
                            ${product.category}
                        </p>

                        <p>
                            ₹${product.price}
                        </p>

                        <a href="product.html?id=${product._id}">
                            <button>
                                View Details
                            </button>
                        </a>

                        <button
                            onclick="addToWishlist('${product._id}')"
                        >
                            ❤️ Wishlist
                        </button>

                    </div>

                </div>
            `;

        });

    }
);

const themeSelect =
document.getElementById(
'themeSelect'
);

if(themeSelect){

const savedTheme =
localStorage.getItem(
'theme'
);

if(savedTheme){

document.body.className =
savedTheme;

themeSelect.value =
savedTheme;

}

themeSelect.addEventListener(

'change',

()=>{

const theme =
themeSelect.value;

document.body.className =
theme;

localStorage.setItem(

'theme',

theme

);

}

);

}