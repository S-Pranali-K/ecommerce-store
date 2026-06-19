const user =
    JSON.parse(
        localStorage.getItem('user')
    );

if (!user) {

    alert(
        'Please Login First'
    );

    window.location.href =
        'login.html';

}

document.getElementById(
    'name'
).value =
    user.name;

document.getElementById(
    'email'
).value =
    user.email;

document.getElementById(
    'role'
).value =
    user.role;

// UPDATE PROFILE

document.getElementById(
    'updateBtn'
).addEventListener(
    'click',
    async () => {

        const name =
            document.getElementById(
                'name'
            ).value;

        try {

            const response =
                await fetch(
                    'https://ecommerce-store-7ij2.onrender.com/api/auth/update-profile',
                    {
                        method: 'PUT',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body: JSON.stringify({

                            email:
                                user.email,

                            name

                        })

                    }
                );

            const data =
                await response.json();

            if (
                response.ok
            ) {

                user.name =
                    name;

                localStorage.setItem(
                    'user',
                    JSON.stringify(
                        user
                    )
                );

            }

            alert(
                data.message
            );

        } catch (error) {

            console.log(
                error
            );

        }

    }
);

// CHANGE PASSWORD

document.getElementById(
    'changePasswordBtn'
).addEventListener(
    'click',
    async () => {

        const oldPassword =
            document.getElementById(
                'oldPassword'
            ).value;

        const newPassword =
            document.getElementById(
                'newPassword'
            ).value;

        try {

            const response =
                await fetch(
                    'https://ecommerce-store-7ij2.onrender.com/api/auth/change-password',
                    {
                        method: 'PUT',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body: JSON.stringify({

                            email:
                                user.email,

                            oldPassword,

                            newPassword

                        })

                    }
                );

            const data =
                await response.json();

            alert(
                data.message
            );

        } catch (error) {

            console.log(
                error
            );

        }

    }
);