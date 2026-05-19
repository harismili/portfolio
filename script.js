(function () {
    const STORAGE_KEY = 'portfolio-theme';
    const root = document.documentElement;

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            const icon = toggle.querySelector('i');
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            toggle.setAttribute('aria-label',
                theme === 'dark' ? 'Prebaci na svijetli mod' : 'Prebaci na tamni mod');
        }
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved || (prefersDark ? 'dark' : 'light'));

    document.addEventListener('DOMContentLoaded', () => {
        applyTheme(root.getAttribute('data-theme'));

        const toggle = document.getElementById('theme-toggle');
        toggle.addEventListener('click', () => {
            const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            localStorage.setItem(STORAGE_KEY, next);
            applyTheme(next);
        });

        const toTop = document.getElementById('scroll-to-top');
        const onScroll = () => {
            toTop.classList.toggle('visible', window.scrollY > 300);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        toTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
})();
