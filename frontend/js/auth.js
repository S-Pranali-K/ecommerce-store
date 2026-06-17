const user =
    JSON.parse(
        localStorage.getItem('user')
    );

if (!user) {

    alert('Please Login First');

    window.location.href =
        'login.html';

}