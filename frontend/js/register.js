const registerBtn = document.getElementById('registerBtn');

registerBtn.addEventListener('click', async () => {

    const name = document.getElementById('name').value;

    const email = document.getElementById('email').value;

    const password = document.getElementById('password').value;

    try {

        const response = await fetch(
            'https://ecommerce-store-7ij2.onrender.com/api/auth/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert('Registration Successful');

            window.location.href = 'login.html';

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);

    }

});