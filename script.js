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
            // Esc fecha e devolve o foco ao botão (quem usa teclado não se perde)
            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape" && header.classList.contains("nav-open")) {
                    definirMenu(false);
                    botaoMenu.focus();
                }
            });
            // Clique fora do header fecha o menu
            document.addEventListener("click", (e) => {
                if (header.classList.contains("nav-open") && !header.contains(e.target)) {
                    definirMenu(false);
                }
            });
            window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => {
                if (e.matches) definirMenu(false);
            });
        }
    }

    // ---------------------------------------------------------------
    // 3 e 4. Hero — parallax pelo cursor + fade/escala ao rolar.
    //    Os dois mexem no transform do mesmo elemento, então guardam
    //    seu estado e um único aplicarHero() monta o transform final
    //    (antes um sobrescrevia o outro).
    // ---------------------------------------------------------------
    const hero = document.querySelector(".hero");
    const heroBg = document.querySelector(".hero-bg");
    const heroContent = document.querySelector(".hero-content");
    const podeFazerHover = window.matchMedia("(hover: hover)").matches;
    const estadoHero = { x: 0, y: 0, escala: 1 };

    const aplicarHero = () => {
        heroContent.style.transform =
            `translate(${estadoHero.x}px, ${estadoHero.y}px) scale(${estadoHero.escala})`;
    };

    if (hero && heroBg && heroContent && podeFazerHover && !prefersReducedMotion) {
        hero.addEventListener("mousemove", (evento) => {
            const limites = hero.getBoundingClientRect();
            const relX = (evento.clientX - limites.left) / limites.width - 0.5; // -0.5 a 0.5
            const relY = (evento.clientY - limites.top) / limites.height - 0.5;

            heroBg.style.transform = `translate(${relX * 16}px, ${relY * 10}px)`;
            estadoHero.x = relX * -6;
            estadoHero.y = relY * -4;
            aplicarHero();
        });

        hero.addEventListener("mouseleave", () => {
            heroBg.style.transform = "translate(0, 0)";
            estadoHero.x = 0;
            estadoHero.y = 0;
            aplicarHero();
        });
    }

    if (hero && heroContent) {
        window.addEventListener("scroll", () => {
            const limites = hero.getBoundingClientRect();
            const alturaHero = limites.height || 1;

            // progresso de 0 (hero totalmente visível) a 1 (hero saiu pelo topo)
            const progresso = Math.min(Math.max(-limites.top / alturaHero, 0), 1);

            if (progresso > 0.05) {
                heroContent.classList.add("hero-fading");
                heroContent.style.opacity = String(1 - progresso * 0.7);
                // com "reduzir movimento" só a opacidade muda, sem escala
                estadoHero.escala = prefersReducedMotion ? 1 : 1 - progresso * 0.03;
            } else {
                heroContent.classList.remove("hero-fading");
                heroContent.style.opacity = "";
                estadoHero.escala = 1;
            }
            aplicarHero();
        }, { passive: true });
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
    // 8. Formulário de captação de leads — validação no navegador
    //    (sem backend neste projeto). Cada campo mostra o próprio erro
    //    em .field__error; o sucesso aparece em #form-success.
    // ---------------------------------------------------------------
    const leadForm = document.getElementById("lead-form");
    if (leadForm) {
        // Com JS a validação é nossa; sem JS o "required" do navegador continua valendo
        leadForm.noValidate = true;

        // Provedores gratuitos: o formulário é para investidores, então pede e-mail corporativo
        const dominiosGratuitos = [
            "gmail.com", "googlemail.com", "hotmail.com", "hotmail.com.br", "outlook.com", "outlook.com.br",
            "live.com", "msn.com", "yahoo.com", "yahoo.com.br", "icloud.com", "me.com", "aol.com",
            "proton.me", "protonmail.com", "bol.com.br", "uol.com.br", "terra.com.br", "ig.com.br"
        ];

        // Cada regra recebe o valor e devolve a mensagem de erro ("" = válido).
        // trim() faz um campo só com espaços contar como vazio.
        const regras = {
            nome: (valor) => {
                const palavras = valor.trim().split(/\s+/).filter(Boolean);
                if (palavras.length === 0) return "Informe seu nome completo.";
                return palavras.length < 2 ? "Informe nome e sobrenome." : "";
            },
            email: (valor) => {
                const email = valor.trim().toLowerCase();
                if (!email) return "Informe seu e-mail.";
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return "Informe um e-mail válido, como nome@empresa.com.";
                const dominio = email.split("@")[1];
                return dominiosGratuitos.includes(dominio) ? "Use seu e-mail corporativo." : "";
            },
            fundo: (valor) => (valor.trim().length >= 2 ? "" : "Informe o fundo ou a empresa."),
            ticket: (valor) => (valor ? "" : "Selecione uma faixa de investimento.")
        };

        const campos = Array.from(leadForm.querySelectorAll("input, select"));
        const retorno = leadForm.querySelector(".form-feedback");

        const validarCampo = (campo) => {
            const erro = regras[campo.name] ? regras[campo.name](campo.value) : "";
            const field = campo.closest(".field");
            field.classList.toggle("has-error", Boolean(erro));
            field.querySelector(".field__error").textContent = erro;
            campo.setAttribute("aria-invalid", erro ? "true" : "false");
            return !erro;
        };

        campos.forEach((campo) => {
            // Ao sair do campo: só acusa erro se a pessoa já digitou algo
            // (passar pelos campos com Tab não deve encher a tela de vermelho)
            campo.addEventListener("blur", () => {
                if (campo.value.trim() || campo.closest(".field").classList.contains("has-error")) validarCampo(campo);
            });
            // Enquanto corrige, o erro some assim que o valor fica válido
            const evento = campo.tagName === "SELECT" ? "change" : "input";
            campo.addEventListener(evento, () => {
                if (campo.closest(".field").classList.contains("has-error")) validarCampo(campo);
            });
        });

        leadForm.addEventListener("submit", (evento) => {
            evento.preventDefault();

            const mensagemAnterior = document.getElementById("form-success");
            if (mensagemAnterior) mensagemAnterior.remove();

            const validos = campos.map(validarCampo);
            const primeiroInvalido = campos[validos.indexOf(false)];
            if (primeiroInvalido) {
                primeiroInvalido.focus();
                return;
            }

            // Mensagem dentro de uma região aria-live que já existe na página,
            // assim o leitor de tela anuncia o envio
            const mensagem = document.createElement("p");
            mensagem.id = "form-success";
            mensagem.className = "form-success";
            mensagem.textContent = "Recebido! Nossa equipe de relações com investidores entrará em contato em breve.";
            retorno.appendChild(mensagem);
            leadForm.reset();
            campos.forEach((campo) => campo.removeAttribute("aria-invalid"));
        });
    }
});
