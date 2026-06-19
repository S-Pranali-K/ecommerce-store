const ordersContainer =
    document.getElementById(
        'ordersContainer'
    );

async function loadOrders() {

    try {

        const response =
            await fetch(
                'https://ecommerce-store-7ij2.onrender.com/api/orders'
            );

        const allOrders =
            await response.json();

        if (
            allOrders.length === 0
        ) {

            ordersContainer.innerHTML = `
                <h2>
                    No Orders Found
                </h2>
            `;

            return;

        }

        ordersContainer.innerHTML =
            '';

        allOrders.forEach(order => {

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

            <div style="
                background:white;
                padding:20px;
                margin-bottom:20px;
                border-radius:10px;
                box-shadow:0 2px 8px rgba(0,0,0,0.1);
            ">

                <h3>
                    Order #${order._id}
                </h3>

                <p>
                    Customer:
                    ${order.userEmail}
                </p>

                <p>
                    Date:
                    ${new Date(
                        order.createdAt
                    ).toLocaleDateString()}
                </p>

                <p>
                    Total:
                    ₹${total}
                </p>

                <p>
                    Status:
                    <strong>
                        ${order.status}
                    </strong>
                </p>

                <select
                    onchange="
                        updateStatus(
                            '${order._id}',
                            this.value
                        )
                    "
                >

                    <option
                        value="Pending"
                        ${
                            order.status ===
                            'Pending'
                                ? 'selected'
                                : ''
                        }
                    >
                        Pending
                    </option>

                    <option
                        value="Processing"
                        ${
                            order.status ===
                            'Processing'
                                ? 'selected'
                                : ''
                        }
                    >
                        Processing
                    </option>

                    <option
                        value="Shipped"
                        ${
                            order.status ===
                            'Shipped'
                                ? 'selected'
                                : ''
                        }
                    >
                        Shipped
                    </option>

                    <option
                        value="Delivered"
                        ${
                            order.status ===
                            'Delivered'
                                ? 'selected'
                                : ''
                        }
                    >
                        Delivered
                    </option>

                </select>

                <hr
                    style="
                        margin:15px 0;
                    "
                >

                ${order.products.map(product => `

                    <div style="
                        display:flex;
                        gap:15px;
                        align-items:center;
                        margin-bottom:10px;
                    ">

                        <img
                            src="${product.image}"
                            width="70"
                            height="70"
                            style="
                                object-fit:cover;
                                border-radius:8px;
                            "
                        >

                        <div>

                            <h4>
                                ${product.name}
                            </h4>

                            <p>
                                ₹${product.price}
                            </p>

                            <p>
                                Qty:
                                ${
                                    product.quantity
                                    || 1
                                }
                            </p>

                        </div>

                    </div>

                `).join('')}

            </div>

            `;

        });

    } catch (error) {

        console.log(
            error
        );

    }

}

async function updateStatus(
    orderId,
    status
) {

    try {

        const response =
            await fetch(
                `https://ecommerce-store-7ij2.onrender.com/api/orders/${orderId}`,
                {
                    method: 'PUT',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify({
                        status
                    })

                }
            );

        const data =
            await response.json();

        alert(
            data.message
        );

        loadOrders();

    } catch (error) {

        console.log(
            error
        );

    }

}

loadOrders();