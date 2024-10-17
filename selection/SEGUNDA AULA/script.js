const imagem = document.getElementById("imagem");
const nome = document.getElementById("nome");
const loreDiv = document.getElementById("lore");
const btnBuscar = document.getElementById("btnBuscar");
const inputBusca = document.getElementById("txtBusca");
const sideMenu = document.getElementById("sideMenu");
const menuToggle = document.getElementById("menuToggle");
const letrasContainer = document.getElementById("letras");

// Função para abrir e fechar o menu lateral
menuToggle.addEventListener("click", () => {
    sideMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
});

// Gera as letras de A a Z no menu lateral
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
letras.forEach(letra => {
    const li = document.createElement("li");
    li.textContent = letra;
    letrasContainer.appendChild(li);

    // Lista onde os personagens dessa letra serão inseridos
    const personagensLista = document.createElement("ul");
    personagensLista.classList.add("personagens-lista");
    li.appendChild(personagensLista);

    // Adiciona evento de clique para mostrar/esconder personagens por letra
    li.addEventListener("click", () => {
        if (personagensLista.style.display === "none" || personagensLista.style.display === "") {
            buscarPersonagensPorLetra(letra, personagensLista);
            personagensLista.style.display = "block";
        } else {
            personagensLista.style.display = "none";
        }
    });
});

// Função para buscar o personagem baseado no nome
function buscarPersonagem() {
    const nomePersonagem = inputBusca.value.trim();

    if (!nomePersonagem) {
        nome.textContent = "Digite um nome!";
        imagem.style.display = "none";
        loreDiv.style.display = "none"; // Esconde a lore
        return;
    }

    const url = `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(nomePersonagem)}`;

    fetch(url)
        .then(response => response.json())
        .then(body => {
            if (body.results && body.results.length > 0) {
                const personagem = body.results[0];
                imagem.src = personagem.image;
                nome.textContent = personagem.name;
                loreDiv.textContent = getLore(personagem.name); // Atualiza a lore
                nome.style.display = "block";
                imagem.style.display = "block";
                loreDiv.style.display = "block"; // Mostra a lore
            } else {
                nome.textContent = "Personagem não encontrado!";
                imagem.style.display = "none";
                loreDiv.style.display = "none"; // Esconde a lore
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            nome.textContent = "Erro ao buscar o personagem.";
            imagem.style.display = "none";
            loreDiv.style.display = "none"; // Esconde a lore
        });
}

// Função para buscar personagens por letra e exibir na lista correspondente
function buscarPersonagensPorLetra(letra, personagensLista) {
    const url = `https://rickandmortyapi.com/api/character/?name=${letra}`;

    fetch(url)
        .then(response => response.json())
        .then(body => {
            personagensLista.innerHTML = ""; // Limpa os personagens anteriores
            if (body.results && body.results.length > 0) {
                const personagensIniciamComLetra = body.results.filter(personagem => personagem.name.startsWith(letra));
                if (personagensIniciamComLetra.length > 0) {
                    personagensIniciamComLetra.forEach(personagem => {
                        const li = document.createElement("li");
                        li.textContent = personagem.name;
                        
                        // Adiciona evento de clique para inserir o nome no campo de busca
                        li.addEventListener("click", () => {
                            inputBusca.value = personagem.name;
                            buscarPersonagem();
                        });

                        personagensLista.appendChild(li);
                    });
                } else {
                    const li = document.createElement("li");
                    li.textContent = "Nenhum personagem encontrado.";
                    personagensLista.appendChild(li);
                }
            }
        })
        .catch(error => {
            console.error("Erro:", error);
        });
}

// Função para obter a lore de um personagem
function getLore(nome) {
    const loreMap = {
        "Rick Sanchez": "Um cientista brilhante e alcoólatra, Rick viaja por dimensões com seu neto Morty, frequentemente criando confusões.",
        "Morty Smith": "Um garoto que frequentemente se vê em situações perigosas devido às aventuras de seu avô, Rick.",
        "Beth Smith": "Filha de Rick, ela é uma veterinária que muitas vezes se sente insegura sobre sua vida e sua relação com o pai.",
        "Jerry Smith": "Marido de Beth, Jerry é frequentemente visto como um perdedor que luta para se afirmar.",
        "Summer Smith": "Filha adolescente de Rick e Beth, Summer busca sua identidade e frequentemente se junta a Rick e Morty em suas aventuras.",
        "Birdperson": "Um alienígena pássaro que é amigo de Rick e é parte de uma sociedade pacifista.",
        "Mr. Meeseeks": "Criaturas que aparecem quando chamados e cuja única missão é ajudar as pessoas a resolver seus problemas.",
        "Evil Morty": "Uma versão maligna de Morty que busca se libertar das manipulações de Rick e do Sistema.",
        "Purge Planet": "Um planeta onde todos os cidadãos participam de um evento de purificação anual, onde podem cometer qualquer crime.",
        "Jessica": "Interesse romântico de Morty, que muitas vezes se vê lutando para impressioná-la em suas aventuras.",
        "Squanchy": "Um amigo de Rick que é um gato alienígena e se transforma em uma versão mais poderosa de si mesmo quando fica 'squanch'.",
        "Gromflomite": "Um alienígena da União Galáctica que frequentemente se depara com Rick e Morty em suas aventuras interdimensionais.",
        "Tammy": "Amiga de Summer que se revela ser uma agente infiltrada da Federação Galáctica.",
        "Abadango Cluster Princess" : "conhecida por ser a líder de uma facção de alienígenas e por seu jeito extravagante e excêntrico."
        // Adicione mais personagens e suas respectivas lores conforme necessário
    };

    return loreMap[nome] || "Lore não disponível.";
}

// Adiciona eventos para buscar ao clicar no botão ou pressionar Enter
btnBuscar.addEventListener("click", buscarPersonagem);
inputBusca.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        buscarPersonagem();
    }
});