/* =========================================
   ELEMENTS
========================================= */

const navbar = document.getElementById("mainNavbar");

const themeToggle = document.getElementById("themeToggle");

const themeIcon = document.getElementById("themeIcon");

const navLinks = document.querySelectorAll(".nav-link");

const sections = document.querySelectorAll("section[id]");

const currentYear = document.getElementById("currentYear");

const contactForm = document.getElementById("contactForm");

const heroPhoto = document.getElementById("heroPhoto");

const photoFallback = document.getElementById("photoFallback");


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

function updateNavbar() {
    if (!navbar) {
        return;
    }

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}


window.addEventListener("scroll", updateNavbar);

updateNavbar();


/* =========================================
   THEME TOGGLE
========================================= */

function updateThemeToggle() {
    if (!themeToggle || !themeIcon) {
        return;
    }

    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    const isDark = currentTheme === "dark";

    const label = isDark
        ? "Switch to light mode"
        : "Switch to dark mode";

    themeIcon.className = isDark
        ? "bi bi-sun-fill"
        : "bi bi-moon-fill";

    themeToggle.setAttribute("aria-label", label);

    themeToggle.setAttribute("title", label);

    themeToggle.setAttribute(
        "aria-pressed",
        String(isDark)
    );
}


if (themeToggle) {

    updateThemeToggle();

    themeToggle.addEventListener("click", () => {

        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        document.documentElement.setAttribute(
            "data-theme",
            newTheme
        );

        try {
            localStorage.setItem(
                "aayan-portfolio-theme",
                newTheme
            );
        } catch (error) {
            // Ignore localStorage errors.
        }

        updateThemeToggle();
    });
}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

function updateActiveNav() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 160;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
                sectionTop + sectionHeight
        ) {
            currentSection =
                section.getAttribute("id");
        }
    });


    if (
        !currentSection &&
        window.scrollY < 300
    ) {
        currentSection = "home";
    }


    navLinks.forEach((link) => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (
            href === `#${currentSection}`
        ) {
            link.classList.add("active");
        }
    });
}


window.addEventListener(
    "scroll",
    updateActiveNav
);

updateActiveNav();


/* =========================================
   MOBILE NAVBAR AUTO CLOSE
========================================= */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        const navbarCollapse =
            document.getElementById("navbarNav");

        if (!navbarCollapse) {
            return;
        }


        if (
            navbarCollapse.classList.contains("show") &&
            typeof bootstrap !== "undefined"
        ) {

            const bsCollapse =
                bootstrap.Collapse.getInstance(
                    navbarCollapse
                );


            if (bsCollapse) {
                bsCollapse.hide();
            }
        }
    });
});


/* =========================================
   CURRENT YEAR
========================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================
   HERO IMAGE FALLBACK
========================================= */

if (heroPhoto) {

    heroPhoto.addEventListener(
        "error",
        () => {

            heroPhoto.style.display =
                "none";

            if (photoFallback) {
                photoFallback.style.display =
                    "flex";
            }
        }
    );

}


/* =========================================
   CONTACT FORM
========================================= */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const nameInput =
                document.getElementById("name");

            const emailInput =
                document.getElementById("email");

            const subjectInput =
                document.getElementById("subject");

            const messageInput =
                document.getElementById("message");


            if (
                !nameInput ||
                !emailInput ||
                !subjectInput ||
                !messageInput
            ) {
                return;
            }


            const name =
                nameInput.value.trim();

            const email =
                emailInput.value.trim();

            const subject =
                subjectInput.value.trim();

            const message =
                messageInput.value.trim();


            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                alert(
                    "Please fill in all fields."
                );

                return;
            }


            const receiverEmail =
                "aayanahmedbrohi2@gmail.com";


            const mailSubject =
                encodeURIComponent(subject);


            const mailBody =
                encodeURIComponent(
                    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
                );


            const mailtoURL =
                `mailto:${receiverEmail}?subject=${mailSubject}&body=${mailBody}`;


            window.location.href =
                mailtoURL;

        }
    );

}