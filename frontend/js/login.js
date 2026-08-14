function sliderLogin(option) {
    const isRegister = option === 'register';
    const slider = document.getElementById('slider');

    slider.style.transform = `translateX(${isRegister ? '100%' : '0'})`;

    document.getElementById('login').classList.toggle('hidden', isRegister);
    document.getElementById('register').classList.toggle('hidden', !isRegister);

    document.getElementById('loginButton').classList.toggle('active', !isRegister);
    document.getElementById('registerButton').classList.toggle('active', isRegister);
}


async function login(event) {
    event.preventDefault();

    try {
        const user = {
            email: document.getElementById("emailLogin").value,
            password: document.getElementById("passwordLogin").value,
        };

        // const user = {
        //     email:"teste@gmail.com",
        //     password: "teste123",
        // }

        const response = await fetch(`http://localhost:3000/login`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(user),
        });

        const data = await response.json();

        alert(data.message);

        if (data.success === true) {
            const loggedUser = JSON.stringify({
                email: user.email,
                token: data.token,
            });

            localStorage.setItem("logged", loggedUser);
            window.location.href = "./home.html";
        }

    } catch (error) {
        console.error(`Identified error on login ${error}`);
    }
}

async function register(event) {
    event.preventDefault();

    try {
        const user = {
            email: document.getElementById('emailRegister').value,
            password: document.getElementById('passwordRegister').value
        }

        const confirmPassword = document.getElementById('confirmPasswordRegister').value;

        if (user.password !== confirmPassword) {
            alert('Confirmar senha precisa ser igual a senha');
            return
        }

        const response = await fetch(`http://localhost:3000/login/register`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        });

        const data = await response.json();

        alert(data.message);

        if (data.success === true) {
            const loggedUser = JSON.stringify({
                email: user.email,
                token: data.token
            });

            localStorage.setItem('logged', loggedUser);
            window.location.href= './home.html';
        }

    } catch (error) {
        console.error(`Identified error on register ${error}`);
    }
}

