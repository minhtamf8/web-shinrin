// =======================================================
// ShinRin Website
// scripts.js
// =======================================================

// =======================================================
// SHORTCUT
// =======================================================

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// =======================================================
// TEMPLATE LOADER
// =======================================================

/**
 * Load HTML template
 *
 * Ví dụ:
 * load("#header", "./templates/header.html");
 */
function load(selector, path) {
    const container = $(selector);
    if (!container) return;

    const cached = localStorage.getItem(path);

    if (cached) {
        container.innerHTML = cached;
    }

    fetch(path)
        .then((response) => response.text())
        .then((html) => {
            if (html !== cached) {
                container.innerHTML = html;
                localStorage.setItem(path, html);
            }
        })
        .finally(() => {
            window.dispatchEvent(new Event("template-loaded"));
        });
}

// =======================================================
// UTILITIES
// =======================================================

/**
 * Kiểm tra element có đang bị display:none
 */
function isHidden(element) {
    if (!element) return true;

    while (element) {
        if (window.getComputedStyle(element).display === "none") {
            return true;
        }

        element = element.parentElement;
    }

    return false;
}

/**
 * Debounce
 */
function debounce(callback, delay = 300) {
    let timer;

    return (...args) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}

// =======================================================
// DROPDOWN
// =======================================================

/**
 * Tính vị trí arrow của dropdown
 *
 * HTML:
 * <ul class="js-dropdown-list">
 */
const calArrowPos = debounce(() => {
    const dropdown = $(".js-dropdown-list");

    if (isHidden(dropdown)) return;

    dropdown.querySelectorAll(":scope > li").forEach((item) => {
        const arrowPos = item.offsetLeft + item.offsetWidth / 2;

        item.style.setProperty("--arrow-left-pos", `${arrowPos}px`);
    });
});

// Resize browser
window.addEventListener("resize", calArrowPos);

// =======================================================
// MENU
// =======================================================

function initMenu() {
    const dropdowns = $$(".js-dropdown");
    const menus = $$(".js-menu-list");

    const activeClass = "menu-column__item--active";

    const removeActive = (menu) => {
        menu.querySelector(`.${activeClass}`)?.classList.remove(activeClass);
    };

    const resetMenu = () => {
        menus.forEach((menu) => {
            const items = [...menu.children];

            if (!items.length) return;

            removeActive(menu);

            if (window.innerWidth > 991) {
                items[0].classList.add(activeClass);
            }
        });
    };

    resetMenu();

    menus.forEach((menu) => {
        [...menu.children].forEach((item) => {
            item.addEventListener("mouseenter", () => {
                if (window.innerWidth <= 991) return;

                removeActive(menu);

                item.classList.add(activeClass);
            });

            item.addEventListener("click", () => {
                if (window.innerWidth > 991) return;

                removeActive(menu);

                item.classList.add(activeClass);

                item.scrollIntoView({
                    block: "nearest",
                });
            });
        });
    });

    dropdowns.forEach((dropdown) => {
        dropdown.addEventListener("mouseleave", resetMenu);
    });
}

// =======================================================
// TOGGLE
// =======================================================

/**
 * Toggle show / hide
 *
 * HTML:
 * <button class="js-toggle" toggle-target="#menu">
 * <div id="menu" class="hide"></div>
 */

function initToggle() {
    const buttons = $$(".js-toggle");

    buttons.forEach((button) => {
        const targetSelector = button.getAttribute("toggle-target");

        if (!targetSelector) {
            console.error(`Missing toggle-target: ${button.outerHTML}`);
            return;
        }

        const target = $(targetSelector);

        if (!target) {
            console.error(`Cannot find element: ${targetSelector}`);
            return;
        }

        button.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            const isHidden = target.classList.contains("hide");

            requestAnimationFrame(() => {
                target.classList.toggle("show", isHidden);
                target.classList.toggle("hide", !isHidden);
            });
        });
    });

    // Click ngoài sẽ đóng tất cả Toggle
    document.addEventListener("click", (e) => {
        buttons.forEach((button) => {
            const targetSelector = button.getAttribute("toggle-target");
            const target = $(targetSelector);

            if (!target) return;

            if (button.contains(e.target) || target.contains(e.target)) {
                return;
            }

            target.classList.remove("show");
            target.classList.add("hide");
        });
    });
}

// =======================================================
// MOBILE MENU
// =======================================================

/**
 * Mobile Navbar
 *
 * HTML:
 * .js-dropdown-list
 */

function initMobileMenu() {
    const links = $$(".js-dropdown-list > li > a");

    links.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth > 991) return;

            const item = link.closest("li");

            item?.classList.toggle("navbar__item--active");
        });
    });
}

// =======================================================
// TABS
// =======================================================

/**
 * Product Tabs
 *
 * HTML:
 * <div class="js-tabs">
 */

function initTabs() {
    const tabContainers = $$(".js-tabs");

    tabContainers.forEach((container) => {
        const tabs = container.querySelectorAll(".prod-tab__item");
        const contents = container.querySelectorAll(".prod-tab__content");

        tabs.forEach((tab, index) => {
            tab.addEventListener("click", () => {
                container.querySelector(".prod-tab__item--current")?.classList.remove("prod-tab__item--current");

                container.querySelector(".prod-tab__content--current")?.classList.remove("prod-tab__content--current");

                tab.classList.add("prod-tab__item--current");
                contents[index]?.classList.add("prod-tab__content--current");
            });
        });
    });
}

// =======================================================
// THEME
// =======================================================

const THEME_KEY = "dark";

/**
 * Kiểm tra Dark Mode
 */
function isDarkMode() {
    return localStorage.getItem(THEME_KEY) === "true";
}

/**
 * Đổi icon/text của Button
 */
function updateThemeButton(button, darkMode) {
    const text = button.querySelector("span");

    if (!text) return;

    text.textContent = darkMode ? "Light mode" : "Dark mode";
}

/**
 * Áp dụng Theme
 */
function applyTheme(darkMode) {
    document.documentElement.classList.toggle("dark", darkMode);

    localStorage.setItem(THEME_KEY, darkMode);
}

/**
 * Theme Switch
 */
function initTheme() {
    const button = $("#switch-theme-btn");

    if (!button) return;

    // Đồng bộ giao diện với Local Storage
    const darkMode = isDarkMode();

    applyTheme(darkMode);

    updateThemeButton(button, darkMode);

    button.addEventListener("click", () => {
        const nextMode = !isDarkMode();

        applyTheme(nextMode);

        updateThemeButton(button, nextMode);
    });
}

// =======================================================
// INITIALIZE
// =======================================================

/**
 * Khởi tạo toàn bộ website
 */
function init() {
    // Dropdown
    calArrowPos();

    // Menu
    initMenu();

    // Toggle
    initToggle();

    // Mobile Menu
    initMobileMenu();

    // Tabs
    initTabs();

    // Theme
    initTheme();
}

/**
 * Sau khi Template được load
 */
window.addEventListener("template-loaded", init);

/**
 * Resize Browser
 */
window.addEventListener("resize", calArrowPos);
