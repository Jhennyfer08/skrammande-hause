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
    let lightbox = document.getElementById('lightbox');
    let lightboxImg = document.getElementById('lightboxImg');

    lightboxImg.src = element.src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function init() {
    showImage(0);

    setInterval(nextImage, 4000);
}
