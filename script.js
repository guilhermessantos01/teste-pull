// Elementos do DOM
const actionButton = document.getElementById('actionButton');
const messageElement = document.getElementById('message');
const counterElement = document.getElementById('counter');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const resetBtn = document.getElementById('resetBtn');

// Estado do contador
let counter = 0;

// Mensagens para o botão de ação
const messages = [
    '🎉 Ótimo trabalho!',
    '✨ Você está indo bem!',
    '🚀 Continue assim!',
    '💪 Excelente!',
    '🌟 Fantástico!',
    '🎯 Perfeito!',
    '🔥 Incrível!'
];

// Função para obter mensagem aleatória
function getRandomMessage() {
    return messages[Math.floor(Math.random() * messages.length)];
}

// Event listener para o botão de ação
actionButton.addEventListener('click', () => {
    messageElement.textContent = getRandomMessage();
    messageElement.style.animation = 'none';
    setTimeout(() => {
        messageElement.style.animation = 'fadeIn 0.5s ease-in-out';
    }, 10);
});

// Função para atualizar o contador
function updateCounter() {
    counterElement.textContent = counter;
    counterElement.style.animation = 'none';
    setTimeout(() => {
        counterElement.style.animation = 'fadeIn 0.3s ease-in-out';
    }, 10);
}

// Event listeners para os botões do contador
incrementBtn.addEventListener('click', () => {
    counter++;
    updateCounter();
});

decrementBtn.addEventListener('click', () => {
    counter--;
    updateCounter();
});

resetBtn.addEventListener('click', () => {
    counter = 0;
    updateCounter();
    messageElement.textContent = '🔄 Contador resetado!';
    setTimeout(() => {
        messageElement.textContent = '';
    }, 2000);
});

// Mensagem de boas-vindas no console
console.log('🚀 Aplicação carregada com sucesso!');
console.log('📝 Projeto de teste para Pull Request');

// Animação de fade in para mensagens
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

