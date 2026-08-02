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

document.querySelectorAll(".featured-products__card").forEach((card) => {
    const product = card.dataset.product;

    const body = card.querySelector(".featured-products__body");

    body.style.setProperty("--product-color", colors[product]);
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
