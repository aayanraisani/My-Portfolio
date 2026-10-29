const root = document.documentElement;
const navbar = document.getElementById("mainNavbar");
const navCollapse = document.getElementById("navbarNav");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const backToTop = document.getElementById("backToTop");
const heroPhoto = document.getElementById("heroPhoto");
const cvButton = document.getElementById("downloadCv");

const THEME_KEY = "aayan-portfolio-theme";
const REVEAL_SELECTOR = [
    ".section-heading", ".info-list", ".skill-card", ".project-card", ".experience-item",
    ".strength-item", ".contact-details", ".contact-form", ".cta-box"
].join(", ");


function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
    backToTop.classList.toggle("show", window.scrollY > 500);

    let current = "home";
    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 160) current = section.id;
    });

    navLinks.forEach((link) => link.classList.toggle("active", link.hash === `#${current}`));
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

navLinks.forEach((link) => {
    link.addEventListener("click", () => bootstrap.Collapse.getInstance(navCollapse)?.hide());
});


function syncThemeToggle() {
    const isDark = root.dataset.theme === "dark";
    const label = `Switch to ${isDark ? "light" : "dark"} mode`;

    themeIcon.className = `bi ${isDark ? "bi-sun-fill" : "bi-moon-fill"}`;
    themeToggle.setAttribute("aria-label", label);
    themeToggle.title = label;
    themeToggle.setAttribute("aria-pressed", isDark);
}

themeToggle.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";

    root.classList.add("theme-changing");
    root.dataset.theme = next;
    setTimeout(() => root.classList.remove("theme-changing"), 400);

    try {
        localStorage.setItem(THEME_KEY, next);
    } catch {
        // storage can be blocked (private mode); the theme still applies for this visit
    }

    syncThemeToggle();
});

syncThemeToggle();


function showPhotoFallback() {
    heroPhoto.style.display = "none";
    document.getElementById("photoFallback").style.display = "flex";
}

heroPhoto.addEventListener("error", showPhotoFallback);
if (heroPhoto.complete && !heroPhoto.naturalWidth) showPhotoFallback();


function saveFile(url) {
    const link = Object.assign(document.createElement("a"), { href: url, download: cvButton.download });

    document.body.append(link);
    link.click();
    link.remove();
}

cvButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const response = await fetch(cvButton.href).catch(() => null);

    if (response?.ok === false) {
        alert("The CV is not available right now. Please email me and I will send it over.");
        return;
    }

    // a blob forces a download even where the browser would open the PDF instead
    const url = response ? URL.createObjectURL(await response.blob()) : cvButton.href;

    saveFile(url);
    if (response) setTimeout(() => URL.revokeObjectURL(url), 1000);
});


if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting, target }) => {
            if (!isIntersecting) return;

            target.classList.add("visible");
            observer.unobserve(target);
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(REVEAL_SELECTOR).forEach((item) => {
        item.classList.add("reveal");
        observer.observe(item);
    });
}


document.getElementById("currentYear").textContent = new Date().getFullYear();

document.getElementById("contactForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const { name, email, subject, message } = Object.fromEntries(
        [...new FormData(event.target)].map(([field, value]) => [field, value.trim()])
    );

    if (!name || !email || !subject || !message) {
        alert("Please fill in all fields.");
        return;
    }

    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    window.location.href = `mailto:aayanahmedbrohi2@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
});
