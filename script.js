function openWebsite() {
    // إخفاء شاشة الترحيب
    document.getElementById('welcomeScreen').style.display = 'none';
    // إظهار المحتوى الرئيسي للموقع
    document.getElementById('mainContent').style.display = 'block';
}
// دالة الانتقال لصفحة اللعبة
function openGamePage() {
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
}

let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

function makeMove(index) {
    if (board[index] === "" && isGameActive) {
        board[index] = "❌"; // هي تلعب بـ X
        document.getElementsByClassName('cell')[index].innerText = "❌";
        
        // فحص إذا هي فازت
        if (checkWin("❌")) {
            document.getElementById('winMessage').style.display = 'block';
            isGameActive = false;
            return;
        }

        // دور الكمبيوتر (غبي وعشوائي)
        setTimeout(computerMove, 400);
    }
}

function computerMove() {
    if (!isGameActive) return;
    
    // نجمع الخلايا الفارغة
    let emptyCells = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") emptyCells.push(i);
    }

    if (emptyCells.length > 0) {
        // يختار ختارية عشوائية (لهذا هو كمبيوتر غبي وما يعرف يلعب بذكاء!)
        let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomCell] = "⭕";
        document.getElementsByClassName('cell')[randomCell].innerText = "⭕";

        // فحص إذا الكمبيوتر فاز بالصدفة (نادر الحدوث بس احتياط)
        if (checkWin("⭕")) {
            isGameActive = false;
        }
    }
}

function checkWin(player) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // أفقياً
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // عمودياً
        [0, 4, 8], [2, 4, 6]  // بشكل قطري
    ];

    return winConditions.some(condition => {
        return condition.every(index => board[index] === player);
    });
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    document.getElementById('winMessage').style.display = 'none';
    let cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
    }
}