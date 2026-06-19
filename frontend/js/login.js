loginBtn.addEventListener('click', async () => {

    const email = document.getElementById('email').value;

    const password = document.getElementById('password').value;

    try {


        const response = await fetch(
            'https://ecommerce-store-7ij2.onrender.com/api/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();
        
        console.log(data);

if (response.ok) {

    localStorage.setItem(
        'user',
        JSON.stringify(data.user)
    );

    localStorage.setItem(
        'token',
        data.token
    );

    alert('Login Successful');

    if (
        data.user.role === 'admin'
    ) {

        window.location.href =
            'admin.html';

    } else {

        window.location.href =
            'index.html';

    }

} 
        else {

            alert(data.message);

        }

    }catch (error) {

    console.log(error);

}

});