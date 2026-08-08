// function sliderLogin(option) {
//     const sections = document.querySelectorAll('section');
//     const slider = document.getElementById('slider');

//     sections.forEach(section => {
//         if (section.id === option) {
//             section.classList.remove('hidden');
//         } else {
//             section.classList.add('hidden');
//         }
//     });

//     if (option === 'register') {
//         slider.style.transform = "translateX(100%)";
//         document.getElementById('loginButton').classList.remove('active');
//         document.getElementById('registerButton').classList.add('active');

//     } else {
//         slider.style.transform = "translateX(0)";
//         document.getElementById('loginButton').classList.add('active');
//         document.getElementById('registerButton').classList.remove('active');
//     }
// }

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

