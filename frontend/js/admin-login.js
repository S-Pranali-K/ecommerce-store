const adminLoginBtn =
    document.getElementById(
        'adminLoginBtn'
    );

adminLoginBtn.addEventListener(
    'click',
    async () => {

        const email =
            document.getElementById(
                'email'
            ).value;

        const password =
            document.getElementById(
                'password'
            ).value;

        try {

            const response =
                await fetch(
                    'https://ecommerce-store-7ij2.onrender.com/api/auth/login',
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body: JSON.stringify({
                            email,
                            password
                        })

                    }
                );

            const data =
                await response.json();

            if (!response.ok) {

                alert(
                    data.message
                );

                return;

            }

            if (
                data.user.role !==
                'admin'
            ) {

                alert(
                    'Admin Access Only'
                );

                return;

            }

            localStorage.setItem(
                'user',
                JSON.stringify(
                    data.user
                )
            );

            localStorage.setItem(
                'token',
                data.token
            );

            alert(
                'Admin Login Success'
            );

            window.location.href =
                'admin.html';

        } catch (error) {

            console.log(error);

            alert(
                'Server Error'
            );

        }

    }
);