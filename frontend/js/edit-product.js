const params =
    new URLSearchParams(
        window.location.search
    );

const id =
    params.get('id');

async function loadProduct() {

    const response =
        await fetch(
            `http://localhost:5000/api/products/${id}`
        );

    const product =
        await response.json();

    document.getElementById('name')
        .value = product.name;

    document.getElementById('description')
        .value = product.description;

    document.getElementById('price')
        .value = product.price;

    document.getElementById('image')
        .value = product.image;

    document.getElementById('stock')
        .value = product.stock;

    document.getElementById('category')
        .value = product.category;

}

loadProduct();

document
    .getElementById('updateBtn')
    .addEventListener(
        'click',
        async () => {

            const updatedProduct = {

                name:
                    document.getElementById(
                        'name'
                    ).value,

                description:
                    document.getElementById(
                        'description'
                    ).value,

                price:
                    document.getElementById(
                        'price'
                    ).value,

                image:
                    document.getElementById(
                        'image'
                    ).value,

                stock:
                    document.getElementById(
                        'stock'
                    ).value,

                category:
                    document.getElementById(
                        'category'
                    ).value

            };

            const response =
                await fetch(
                    `http://localhost:5000/api/products/${id}`,
                    {
                        method: 'PUT',

                        headers: {
                            'Content-Type':
                            'application/json'
                        },

                        body:
                            JSON.stringify(
                                updatedProduct
                            )
                    }
                );

            const data =
                await response.json();

            alert(data.message);

            window.location.href =
                'manage-products.html';

        }
    );