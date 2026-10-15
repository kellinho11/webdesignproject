// SynapseQ — animações e interações (vanilla JS, sem dependências)

document.addEventListener("DOMContentLoaded", () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---------------------------------------------------------------
    // 1. Scroll reveal genérico — qualquer .reveal aparece ao entrar
    //    na viewport (usado por quase todas as seções).
    // ---------------------------------------------------------------
    const elementosReveal = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("is-visible");
                    revealObserver.unobserve(entrada.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    elementosReveal.forEach((el) => revealObserver.observe(el));

    // ---------------------------------------------------------------
    // 2. Header: borda inferior só aparece depois de rolar um pouco
    // ---------------------------------------------------------------
    const header = document.querySelector(".header");
    if (header) {
        window.addEventListener("scroll", () => {
            header.classList.toggle("header-scrolled", window.scrollY > 40);
        });

        // Menu mobile: botão abre e fecha o painel de navegação
        const botaoMenu = header.querySelector(".nav-toggle");
        const definirMenu = (aberto) => {
            header.classList.toggle("nav-open", aberto);
            botaoMenu.setAttribute("aria-expanded", String(aberto));
            botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
        };
        if (botaoMenu) {
            botaoMenu.addEventListener("click", () => {
                definirMenu(!header.classList.contains("nav-open"));
            });
            // Fecha ao escolher um link, ao apertar Esc ou ao voltar para o layout de desktop
            header.querySelectorAll(".nav a").forEach((link) => {
                link.addEventListener("click", () => definirMenu(false));
            });
            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape") definirMenu(false);
            });
            window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => {
                if (e.matches) definirMenu(false);
            });
        }
    }

    // ---------------------------------------------------------------
    // 3. Hero — parallax reativo ao cursor (desktop, sem reduced motion)
    // ---------------------------------------------------------------
    const hero = document.querySelector(".hero");
    const heroBg = document.querySelector(".hero-bg");
    const heroContent = document.querySelector(".hero-content");
    const podeFazerHover = window.matchMedia("(hover: hover)").matches;

    if (hero && heroBg && heroContent && podeFazerHover && !prefersReducedMotion) {
        hero.addEventListener("mousemove", (evento) => {
            const limites = hero.getBoundingClientRect();
            const relX = (evento.clientX - limites.left) / limites.width - 0.5; // -0.5 a 0.5
            const relY = (evento.clientY - limites.top) / limites.height - 0.5;

            heroBg.style.transform = `translate(${relX * 16}px, ${relY * 10}px)`;
            heroContent.style.transform = `translate(${relX * -6}px, ${relY * -4}px)`;
        });

        hero.addEventListener("mouseleave", () => {
            heroBg.style.transform = "translate(0, 0)";
            heroContent.style.transform = "translate(0, 0)";
        });
    }

    // ---------------------------------------------------------------
    // 4. Hero — fade de saída suave conforme rola para a próxima seção
    // ---------------------------------------------------------------
    if (hero && heroContent) {
        window.addEventListener("scroll", () => {
            const limites = hero.getBoundingClientRect();
            const alturaHero = limites.height || 1;

            // progresso de 0 (hero totalmente visível) a 1 (hero saiu pelo topo)
            const progresso = Math.min(Math.max(-limites.top / alturaHero, 0), 1);

            if (progresso > 0.05) {
                heroContent.classList.add("hero-fading");
                heroContent.style.opacity = String(1 - progresso * 0.7);
                heroContent.style.setProperty(
                    "transform",
                    `scale(${1 - progresso * 0.03})`
                );
            } else {
                heroContent.classList.remove("hero-fading");
                heroContent.style.opacity = "";
                heroContent.style.transform = "";
            }
        });
    }

    // ---------------------------------------------------------------
    // 5. Gráfico de complexidade (Comparativo) — desenha as curvas
    //    (stroke-dashoffset) só quando o gráfico entra em viewport
    // ---------------------------------------------------------------
    const comparativoChart = document.querySelector(".comparativo-chart");
    if (comparativoChart) {
        // Curvas calculadas, não desenhadas à mão. Eixo x: n de 0 a 60 mapeado em 30..330.
        // Clássica: O(2^n) normalizada para ocupar a altura do gráfico; quântica: O(√n).
        const X = (n) => 30 + (300 * n) / 60;
        const classicaY = (n) => 190 - (178 * (Math.pow(2, n / 6) - 1)) / (Math.pow(2, 10) - 1);
        const quanticaY = (n) => 190 - 30 * Math.sqrt(n / 60);
        const tracarCurva = (y) => {
            const pontos = [];
            for (let n = 0; n <= 60; n++) {
                pontos.push((n === 0 ? "M" : "L") + X(n).toFixed(1) + "," + y(n).toFixed(1));
            }
            return pontos.join(" ");
        };
        const curvaClassica = document.getElementById("curva-classica");
        const curvaQuantica = document.getElementById("curva-quantica");
        if (curvaClassica && curvaQuantica) {
            curvaClassica.setAttribute("d", tracarCurva(classicaY));
            curvaQuantica.setAttribute("d", tracarCurva(quanticaY));
        }

        const chartObserver = new IntersectionObserver(
            (entradas) => {
                entradas.forEach((entrada) => {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("is-visible");
                        chartObserver.unobserve(entrada.target);
                    }
                });
            },
            { threshold: 0.3 }
        );
        chartObserver.observe(comparativoChart);
    }

    // ---------------------------------------------------------------
    // 6. Grade de busca do Grover — gera ~60 quadrados, um deles é o
    //    "registro certo" que amplifica quando o card entra em viewport
    // ---------------------------------------------------------------
    const groverSvg = document.querySelector(".grover-grid");
    if (groverSvg) {
        const colunas = 10;
        const linhas = 6;
        const tamanho = 12;
        const gap = 2;
        const indiceVencedor = Math.floor(Math.random() * colunas * linhas);
        let indice = 0;

        for (let linha = 0; linha < linhas; linha++) {
            for (let coluna = 0; coluna < colunas; coluna++) {
                const quadrado = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                quadrado.setAttribute("x", String(coluna * (tamanho + gap) + 10));
                quadrado.setAttribute("y", String(linha * (tamanho + gap) + 14));
                quadrado.setAttribute("width", String(tamanho));
                quadrado.setAttribute("height", String(tamanho));
                quadrado.setAttribute("rx", "2");
                quadrado.classList.add("grover-square");
                quadrado.dataset.index = String(indice);
                groverSvg.appendChild(quadrado);
                indice++;
            }
        }

        const groverObserver = new IntersectionObserver(
            (entradas) => {
                entradas.forEach((entrada) => {
                    if (entrada.isIntersecting) {
                        const vencedor = groverSvg.querySelector(
                            `[data-index="${indiceVencedor}"]`
                        );
                        if (vencedor) {
                            setTimeout(() => {
                                vencedor.classList.add("grover-square-winner");
                            }, 400);
                        }
                        groverObserver.unobserve(entrada.target);
                    }
                });
            },
            { threshold: 0.3 }
        );
        groverObserver.observe(groverSvg);
    }

    // ---------------------------------------------------------------
    // 7. Terminal — efeito de digitação quando a seção entra em viewport
    // ---------------------------------------------------------------
    const terminalCodeEl = document.getElementById("terminal-code");
    if (terminalCodeEl) {
        const conteudoTerminal =
            'POST /v1/quantum/solve\n' +
            '{\n' +
            '  "algorithm": "QAOA",\n' +
            '  "problem": "portfolio_optimization",\n' +
            '  "assets": 1200,\n' +
            '  "qubits": 64,\n' +
            '  "layers_p": 4\n' +
            '}\n\n' +
            '→ 200 OK · approx_ratio: 0.94 · latency: 340ms';

        const digitar = () => {
            if (prefersReducedMotion) {
                terminalCodeEl.textContent = conteudoTerminal;
                return;
            }
            let posicao = 0;
            const intervalo = setInterval(() => {
                terminalCodeEl.textContent = conteudoTerminal.slice(0, posicao);
                posicao++;
                if (posicao > conteudoTerminal.length) {
                    clearInterval(intervalo);
                }
            }, 18);
        };

        const terminalObserver = new IntersectionObserver(
            (entradas) => {
                entradas.forEach((entrada) => {
                    if (entrada.isIntersecting) {
                        digitar();
                        terminalObserver.unobserve(entrada.target);
                    }
                });
            },
            { threshold: 0.4 }
        );
        terminalObserver.observe(terminalCodeEl.closest(".terminal"));
    }

    // ---------------------------------------------------------------
    // 8. Formulário de captação de leads — validação simples no
    //    navegador e mensagem de sucesso (sem backend neste projeto)
    // ---------------------------------------------------------------
    const leadForm = document.getElementById("lead-form");
    if (leadForm) {
        leadForm.addEventListener("submit", (evento) => {
            evento.preventDefault();

            const jaTemMensagem = leadForm.querySelector(".form-success");
            if (jaTemMensagem) jaTemMensagem.remove();

            const mensagem = document.createElement("p");
            mensagem.className = "form-success";
            mensagem.textContent = "Recebido! Nossa equipe de relações com investidores entrará em contato em breve.";
            leadForm.appendChild(mensagem);
            leadForm.reset();
        });
    }
});
