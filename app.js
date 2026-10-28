// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Reveal on scroll, and play terminal panes once they come into view
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        entry.target.querySelectorAll('[data-term]').forEach(playTerminal);
        revealObserver.unobserve(entry.target);
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

function playTerminal(term) {
    term.querySelectorAll('.line').forEach((line, i) => {
        line.style.transitionDelay = `${i * 140}ms`;
    });
    term.classList.add('play');
}

// Highlight the current pipeline stage and nav section
const stageLinks = [...document.querySelectorAll('.stage-track a')];
const stages = stageLinks.map(a => document.querySelector(a.getAttribute('href')));
const sectionLinks = [...navLinks.querySelectorAll('a')];
const sections = sectionLinks.map(a => document.querySelector(a.getAttribute('href')));

function currentIndex(targets) {
    const line = window.innerHeight * 0.45;
    let index = -1;
    targets.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < line) index = i;
    });
    return index;
}

function onScroll() {
    const stage = currentIndex(stages);
    stageLinks.forEach((a, i) => {
        a.classList.toggle('current', i === stage);
        a.classList.toggle('done', i < stage);
    });

    const section = currentIndex(sections);
    sectionLinks.forEach((a, i) => a.classList.toggle('active', i === section));
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Rotating stack in the hero prompt
const typed = document.getElementById('typed');
const words = ['angular', 'go', 'laravel', 'nestjs', 'postgresql', 'linux', 'm-pesa'];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
    let word = 0;
    let chars = words[0].length;
    let deleting = true;

    setTimeout(function tick() {
        const current = words[word];
        chars += deleting ? -1 : 1;
        typed.textContent = current.slice(0, chars);

        let delay = deleting ? 50 : 90;
        if (!deleting && chars === current.length) {
            deleting = true;
            delay = 1800;
        } else if (deleting && chars === 0) {
            deleting = false;
            word = (word + 1) % words.length;
            delay = 250;
        }
        setTimeout(tick, delay);
    }, 1800);
}

// Private repositories
document.querySelectorAll('[data-private]').forEach(link => {
    link.addEventListener('click', () => {
        window.location.href = 'mailto:moses.njehu.n@gmail.com?subject=Repository%20access';
    });
});

document.getElementById('year').textContent = new Date().getFullYear();
