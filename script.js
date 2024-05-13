const grid = document.querySelector('.grid');
const cards = document.querySelector('.card');
const result = document.getElementById('result')
const mainG = document.getElementById('game')
let cont = 15;
const characters = [
    'abra',
    'articuno',
    'bulbasaur',
    'charmander',
    'ditto',
    'dragonite',
    'eevee',
    'flareon',
    'gengar',
    'growlithe',
    'gyarados',
    'hypno',
    'jigglypuff',
    'joelton',
    'jynx',
    'lapras',
    'mew',
    'mewtwo',
    'moltres',
    'onix',
    'pikachu',
    'snorlax',
    'squirtle',
    'vaporeon',
    'zapdos'
];

/*createElement cria um elemento qualquer que será passado por parâmetro como tag, ao criar esse tag ele adiciona um uma classe
x que será passada por parâmetro como className.*/
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;

    return element;
}

const createButton = () => {
    const btn = createElement('a', 'btn');
    btn.innerText = "Jogar novamente";
    btn.setAttribute('href', '#container-cards');
    btn.setAttribute('href', 'jogo.html');
    mainG.appendChild(btn);
}

/*createCard irá criar o elemento da carta para o jogo, por isso ela utiliza o elemento createElement, passando como parâmetro
'div', e classeName. O o nome da classe que será adicionado nessa div será passado em outra função.*/
const createCard = (character) => {
    const card = createElement('div', 'card');
    card.style.backgroundImage = `url('./images/pokemons/${character}.png')`;
    card.setAttribute('id', character);
    return card;
}

/*createGameCharacters cria os 15 elementos necessários para o Jogo da Memória. Então ele cria um array com 15 elementos, e cria 
uma varável qualquer para receber os elementos do array de personagens embaralhados. Logo após, ele adiciona os 15 primeiros
elementos da variável embaralhada no vetor de tamanho 15 e retorna esse vetor.*/
const createGameCharacters = () => {
    const charsInGame = new Array(15);
    const shuffledArray = shuffled(characters);

    for (let i = 0; i < charsInGame.length; i++) {
        charsInGame[i] = shuffledArray[i];
    }
    
    return charsInGame;
}
/*shuffled recebe e embaralha um vetor*/
const shuffled = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

/*newCharacters recebe 2 arrays, que são dos personagens que estão no jogo e os personagens que não estão, então ele remove os 4
primeiros personagens que estão no jogo e adiciona os primeiro 4 que não estão no jogo.*/
const newCharacters = (characters, notContain) => {
    const newCharacters = [...characters];
    shuffled(newCharacters);    
    newCharacters.splice(0, 4);
    for (let i = 0; i < 4; i++) {
        newCharacters.push(notContain[i]);
    }
    shuffled(newCharacters);
    
    return newCharacters;
}

/*notContainedElements recebe um vetor que são os personagens contidos no jogo, em seguida cria um vetor com todos os personagens
 e depois faz a comparação do vetor que contêm todos os elementos com o vetor de personagens em game. Quando nessa compração é
 encontrado um personagem que já tem no jogo, então o mesmo é removido do array que recebeu todos os personagens e no final das 
 comparações retorna um vetor que contém os personagens que não estão no jogo.*/
const notContainedElements = (array) => {
    const notContain = [...characters];
    characters.forEach((element) => {
        for (let i = 0; i < array.length; i++) {
            if (element == array[i]) {
                notContain.splice(notContain.indexOf(array[i]), 1);
                // Encontre a posição do índice de "notContaim", então remova um elemento dessa posição
            }
        }
    });
    return notContain;
}

/*loadCharactersInGame cria um elemento carta para todos os personagens que estão contidos no jogo.*/
const loadCharactersInGame = (charactersIn) => {
    charactersIn.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

const checkCharactersInGame = (charactersIn) => {
    charactersIn.forEach((character) => {
        const card = createCard(character);
        card.addEventListener('click', checkCards);
        grid.appendChild(card);
    });
}

/*startTimer carrega o cronometro do jogo ##### */
const startTimer = (duration, newCharsInGame) => {
    const display = document.querySelector('#timer');
    let timer = duration, minutes, seconds;

    let a = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        timer--;

        if (timer <= -1) {
            clearInterval(a);
            checkCharactersInGame(newCharsInGame);


            for (let i = 0; i < 15; i++) {
                grid.removeChild(grid.firstChild);
                
            }
        }
    }, 1000);
}

/*loadGame carrega o jogo.*/
const charactersInGame = createGameCharacters();
const notContainedCharacters = notContainedElements(charactersInGame);
const newCharactersInGame = newCharacters(charactersInGame, notContainedCharacters);

const checkCards = (e) => {
    const card = document.getElementById(e.target.id);
  if(comparation(e)){
    grid.removeChild(card);
    cont--;

    if(cont == 4){
        result.innerText = "Você venceu!";
        cont = 15;
        createButton();
    }
  } else {
    result.innerText = "Você perdeu!";
    grid.style.pointerEvents = 'none';
    createButton();
  }
}

const comparation = (element) =>{
    const idCard = element.target.id;

    for(let i = 0; i < 15; i++){
        if(charactersInGame[i] == idCard){
            return true;
        }
    }
    return false;
}
const loadGame = () => {

    loadCharactersInGame(charactersInGame);
    startTimer(30, newCharactersInGame);

}
loadGame();