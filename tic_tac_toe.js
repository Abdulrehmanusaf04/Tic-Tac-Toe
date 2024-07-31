document.addEventListener('DOMContentLoaded', () => {
    const box = document.querySelectorAll('.box');
    const messageElement = document.getElementById('message');
    const restartButton = document.getElementById('restartButton');
    let currentPlayer = 'X';
    let gameActive = true;
    let boardState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleBoxClick = (event) => {
        const clickedBox = event.target;
        const clickedBoxIndex = parseInt(clickedBox.getAttribute('data-index'));

        if (boardState[clickedBoxIndex] !== '' || !gameActive) {
            return;
        }

        boardState[clickedBoxIndex] = currentPlayer;
        clickedBox.textContent = currentPlayer;

        if (checkWinner()) {
            messageElement.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (!boardState.includes('')) {
            messageElement.textContent = `It's a draw!`;
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    const checkWinner = () => {
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return boardState[a] !== '' && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    };

    const restartGame = () => {
        boardState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        box.forEach(box => box.textContent = '');
        messageElement.textContent = '';
    };

    box.forEach(box => box.addEventListener('click', handleBoxClick));
    restartButton.addEventListener('click', restartGame);
});
