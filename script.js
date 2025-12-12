document.addEventListener("DOMContentLoaded", () => {
    // Year
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    // Mobile nav
    const burger = document.getElementById("burger");
    const nav = document.getElementById("nav");
    if (burger && nav) {
        burger.addEventListener("click", () => {
            const open = nav.classList.toggle("open");
            burger.setAttribute("aria-expanded", open ? "true" : "false");
        });
        nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
            nav.classList.remove("open");
            burger.setAttribute("aria-expanded", "false");
        }));
    }

    // Tabs
    const tabs = Array.from(document.querySelectorAll(".tab"));
    const panels = Array.from(document.querySelectorAll(".panel"));

    function setTab(key) {
        tabs.forEach(t => {
            const active = t.dataset.tab === key;
            t.classList.toggle("active", active);
            t.setAttribute("aria-selected", active ? "true" : "false");
        });
        panels.forEach(p => p.classList.toggle("active", p.dataset.panel === key));
    }

    tabs.forEach(t => t.addEventListener("click", () => setTab(t.dataset.tab)));

    // "Виж снимки" buttons (jump + switch tab)
    document.querySelectorAll("[data-open-gallery]").forEach(btn => {
        btn.addEventListener("click", () => {
            const key = btn.dataset.openGallery;
            setTab(key);
            document.getElementById("gallery") ?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    // Lightbox
    const lightbox = document.getElementById("lightbox");
    const lbImg = document.getElementById("lb-img");
    const lbCap = document.getElementById("lb-cap");
    const prevBtn = document.querySelector(".lb-prev");
    const nextBtn = document.querySelector(".lb-next");

    let items = [];
    let idx = -1;

    function activeItems() {
        const activePanel = document.querySelector(".panel.active");
        return activePanel ? Array.from(activePanel.querySelectorAll(".g-item")) : [];
    }

    function openAt(i) {
        items = activeItems();
        if (!items.length || !lightbox || !lbImg) return;

        if (i < 0) i = items.length - 1;
        if (i >= items.length) i = 0;

        idx = i;
        const el = items[idx];
        const src = el.getAttribute("data-full") || el.src;

        lbImg.src = src;
        lbImg.alt = el.alt || "Снимка";
        if (lbCap) lbCap.textContent = el.alt || "";

        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeLb() {
        if (!lightbox || !lbImg) return;
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        lbImg.src = "";
        idx = -1;
        document.body.style.overflow = "";
    }

    // click on thumbnails (delegation)
    document.addEventListener("click", (e) => {
        const img = e.target.closest(".g-item");
        if (!img) return;

        const list = activeItems();
        const i = list.indexOf(img);
        if (i !== -1) openAt(i);
    });

    // close (backdrop + X)
    lightbox ?.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeLb));

    prevBtn ?.addEventListener("click", () => idx !== -1 && openAt(idx - 1));
    nextBtn ?.addEventListener("click", () => idx !== -1 && openAt(idx + 1));

    // keyboard
    document.addEventListener("keydown", (e) => {
        if (!lightbox ? .classList.contains("open")) return;
        if (e.key === "Escape") closeLb();
        if (e.key === "ArrowLeft") openAt(idx - 1);
        if (e.key === "ArrowRight") openAt(idx + 1);
    });

    // swipe (mobile)
    let startX = 0;
    lbImg ?.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
    lbImg ?.addEventListener("touchend", (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;
        if (Math.abs(diff) < 40) return;
        if (diff > 0) openAt(idx - 1);
        else openAt(idx + 1);
    }, { passive: true });
});
