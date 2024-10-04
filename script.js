console.log('Script is running');

function formatDate(date) {
    const days = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
    const months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayName}, ${day} ${monthName} ${year}`;
}

// 迷宫生成和绘制
let canvas;
let ctx;
const mazeSize = 20;
let cellSize;

function initMaze() {
    console.log('Initializing maze');
    canvas = document.getElementById('mazeCanvas');
    if (canvas) {
        console.log('Canvas found');
        ctx = canvas.getContext('2d');
        cellSize = canvas.width / mazeSize;
        generateMaze();
    } else {
        console.error('Canvas element not found');
    }
}

let maze = [];

function generateMaze() {
    console.log('Generating maze');
    maze = Array(mazeSize).fill().map(() => Array(mazeSize).fill(1));

    function carve(x, y) {
        const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];
        directions.sort(() => Math.random() - 0.5);

        for (let [dx, dy] of directions) {
            let nx = x + dx * 2, ny = y + dy * 2;
            if (nx >= 0 && nx < mazeSize && ny >= 0 && ny < mazeSize && maze[ny][nx] === 1) {
                maze[y + dy][x + dx] = 0;
                maze[ny][nx] = 0;
                carve(nx, ny);
            }
        }
    }

    maze[0][0] = 0;
    carve(0, 0);

    // 确保有一条从起点到终点的路径
    let x = 0, y = 0;
    while (x < mazeSize - 1 || y < mazeSize - 1) {
        if (x < mazeSize - 1 && (y === mazeSize - 1 || Math.random() < 0.5)) {
            maze[y][x + 1] = 0;
            x++;
        } else {
            maze[y + 1][x] = 0;
            y++;
        }
    }

    drawMaze();
}

function drawMaze() {
    console.log('Drawing maze');
    if (!ctx) {
        console.error('Canvas context not available');
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < mazeSize; y++) {
        for (let x = 0; x < mazeSize; x++) {
            if (maze[y][x] === 1) {
                ctx.fillStyle = 'black';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded');
    const dateElement = document.getElementById('date');
    if (dateElement) {
        dateElement.textContent = formatDate(new Date());
    } else {
        console.error('Date element not found');
    }
    initMaze();
});

// 添加一个全局错误处理器
window.onerror = function(message, source, lineno, colno, error) {
    console.error('Global error:', message, 'at', source, 'line', lineno);
    return false;
};
