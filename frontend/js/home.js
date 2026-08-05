function showImage(current) {
    const slides = document.querySelectorAll(".slide");

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }

    slides[current].classList.add("active");
}

function nextImage() {
    const slides = document.querySelectorAll(".slide");

    let current;
    slides.forEach((slide, index) => {
        if (slide.classList.contains("active")) {
            current = index;
        }
    });

    current++;
    if (current >= slides.length) {
        current = 0;
    }

    showImage(current);
}

function previousImage() {
    const slides = document.querySelectorAll(".slide");

    let current;
    slides.forEach((slide, index) => {
        if (slide.classList.contains("active")) {
            current = index;
        }
    });

    current--;
    if (current < 0) {
        current = slides.length - 1;
    }

    showImage(current);
}

function openLightbox(element) {
    let lightbox = document.getElementById("lightbox");
    let lightboxImg = document.getElementById("lightboxImg");

    lightboxImg.src = element.src;
    lightbox.style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

async function createGallery() {
    const columnsNumber = 4;
    const maxImages = 20;

    const container = document.getElementById("columns");

    try {
        const response = await fetch(`http://localhost:3000/upload`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        let images = (await response.json()).images;

        const columns = ["", "", "", ""];
        const limit = Math.min(images.length, maxImages);

        for (let i = 0; i < limit; i++) {
            let column = i % columnsNumber;

            columns[column] += `
                <div class="picture-wrapper">
                    <img src="${images[i]}" alt="" class="picture" onclick="openLightbox(this)">
                </div>
        `;
        }

        let gallery = "";

        for (let i = 0; i < columnsNumber; i++) {
            gallery += `
                <div class="column" id="column">${columns[i]}</div>
        `;
        }

        container.innerHTML = gallery;
    } catch (error) {
        document.getElementById("gallery").innerHTML = "";
        console.error(error);

        return;
    }
}

async function init() {
    showImage(0);
    setInterval(nextImage, 4000);
    await createGallery();
}
