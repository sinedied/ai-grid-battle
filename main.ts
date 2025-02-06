type Cell = {
    claimedBy: number | null;
    isObstacle: boolean;
};

type Bot = {
    id: number;
    x: number;
    y: number;
    points: number;
    hasBonus: boolean;
    bonusTurnsLeft: number;
};

const GRID_SIZE = 10;
const OBSTACLE_COUNT = 6;
const BOT_COUNT = 4;
const TURN_COUNT = 50;
const BONUS_POSITION = { x: 5, y: 5 };
const BONUS_DURATION = 5;

let grid: Cell[][] = [];
let bots: Bot[] = [];
let turn = 0;

function initializeGrid() {
    for (let i = 0; i < GRID_SIZE; i++) {
        grid[i] = [];
        for (let j = 0; j < GRID_SIZE; j++) {
            grid[i][j] = { claimedBy: null, isObstacle: false };
        }
    }

    for (let i = 0; i < OBSTACLE_COUNT; i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * GRID_SIZE);
            y = Math.floor(Math.random() * GRID_SIZE);
        } while (grid[x][y].isObstacle);
        grid[x][y].isObstacle = true;
    }
}

function initializeBots() {
    for (let i = 0; i < BOT_COUNT; i++) {
        let x, y;
        do {
            x = Math.floor(Math.random() * GRID_SIZE);
            y = Math.floor(Math.random() * GRID_SIZE);
        } while (grid[x][y].isObstacle || grid[x][y].claimedBy !== null);
        bots.push({ id: i, x, y, points: 0, hasBonus: false, bonusTurnsLeft: 0 });
        grid[x][y].claimedBy = i;
    }
}

function moveBot(bot: Bot) {
    const directions = [
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
    ];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const newX = bot.x + direction.x;
    const newY = bot.y + direction.y;

    if (
        newX >= 0 &&
        newX < GRID_SIZE &&
        newY >= 0 &&
        newY < GRID_SIZE &&
        !grid[newX][newY].isObstacle
    ) {
        bot.x = newX;
        bot.y = newY;
    }
}

function updateGrid() {
    const positions = new Map<string, Bot[]>();

    for (const bot of bots) {
        moveBot(bot);
        const key = `${bot.x},${bot.y}`;
        if (!positions.has(key)) {
            positions.set(key, []);
        }
        positions.get(key)!.push(bot);
    }

    for (const [key, botsAtPosition] of positions.entries()) {
        if (botsAtPosition.length === 1) {
            const bot = botsAtPosition[0];
            const [x, y] = key.split(',').map(Number);
            if (grid[x][y].claimedBy === null) {
                grid[x][y].claimedBy = bot.id;
                bot.points += bot.hasBonus ? 2 : 1;
                if (
                    (x === 0 && y === 0) ||
                    (x === 0 && y === GRID_SIZE - 1) ||
                    (x === GRID_SIZE - 1 && y === 0) ||
                    (x === GRID_SIZE - 1 && y === GRID_SIZE - 1)
                ) {
                    bot.points += 5;
                }
                if (x === BONUS_POSITION.x && y === BONUS_POSITION.y && turn >= TURN_COUNT - BONUS_DURATION) {
                    bot.hasBonus = true;
                    bot.bonusTurnsLeft = BONUS_DURATION;
                }
            }
        }
    }

    for (const bot of bots) {
        if (bot.hasBonus) {
            bot.bonusTurnsLeft--;
            if (bot.bonusTurnsLeft === 0) {
                bot.hasBonus = false;
            }
        }
    }
}

function updateLadder() {
    const rankingList = document.getElementById('ranking-list')!;
    rankingList.innerHTML = '';
    const sortedBots = [...bots].sort((a, b) => b.points - a.points);
    for (const bot of sortedBots.slice(0, 20)) {
        const listItem = document.createElement('li');
        listItem.textContent = `Bot ${bot.id}: ${bot.points} points`;
        rankingList.appendChild(listItem);
    }
}

function simulateBattle() {
    initializeGrid();
    initializeBots();
    for (turn = 0; turn < TURN_COUNT; turn++) {
        updateGrid();
        updateLadder();
    }
}

simulateBattle();
