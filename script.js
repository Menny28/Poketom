const pokemonData = {
    player: {
        name: '',
        type: '',
        hp: 50,
        maxHp: 50,
        level: 5,
        attacks: [
            { name: 'Fiammata', damage: 18, type: 'fire' },
            { name: 'Codata', damage: 10, type: 'normal' }
        ],
        sprite: 'assets/images/Piro.png'
    },
    enemies: [
        {
            name: 'Ratto',
            type: 'normal',
            hp: 40,
            maxHp: 40,
            level: 4,
            attacks: [
                { name: 'Morso', damage: 12, type: 'normal' },
                { name: 'Furia', damage: 8, type: 'normal' }
            ],
            sprite: 'assets/images/Ratto.png'
        },
        {
            name: 'Serpente',
            type: 'grass',
            hp: 45,
            maxHp: 45,
            level: 5,
            attacks: [
                { name: 'Veleno', damage: 14, type: 'grass' },
                { name: 'Strangola', damage: 10, type: 'normal' }
            ],
            sprite: 'assets/images/Serpente.png'
        },
        {
            name: 'Uccello',
            type: 'water',
            hp: 48,
            maxHp: 48,
            level: 5,
            attacks: [
                { name: 'Beccata', damage: 13, type: 'water' },
                { name: 'Rapido', damage: 9, type: 'normal' }
            ],
            sprite: 'assets/images/Uccello.png'
        }
    ]
};

let currentEnemy = null;
let battleLog = [];
let playerPokemon = null;
let gameWins = 0;

function getRandomEnemy() {
    const randomIndex = Math.floor(Math.random() * pokemonData.enemies.length);
    return { ...pokemonData.enemies[randomIndex] };
}

function updateBattleLog(text) {
    const logDiv = document.getElementById('battle-log');
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.textContent = text;
    logDiv.appendChild(entry);
    logDiv.scrollTop = logDiv.scrollHeight;
}

function updateHPBars() {
    const playerHPBar = document.querySelector('#player-info .hp-bar');
    const playerHPText = document.querySelector('#player-info .hp-text');
    const enemyHPBar = document.querySelector('#enemy-info .hp-bar');
    const enemyHPText = document.querySelector('#enemy-info .hp-text');

    const playerHPPercent = (playerPokemon.hp / playerPokemon.maxHp) * 100;
    const enemyHPPercent = (currentEnemy.hp / currentEnemy.maxHp) * 100;

    playerHPBar.style.width = `${playerHPPercent}%`;
    enemyHPBar.style.width = `${enemyHPPercent}%`;

    playerHPText.textContent = `HP: ${playerPokemon.hp}/${playerPokemon.maxHp}`;
    enemyHPText.textContent = `HP: ${currentEnemy.hp}/${currentEnemy.maxHp}`;
}

function renderPokemonSelection() {
    const selectionDiv = document.getElementById('pokemon-selection');
    selectionDiv.innerHTML = '';

    const pokemonChoices = [
        { name: 'Piro', type: 'fire', hp: 50, sprite: 'assets/images/Piro.png' },
        { name: 'Verde', type: 'grass', hp: 55, sprite: 'assets/images/Verde.png' },
        { name: 'Aqua', type: 'water', hp: 52, sprite: 'assets/images/Aqua.png' }
    ];

    pokemonChoices.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'pokemon-card';
        card.innerHTML = `
            <div class="pokemon-sprite" style="background-image: url('${p.sprite}')"></div>
            <div><strong>${p.name}</strong></div>
            <div class="type-${p.type}">${p.type}</div>
            <div>HP: ${p.hp}</div>
        `;
        card.addEventListener('click', () => selectPokemon(p, card));
        selectionDiv.appendChild(card);
    });
}

let selectedCard = null;

function selectPokemon(pokemonData, card) {
    if (selectedCard) {
        selectedCard.classList.remove('selected');
    }
    selectedCard = card;
    card.classList.add('selected');
    playerPokemon = {
        name: pokemonData.name,
        type: pokemonData.type,
        hp: pokemonData.hp,
        maxHp: pokemonData.hp,
        level: 5,
        attacks: pokemonDataAttacks[pokemonData.name],
        sprite: pokemonData.sprite
    };
}

const pokemonDataAttacks = {
    'Piro': [
        { name: 'Fiammata', damage: 18, type: 'fire' },
        { name: 'Codata', damage: 10, type: 'normal' }
    ],
    'Verde': [
        { name: 'Frustata', damage: 17, type: 'grass' },
        { name: 'Colpo', damage: 9, type: 'normal' }
    ],
    'Aqua': [
        { name: 'Pistolacqua', damage: 16, type: 'water' },
        { name: 'Scontro', damage: 11, type: 'normal' }
    ]
};

function renderBattleScreen() {
    document.getElementById('menu-screen').classList.add('hidden');
    document.getElementById('battle-screen').classList.add('active');
    
    document.querySelector('#player-info .pokemon-sprite').style.backgroundImage = `url('${playerPokemon.sprite}')`;
    document.querySelector('#player-info .name-bar').textContent = playerPokemon.name;
    
    currentEnemy = getRandomEnemy();
    document.querySelector('#enemy-info .pokemon-sprite').style.backgroundImage = `url('${currentEnemy.sprite}')`;
    document.querySelector('#enemy-info .name-bar').textContent = currentEnemy.name;
    
    renderMoves(playerPokemon);
    updateHPBars();
    
    updateBattleLog(`Un selvatico ${currentEnemy.name} appare!`);
}

function renderMoves(pokemon) {
    const movesDiv = document.getElementById('player-moves');
    movesDiv.innerHTML = '';
    
    pokemon.attacks.forEach((attack, index) => {
        const moveButton = document.createElement('button');
        moveButton.className = 'move-button';
        moveButton.textContent = `${attack.name} (${attack.damage} danni)`;
        moveButton.addEventListener('click', () => playerAttack(index));
        movesDiv.appendChild(moveButton);
    });
}

function playerAttack(index) {
    const attack = playerPokemon.attacks[index];
    let damage = attack.damage;
    
    damage = Math.floor(damage * (playerPokemon.level / 5));
    
    if (attack.type === currentEnemy.type) {
        damage = Math.floor(damage * 0.75);
    }
    
    currentEnemy.hp -= damage;
    if (currentEnemy.hp < 0) currentEnemy.hp = 0;
    
    updateBattleLog(`${playerPokemon.name} usa ${attack.name}! Infligge ${damage} danni.`);
    
    const moveButtons = document.querySelectorAll('.move-button');
    moveButtons.forEach(btn => btn.disabled = true);
    
    updateHPBars();
    
    setTimeout(() => {
        if (currentEnemy.hp <= 0) {
            updateBattleLog(`${currentEnemy.name} è svenuto! Hai vinto!`);
            gameWins++;
            setTimeout(continueBattle, 1000);
        } else {
            enemyAttack();
        }
    }, 500);
}

function enemyAttack() {
    const attackIndex = Math.floor(Math.random() * currentEnemy.attacks.length);
    const attack = currentEnemy.attacks[attackIndex];
    let damage = attack.damage;
    
    damage = Math.floor(damage * (currentEnemy.level / 5));
    
    if (attack.type === playerPokemon.type) {
        damage = Math.floor(damage * 0.75);
    }
    
    playerPokemon.hp -= damage;
    if (playerPokemon.hp < 0) playerPokemon.hp = 0;
    
    updateBattleLog(`${currentEnemy.name} usa ${attack.name}! Infligge ${damage} danni.`);
    updateHPBars();
    
    setTimeout(() => {
        if (playerPokemon.hp <= 0) {
            updateBattleLog(`${playerPokemon.name} è svenuto! Game Over.`);
            showGameOver();
        } else {
            enableMoves();
        }
    }, 500);
}

function enableMoves() {
    const moveButtons = document.querySelectorAll('.move-button');
    moveButtons.forEach(btn => btn.disabled = false);
}

function continueBattle() {
    playerPokemon.hp = playerPokemon.maxHp;
    updateHPBars();
    updateBattleLog(`${playerPokemon.name} si è ripreso!`);
    
    setTimeout(() => {
        updateBattleLog('Continui? (s/n)');
        const continueBtn = document.createElement('button');
        continueBtn.textContent = 'Sì';
        continueBtn.addEventListener('click', () => {
            continueBtn.remove();
            renderBattleScreen();
        });
        const noBtn = document.createElement('button');
        noBtn.textContent = 'No';
        noBtn.addEventListener('click', () => {
            continueBtn.remove();
            noBtn.remove();
            showGameOver();
        });
        document.getElementById('player-moves').appendChild(continueBtn);
        document.getElementById('player-moves').appendChild(noBtn);
    }, 1000);
}

function showGameOver() {
    document.getElementById('battle-screen').classList.remove('active');
    document.getElementById('game-over-screen').classList.add('active');
    
    const text = document.getElementById('game-over-text');
    if (playerPokemon.hp <= 0) {
        text.textContent = `${playerPokemon.name} è svenuto!`;
    }
    
    const winsText = document.createElement('p');
    winsText.textContent = `Hai totalizzato ${gameWins} vittorie.`;
    document.getElementById('game-over-screen').appendChild(winsText);
}

function playAgain() {
    document.getElementById('game-over-screen').classList.remove('active');
    gameWins = 0;
    renderPokemonSelection();
}

document.getElementById('start-game').addEventListener('click', () => {
    if (playerPokemon) {
        renderBattleScreen();
    } else {
        updateBattleLog('Seleziona un Pokémon prima di iniziare!');
    }
});

document.getElementById('play-again').addEventListener('click', playAgain);

renderPokemonSelection();
