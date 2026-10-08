// SynapseQ — animações base (vanilla JS, sem dependências)

// Scroll reveal: qualquer elemento com a classe .reveal aparece suavemente
// quando entra na viewport (usa IntersectionObserver, nativo do navegador).
document.addEventListener("DOMContentLoaded", () => {
    const elementosReveal = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
        (entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("is-visible");
                    observer.unobserve(entrada.target); // anima só uma vez
                }
            });
        },
        { threshold: 0.2 } // dispara quando 20% do elemento estiver visível
    );

    elementosReveal.forEach((el) => observer.observe(el));

    // Header: borda inferior só aparece depois de rolar um pouco a página
    const header = document.querySelector(".header");
    if (header) {
        window.addEventListener("scroll", () => {
            header.classList.toggle("header-scrolled", window.scrollY > 40);
        });
    }
});
