function formatDate(date) {
    const days = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
    const months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayName}, ${day} ${monthName} ${year}`;
}

// 设置日期到元素
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('date').textContent = formatDate(new Date());
});

// 数独生成函数
function generateSudoku() {
    const sudokuElement = document.getElementById('sudoku');
    
    // 清空之前的数独表格
    while (sudokuElement.firstChild) {
        sudokuElement.removeChild(sudokuElement.firstChild);
    }

    // 简单的数独数据（部分随机填充）
    const sudokuData = [
        [5, 3, '', '', 7, '', '', '', ''],
        [6, '', '', 1, 9, 5, '', '', ''],
        ['', 9, 8, '', '', '', '', 6, ''],
        [8, '', '', '', 6, '', '', '', 3],
        [4, '', '', 8, '', 3, '', '', 1],
        [7, '', '', '', 2, '', '', '', 6],
        ['', 6, '', '', '', '', 2, 8, ''],
        ['', '', '', 4, 1, 9, '', '', 5],
        ['', '', '', '', 8, '', '', 7, 9]
    ];

    // 遍历数独数据，生成输入框
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'sudoku-cell';
            input.maxLength = '1';

            // 如果数独数据中有数字，预填充到输入框
            if (sudokuData[row][col] !== '') {
                input.value = sudokuData[row][col];
                input.disabled = true; // 已填充的数字不可编辑
            }

            sudokuElement.appendChild(input);
        }
    }
}

// 迷宫生成函数
function generateMaze() {
    const canvas = document.getElementById('mazeCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const cellSize = 40;
    const rows = height / cellSize;
    const cols = width / cellSize;

    ctx.clearRect(0, 0, width, height); // 清空画布

    // 生成迷宫网格
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (Math.random() > 0.7) {
                ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize); // 填充部分方块作为迷宫墙壁
            }
        }
    }
}

// 页面加载时初始化数独并绑定按钮点击事件
window.onload = function() {
    generateSudoku();
    
    // 绑定按钮点击事件
    const sudokuButton = document.getElementById('generateSudokuBtn');
    sudokuButton.addEventListener('click', function() {
        generateSudoku();  // 点击按钮时生成新的数独
    });
};
