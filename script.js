document.getElementById('revealButton').addEventListener('click', function() {
    document.getElementById('messageContainer').classList.remove('hidden');
    document.getElementById('heartContainer').classList.remove('hidden');
    startConfetti();
});

function startConfetti() {
    const confettiContainer = document.getElementById('confetti');
    confettiContainer.classList.remove('hidden');
    for (let i = 0; i < 300; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.classList.add('confetti-piece');
        confettiPiece.style.setProperty('--x', Math.random());
        confettiPiece.style.setProperty('--y', Math.random());
        confettiPiece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiPiece.style.left = '50%';
        confettiPiece.style.top = 'calc(50% + 45px)'; // Adjusting top position to match heart's position
        confettiContainer.appendChild(confettiPiece);
    }
}
