const tabs = document.querySelectorAll(".tab");
const galleries = document.querySelectorAll(".gallery-grid");

tabs.forEach(tab => {
    tab.onclick = () => {
        tabs.forEach(t => t.classList.remove("active"));
        galleries.forEach(g => g.classList.remove("active"));
        tab.classList.add("active");
        document.querySelector(`[data-gallery="${tab.dataset.tab}"]`).classList.add("active");
    };
});

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");

document.querySelectorAll(".gallery-grid img").forEach(img => {
    img.onclick = () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
    };
});

document.querySelector(".close").onclick = () => {
    lightbox.style.display = "none";
};
