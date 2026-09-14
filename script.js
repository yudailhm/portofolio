// Single, deliberate reveal: projects fade up into place as they enter view.
const projects = document.querySelectorAll('.project');

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  projects.forEach((p) => io.observe(p));
} else {
  projects.forEach((p) => p.classList.add('is-visible'));
}
