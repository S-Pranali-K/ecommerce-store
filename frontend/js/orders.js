const ordersContainer =
    document.getElementById(
        'ordersContainer'
    );

const user =
    JSON.parse(
        localStorage.getItem(
            'user'
        )
    );

if (!user) {

    alert(
        'Please Login First'
    );

    window.location.href =
        'login.html';

}

async function loadOrders() {

    try {

        const response =
            await fetch(
                `http://localhost:5000/api/orders/user/${user.email}`
            );

        const orders =
            await response.json();

        if (
            orders.length === 0
        ) {

            ordersContainer.innerHTML = `
                <div
                    style="
                        text-align:center;
                        padding:60px;
                        background:white;
                        border-radius:20px;
                        box-shadow:
                        0 10px 30px rgba(0,0,0,.08);
                    "
                >

                    <h2>
                        📦 No Orders Found
                    </h2>

                    <p
                        style="
                            color:#777;
                            margin-top:10px;
                        "
                    >
                        Start shopping and place your first order.
                    </p>

                </div>
            `;

            return;

        }

        ordersContainer.innerHTML = '';

        orders.forEach(order => {

            let total = 0;

            order.products.forEach(
                product => {

                    total +=
                        product.price *
                        (
                            product.quantity
                            || 1
                        );

                }
            );

            ordersContainer.innerHTML += `

            <div class="order-card">

                <div class="order-header">

                    <div>

                        <h3>
                            Order #${order._id}
                        </h3>

                        <p>
                            ${new Date(
                                order.createdAt
                            ).toLocaleDateString()}
                        </p>

                    </div>

                    <div
                        class="
                            order-status
                            ${
                                order.status === 'Delivered'
                                ? 'status-delivered'
                                : order.status === 'Shipped'
                                ? 'status-shipped'
                                : order.status === 'Processing'
                                ? 'status-processing'
                                : 'status-pending'
                            }
                        "
                    >
                        ${order.status}
                    </div>

                </div>

                ${order.products.map(product => `

                    <div class="order-product">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        >

                        <div>

                            <h4>
                                ${product.name}
                            </h4>

                            <p>
                                ₹${product.price}
                            </p>

                            <p>
                                Quantity:
                                ${product.quantity || 1}
                            </p>

                        </div>

                    </div>

                `).join('')}

                <h3
                    style="
                        margin-top:20px;
                    "
                >
                    Total:
                    ₹${total}
                </h3>

            </div>

            `;

        });

    } catch (error) {

        console.log(error);

    }

}

loadOrders();