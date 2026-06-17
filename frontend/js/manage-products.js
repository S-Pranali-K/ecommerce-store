console.log("Manage Products JS Loaded");

document.getElementById(
    'productCount'
).innerText =
    products.length;
    
const productsContainer =
    document.getElementById(
        'products'
    );

async function loadProducts() {

    const response =
        await fetch(
            'http://localhost:5000/api/products'
        );

    const products =
        await response.json();

    console.log(products);

    productsContainer.innerHTML = '';

    products.forEach(product => {

        productsContainer.innerHTML += `
            <div class="product-card">

                <img
                    src="${product.image}"
                >

                <div class="product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ₹${product.price}
                    </p>

                    <button
                        onclick="
                            editProduct(
                                 '${product._id}'
                            )
                        "
                    >
                        Edit
                    </button>

                    <button
                        onclick="
                            deleteProduct(
                                '${product._id}'
                            )
                        "
                    >
                        Delete
                    </button>

                </div>

            </div>
        `;

    });

}

loadProducts();

async function deleteProduct(id) {

    const confirmDelete =
        confirm(
            'Are you sure you want to delete this product?'
        );

    if (!confirmDelete) {

        return;

    }

    const response =
        await fetch(
            `http://localhost:5000/api/products/${id}`,
            {
                method: 'DELETE'
            }
        );

    const data =
        await response.json();

    alert(data.message);

    loadProducts();

}
function editProduct(id) {

    window.location.href =
        `edit-product.html?id=${id}`;

}