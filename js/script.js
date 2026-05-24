/* ============================================================
   HM Sistemas — Site Institucional
   Interatividade
   ============================================================ */

// ---- Navbar: scroll effect + menu mobile ----
(function () {
    const navbar   = document.getElementById('navbar');
    const toggle   = document.getElementById('navToggle');
    const menu     = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.navbar__link');

    // Sombra ao rolar
    window.addEventListener('scroll', function () {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
        updateActiveLink();
    }, { passive: true });

    // Menu mobile
    toggle.addEventListener('click', function () {
        const isOpen = menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
    });

    // Fechar menu ao clicar em link
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            menu.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function (e) {
        if (!navbar.contains(e.target)) {
            menu.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Link ativo baseado na seção visível
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(function (section) {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
})();

// ---- Animação de entrada ao rolar (Intersection Observer) ----
(function () {
    const elements = document.querySelectorAll(
        '.card, .flow__step, .mvv__card, .hero__text, .hero__quote, .section-header'
    );

    // Adiciona estado inicial
    elements.forEach(function (el) {
        el.style.opacity    = '0';
        el.style.transform  = 'translateY(24px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function (el) { observer.observe(el); });
})();

// ---- Smooth scroll para links âncora ----
(function () {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = 80; // altura da navbar fixa
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });
})();

// ---- Stagger nos cards (animação sequencial dentro de cada grade) ----
(function () {
    document.querySelectorAll('.cards-grid').forEach(function (grid) {
        const cards = grid.querySelectorAll('.card');
        cards.forEach(function (card, i) {
            card.style.transitionDelay = (i * 80) + 'ms';
        });
    });
})();
