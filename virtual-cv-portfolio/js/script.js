// Cache DOM elements once for the whole page.
const body = document.body;
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const themeToggle = document.getElementById('themeToggle');
const toggleIcon = document.querySelector('.toggle-icon');
const year = document.getElementById('year');
const skillBars = document.querySelectorAll('.skill-bar span');

// Set the current year in the footer automatically.
year.textContent = new Date().getFullYear();

// Theme toggle logic: keep the preferred mode in localStorage so it persists after refresh.
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') {
  body.setAttribute('data-theme', 'dark');
  toggleIcon.textContent = '☀️';
} else {
  body.setAttribute('data-theme', 'light');
  toggleIcon.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
  const isDark = body.getAttribute('data-theme') === 'dark';
  body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('portfolio-theme', isDark ? 'light' : 'dark');
  toggleIcon.textContent = isDark ? '🌙' : '☀️';
});

// Mobile menu toggles the nav visibility below the 768px breakpoint.
menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close the mobile menu when a nav link is clicked.
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Highlight the active navigation link based on the section currently in view.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', isActive);
        });
      }
    });
  },
  {
    threshold: 0.45,
  }
);

sections.forEach((section) => observer.observe(section));

// Fade-in reveal animation for sections as they enter the viewport.
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.15,
  }
);

document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));

// Animate the skill bars once the skills section becomes visible.
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillBars.forEach((bar) => {
          bar.style.width = `${bar.dataset.width}%`;
        });
      }
    });
  },
  {
    threshold: 0.25,
  }
);

const skillsSection = document.getElementById('skills');
skillObserver.observe(skillsSection);


