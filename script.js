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

        // Galerija: linkovi u [data-gallery] otvaraju slike u dijalogu (bez JS-a se otvara sama slika)
        const lightbox = document.getElementById('lightbox');
        const img = lightbox.querySelector('img');
        const caption = lightbox.querySelector('figcaption');
        const counter = lightbox.querySelector('.lightbox-counter');
        let items = [];
        let index = 0;

        const show = (i) => {
            index = (i + items.length) % items.length;
            const item = items[index];
            img.src = item.href;
            img.alt = item.dataset.caption;
            caption.textContent = item.dataset.caption;
            counter.textContent = `${index + 1} / ${items.length}`;
        };

        document.querySelectorAll('[data-gallery]').forEach((gallery) => {
            const links = [...gallery.querySelectorAll('a')];
            links.forEach((link, i) => link.addEventListener('click', (e) => {
                e.preventDefault();
                items = links;
                show(i);
                lightbox.showModal();
            }));
        });

        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => show(index - 1));
        lightbox.querySelector('.lightbox-next').addEventListener('click', () => show(index + 1));
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.close();
        });
        lightbox.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') show(index - 1);
            if (e.key === 'ArrowRight') show(index + 1);
        });
    });
})();
