export function initializeCarousels() {
    document.querySelectorAll("[data-carousel]").forEach((carousel) => {
        const slides = [...carousel.querySelectorAll("[data-carousel-slide]")];
        let activeIndex = 0;

        const showSlide = (nextIndex) => {
            slides[activeIndex].classList.remove("is-active");
            activeIndex = (nextIndex + slides.length) % slides.length;
            slides[activeIndex].classList.add("is-active");
        };

        carousel.querySelector("[data-carousel-previous]")?.addEventListener("click", () => showSlide(activeIndex - 1));
        carousel.querySelector("[data-carousel-next]")?.addEventListener("click", () => showSlide(activeIndex + 1));
    });
}

export function initializeShowcaseGrids() {
    document.querySelectorAll(".showcase-grid").forEach((grid) => {
        let scheduledFrame;

        const resizeItems = () => {
            cancelAnimationFrame(scheduledFrame);
            scheduledFrame = requestAnimationFrame(() => {
                const styles = getComputedStyle(grid);
                const rowHeight = Number.parseFloat(styles.gridAutoRows);
                const rowGap = Number.parseFloat(styles.rowGap);

                grid.querySelectorAll(".showcase-item").forEach((item) => {
                    item.style.removeProperty("grid-row-end");
                    const contentHeight = item.firstElementChild?.getBoundingClientRect().height || item.scrollHeight;
                    const rows = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
                    item.style.gridRowEnd = `span ${rows}`;
                });
            });
        };

        grid.querySelectorAll("img").forEach((image) => {
            if (!image.complete) {
                image.addEventListener("load", resizeItems, { once: true });
                image.addEventListener("error", resizeItems, { once: true });
            }
        });

        window.addEventListener("resize", resizeItems);
        resizeItems();
    });
}
