const modal = document.querySelector(".newsletter-modal");
const closeBtn = document.querySelector(".newsletter-close");
const overlay = document.querySelector(".newsletter-overlay");

const isClosed = localStorage.getItem("newsletter_closed");

if (!isClosed) {
    setTimeout(() => {
        modal.classList.add("show");
    }, 5000);
}

function closeModal() {
    modal.classList.remove("show");

    localStorage.setItem("newsletter_closed", "true");
}
closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

/** đổi màu */
const colors = {
    "green-bean": "#6D8A3A",
    "red-bean": "#7A3B2E",
    "soy-bean": "#C9A868",
    "black-bean": "#2F2B29",
    almond: "#A8835C",
};
/*
document.querySelectorAll(".featured-products__card").forEach((card) => {
    const product = card.dataset.product;

    const body = card.querySelector(".featured-products__body");

    body.style.setProperty("--product-color", colors[product]);
});
*/
document.querySelectorAll(".featured-products__card").forEach((card) => {
    const product = card.dataset.product;

    card.style.setProperty("--product-color", colors[product]);
});

/** language */

const language = document.getElementById("language");

const current = language.querySelector(".language__current");

current.addEventListener("click", (e) => {
    e.stopPropagation();

    language.classList.toggle("language--open");
});

document.addEventListener("click", () => {
    language.classList.remove("language--open");
});

const options = language.querySelectorAll(".language__option");

options.forEach((option) => {
    option.addEventListener("click", () => {
        const img = option.querySelector("img");

        const currentFlag = language.querySelector(".language__current img");

        currentFlag.src = img.src;

        currentFlag.alt = img.alt;

        language.classList.remove("language--open");
    });
});

/** căng chỉnh hero */

const hero = document.querySelector(".hero");
const view = document.querySelector(".hero__view");

if (hero && view) {
    const resizeHero = () => {
        const heroWidth = hero.clientWidth;

        const heroHeight = hero.clientHeight;

        /*
        View luôn là hình vuông
        */

        const viewSize = Math.min(heroWidth, heroHeight) * 0.94;

        /*
        Glass chiếm khoảng 46% View
        */

        const glassSize = viewSize * 0.46;

        /*
        Logo
        */

        const logoSize = glassSize * 0.2;

        /*
        Caption
        */

        const captionSize = glassSize * 0.055;

        hero.style.setProperty("--view-size", `${viewSize}px`);

        hero.style.setProperty("--glass-size", `${glassSize}px`);

        hero.style.setProperty("--logo-size", `${logoSize}px`);

        hero.style.setProperty("--caption-size", `${captionSize}px`);
    };

    resizeHero();

    new ResizeObserver(resizeHero).observe(hero);
}
