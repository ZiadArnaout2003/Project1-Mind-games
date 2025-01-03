document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll('.fade-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible'); // Optional: remove class if you want it to reset when out of view
            }
        });
    }, { threshold: 0.4 }); // Adjust threshold as needed

    fadeElements.forEach(el => observer.observe(el));
});