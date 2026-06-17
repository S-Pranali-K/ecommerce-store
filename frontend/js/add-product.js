const addProductBtn =
    document.getElementById(
        'addProductBtn'
    );

addProductBtn.addEventListener(
    'click',
    async () => {

        try {

            const token =
                localStorage.getItem(
                    'token'
                );

            if (!token) {

                alert(
                    'Please Login Again'
                );

                return;

            }

            const product = {

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
                    ).value,

                rating: 4.0

            };

            const response =
                await fetch(
                    'http://localhost:5000/api/products',
                    {
                        method: 'POST',

                        headers: {

                            'Content-Type':
                                'application/json',

                            'Authorization':
                                token

                        },

                        body:
                            JSON.stringify(
                                product
                            )

                    }
                );

            const data =
                await response.json();

            if (response.ok) {

                alert(
                    'Product Added Successfully'
                );

                window.location.href =
                    'manage-products.html';

            } else {

                alert(
                    data.message
                );

            }

        } catch (error) {

            console.log(error);

            alert(
                'Something Went Wrong'
            );

        }

    }
);