// Мобилно меню
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-list a");

if (burger && nav) {
    burger.addEventListener("click", () => {
        nav.classList.toggle("open");
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
        });
    });
}

// Lightbox за галерията с навигация
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxBackdrop = document.querySelector(".lightbox-backdrop");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");

const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
let currentIndex = -1;

function showImage(index) {
    if (!galleryItems.length) return;

    // циклично превъртане
    if (index < 0) {
        index = galleryItems.length - 1;
    } else if (index >= galleryItems.length) {
        index = 0;
    }

    currentIndex = index;
    const img = galleryItems[currentIndex];
    const fullSrc = img.getAttribute("data-full") || img.src;

    lightboxImage.src = fullSrc;
    lightboxCaption.textContent = img.alt || "";
    lightbox.classList.add("active");
}

galleryItems.forEach((img, index) => {
    img.addEventListener("click", () => {
        showImage(index);
    });
});

function closeLightbox() {
    lightbox.classList.remove("active");
    lightboxImage.src = "";
    currentIndex = -1;
}

if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}
if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener("click", closeLightbox);
}

// стрелки в лайтбокса
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        if (currentIndex === -1) return;
        showImage(currentIndex - 1);
    });
}

if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        if (currentIndex === -1) return;
        showImage(currentIndex + 1);
    });
}

// клавиатура: Escape, ← и →
document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {
        closeLightbox();
    } else if (e.key === "ArrowLeft") {
        showImage(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
        showImage(currentIndex + 1);
    }
});

// Година във footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}