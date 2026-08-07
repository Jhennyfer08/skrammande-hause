// function sliderLogin(form) {
//     // const form = document.getElementById(form);
//     const slider = document.getElementById(slider);

//     if (form === 'register') {
//         slider.style.transform = "translateX(100%)";
//     }
// }


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

