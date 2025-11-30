const valores = [
    "Autoconfiança", "Organização", "Criatividade", "Resiliência", "Justiça",
    "Gratidão", "Empatia", "Coragem", "Responsabilidade", "Honestidade",
    "Determinação", "Liderança", "Comunicação", "Adaptabilidade", "Disciplina",
    "Gentileza", "Paciência", "Colaboração", "Integridade", "Sinceridade",
    "Curiosidade", "Foco", "Sabedoria", "Equilíbrio", "Entusiasmo",
    "Solidariedade", "Ambição", "Paz", "Família", "Autodisciplina",
    "Originalidade"
];

const container = document.getElementById("valores-container");
let selecionados = [];

// Criar cards
valores.forEach(v => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = v;

    card.addEventListener("click", () => toggleValor(card));
    container.appendChild(card);
});

function toggleValor(card) {
    const valor = card.textContent;

    if (card.classList.contains("selected")) {
        card.classList.remove("selected");
        selecionados = selecionados.filter(v => v !== valor);
        return;
    }

    if (selecionados.length >= 5) {
        alert("Você só pode selecionar até 5 valores.");
        return;
    }

    card.classList.add("selected");
    selecionados.push(valor);
}

document.getElementById("btn-finalizar").addEventListener("click", () => {
    if (selecionados.length === 0) {
        alert("Selecione ao menos 1 valor.");
        return;
    }

    gerarFeedback();
});

function gerarFeedback() {
    const categorias = {
        emocional: ["Empatia", "Gratidão", "Gentileza", "Paciência", "Paz", "Família", "Solidariedade"],
        analitico: ["Disciplina", "Foco", "Responsabilidade", "Organização", "Justiça", "Autodisciplina"],
        criativo: ["Criatividade", "Originalidade", "Curiosidade", "Entusiasmo"],
        social: ["Comunicação", "Colaboração", "Liderança"],
        performance: ["Ambição", "Coragem", "Determinação", "Resiliência"],
        equilibrado: ["Equilíbrio", "Sabedoria", "Integridade", "Sinceridade", "Honestidade"]
    };

    let pontuacao = {
        emocional: 0, analitico: 0, criativo: 0,
        social: 0, performance: 0, equilibrado: 0
    };

    selecionados.forEach(v => {
        for (let categoria in categorias) {
            if (categorias[categoria].includes(v)) {
                pontuacao[categoria]++;
            }
        }
    });

    const maior = Object.keys(pontuacao).reduce((a, b) =>
        pontuacao[a] > pontuacao[b] ? a : b
    );

    const feedbacks = {
        emocional:
            "Você demonstra forte sensibilidade e conexão humana. Valoriza vínculos, empatia e equilíbrio emocional.",
        analitico:
            "Você é objetivo(a), organizado(a) e confiável. Sua mente funciona bem com estrutura, lógica e clareza.",
        criativo:
            "Você possui imaginação e visão além do comum. Seu potencial está na inovação e na criação de novas possibilidades.",
        social:
            "Você se destaca na comunicação e na influência positiva. Tem perfil colaborativo e voltado para relações saudáveis.",
        performance:
            "Você é movido(a) por desafios. Tem energia, coragem e persistência acima da média.",
        equilibrado:
            "Você revela maturidade e visão ampla. Age com coerência, ética e sabedoria nas decisões."
    };

    document.getElementById("lista-valores").innerHTML =
        `<strong>${selecionados.join(", ")}</strong>`;

    document.getElementById("feedback").innerHTML = feedbacks[maior];

    document.getElementById("resultado").classList.remove("hidden");
    document.getElementById("resultado").scrollIntoView({ behavior: "smooth" });
}