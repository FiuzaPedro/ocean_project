
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {    
    if (entry.isIntersecting) {
        setTimeout(() => {
            entry.target.classList.add('show');      
        }, 500);      
    }
  });
});

document.querySelectorAll('.scroll-element').forEach((el) => observer.observe(el));