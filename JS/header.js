// Эффект для шапки при скролле
export function initHeaderScroll() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (!header) return;

        if (window.scrollY > 500) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}