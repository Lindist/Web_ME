function scrollToEaseInOut(selector) {
    const target = document.querySelector(selector);
    const targetY = target.getBoundingClientRect().top + window.pageYOffset - 50;
    const start = window.pageYOffset;
    const duration = 1500;
    const startTime = performance.now();

    function easeInOut(t) {
        return t < 0.5
        ? 2 * t * t
        : -1 + (4 - 2 * t) * t;
    }

    function animate() {
        const now = performance.now();
        const time = Math.min(1, (now - startTime) / duration);
        const timeFunc = easeInOut(time);
        window.scrollTo(0, Math.ceil(start + (targetY - start) * timeFunc));
        // console.log(start + (targetY - start) * timeFunc);
        if (time < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}