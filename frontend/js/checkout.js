const orderBtn =
    document.getElementById(
        'orderBtn'
    );

orderBtn.addEventListener(
    'click',
    async () => {

        const user =
            JSON.parse(
                localStorage.getItem(
                    'user'
                )
            );

        const cart =
            JSON.parse(
                localStorage.getItem(
                    `cart_${user.email}`
                )
            ) || [];

        if (cart.length === 0) {

            alert(
                'Cart Is Empty'
            );

            return;

        }

        let totalAmount = 0;

        cart.forEach(product => {

            totalAmount +=
                product.price *
                (
                    product.quantity
                    || 1
                );

        });

        try {

            const response =
                await fetch(
                    'http://localhost:5000/api/orders',
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body: JSON.stringify({

                            userEmail:
                                user.email,

                            products:
                                cart,

                            totalAmount

                        })

                    }
                );

            const data =
                await response.json();

            alert(
                data.message
            );

            localStorage.removeItem(
                `cart_${user.email}`
            );

            window.location.href =
                'orders.html';

        } catch (error) {

            console.log(error);

        }

    }
);