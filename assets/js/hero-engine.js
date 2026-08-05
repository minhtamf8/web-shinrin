/**
 * =====================================================
 * ShinRin Hero Engine Prototype
 * Version 2.0
 *
 * Ý tưởng:
 * CSS -> Breakpoint -> Hero render
 *
 * Nếu Hero bị Landscape
 * => Render Hero lại một lần.
 * =====================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    const heroView = document.querySelector(".hero__view");

    if (!heroView) return;

    let rendered = false;

    function renderHero() {
        // Chỉ chạy 1 lần
        if (rendered) return;

        const width = heroView.clientWidth;
        const height = heroView.clientHeight;

        console.table({
            width,
            height,
        });

        // Portrait
        if (height >= width) {
            rendered = true;
            return;
        }

        // Landscape
        heroView.style.height = `${width}px`;

        // Ép browser render lại layout
        void heroView.offsetHeight;

        rendered = true;
    }

    requestAnimationFrame(renderHero);

    window.addEventListener("resize", () => {
        rendered = false;

        requestAnimationFrame(renderHero);
    });
});
