document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('mazeCanvas');
    const ctx = canvas.getContext('2d');
    const cellSize = 20;
    const mazeSize = 30;

    let maze = [];
    let playerX = 0;
    let playerY = 0;

    function generateMaze() {
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
    }

    function drawMaze() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < mazeSize; i++) {
            for (let j = 0; j < mazeSize; j++) {
                if (maze[i][j] === 0) {
                    ctx.fillStyle = '#fff';
                    ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
                }
            }
        }

        // 绘制起点 (浅灰色)
        ctx.fillStyle = '#D3D3D3';
        ctx.fillRect(0, 0, cellSize, cellSize);

        // 绘制终点 (深灰色)
        ctx.fillStyle = '#404040';
        ctx.fillRect((mazeSize - 1) * cellSize, (mazeSize - 1) * cellSize, cellSize, cellSize);

        // 绘制玩家 (灰色)
        ctx.fillStyle = '#808080';
        ctx.fillRect(playerX * cellSize, playerY * cellSize, cellSize, cellSize);
    }

    function movePlayer(dx, dy) {
        const newX = playerX + dx;
        const newY = playerY + dy;

        if (newX >= 0 && newX < mazeSize && newY >= 0 && newY < mazeSize && maze[newY][newX] === 0) {
            playerX = newX;
            playerY = newY;
            drawMaze();

            if (playerX === mazeSize - 1 && playerY === mazeSize - 1) {
                alert('Complimenti, hai vinto! 恭喜你赢了！');
                resetGame();
            }
        }
    }

    function resetGame() {
        playerX = 0;
        playerY = 0;
        generateMaze();
        drawMaze();
    }

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp': movePlayer(0, -1); break;
            case 'ArrowDown': movePlayer(0, 1); break;
            case 'ArrowLeft': movePlayer(-1, 0); break;
            case 'ArrowRight': movePlayer(1, 0); break;
        }
    });

    // 初始化游戏
    canvas.width = canvas.height = mazeSize * cellSize;
    resetGame();
});