(function() {
    function qs(sel, root) { return (root || document).querySelector(sel); }

    function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

    document.addEventListener("DOMContentLoaded", function() {
        // Footer year
        var year = document.getElementById("year");
        if (year) year.textContent = new Date().getFullYear();

        // Mobile menu
        var burger = document.getElementById("burger");
        var nav = document.getElementById("nav");
        if (burger && nav) {
            burger.addEventListener("click", function() {
                var isOpen = nav.classList.toggle("open");
                burger.classList.toggle("is-open", isOpen);
                burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
            });


            qsa("#nav a").forEach(function(a) {
                a.addEventListener("click", function() {
                    nav.classList.remove("open");
                    burger.classList.remove("is-open");
                    burger.setAttribute("aria-expanded", "false");

                });
            });
        }

        // Tabs
        var tabs = qsa(".tab");
        var panels = qsa(".panel");

        function setTab(key) {
            tabs.forEach(function(t) {
                var active = t.getAttribute("data-tab") === key;
                t.classList.toggle("active", active);
                t.setAttribute("aria-selected", active ? "true" : "false");
            });

            panels.forEach(function(p) {
                p.classList.toggle("active", p.getAttribute("data-panel") === key);
            });
        }

        tabs.forEach(function(t) {
            t.addEventListener("click", function() {
                setTab(t.getAttribute("data-tab"));
            });
        });

        // "Виж снимки" buttons
        qsa("[data-open-gallery]").forEach(function(btn) {
            btn.addEventListener("click", function() {
                var key = btn.getAttribute("data-open-gallery");
                setTab(key);

                var gallery = document.getElementById("gallery");
                if (gallery) gallery.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        });

        // Lightbox
        var lightbox = document.getElementById("lightbox");
        var lbImg = document.getElementById("lb-img");
        var lbCap = document.getElementById("lb-cap");
        var prevBtn = qs(".lb-prev");
        var nextBtn = qs(".lb-next");

        var items = [];
        var idx = -1;

        function activeItems() {
            var activePanel = qs(".panel.active");
            if (!activePanel) return [];
            return qsa(".g-item", activePanel);
        }

        function openAt(i) {
            items = activeItems();
            if (!items.length || !lightbox || !lbImg) return;

            if (i < 0) i = items.length - 1;
            if (i >= items.length) i = 0;

            idx = i;
            var el = items[idx];
            var src = el.getAttribute("data-full") || el.getAttribute("src");

            lbImg.setAttribute("src", src);
            lbImg.setAttribute("alt", el.getAttribute("alt") || "Снимка");
            if (lbCap) lbCap.textContent = el.getAttribute("alt") || "";

            lightbox.classList.add("open");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        }

        function closeLb() {
            if (!lightbox || !lbImg) return;
            lightbox.classList.remove("open");
            lightbox.setAttribute("aria-hidden", "true");
            lbImg.setAttribute("src", "");
            idx = -1;
            document.body.style.overflow = "";
        }

        document.addEventListener("click", function(e) {
            var target = e.target;

            // close
            if (target && target.hasAttribute && target.hasAttribute("data-close")) {
                closeLb();
                return;
            }

            // image click
            var img = target && target.closest ? target.closest(".g-item") : null;
            if (!img) return;

            var list = activeItems();
            var i = list.indexOf(img);
            if (i !== -1) openAt(i);
        });

        if (prevBtn) prevBtn.addEventListener("click", function() { if (idx !== -1) openAt(idx - 1); });
        if (nextBtn) nextBtn.addEventListener("click", function() { if (idx !== -1) openAt(idx + 1); });

        document.addEventListener("keydown", function(e) {
            if (!lightbox || !lightbox.classList.contains("open")) return;

            if (e.key === "Escape") closeLb();
            if (e.key === "ArrowLeft") openAt(idx - 1);
            if (e.key === "ArrowRight") openAt(idx + 1);
        });

        // Default tab
        if (tabs.length) setTab("villa1");
    });
})();
