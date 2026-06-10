// Menu Mobile Integrado
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenu.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
    } else {
        icon.className = 'fa-solid fa-bars';
    }
});

const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.getElementById('mobile-menu').querySelector('i').className = 'fa-solid fa-bars';
    });
});

// Ativar link correto no menu conforme o Scroll da página
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollPosition >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
    
    const navbar = document.querySelector('.navbar');
    if (scrollPosition > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

// LÓGICA DO QUIZ INTERATIVO
document.getElementById('submit-quiz').addEventListener('click', () => {
    const form = document.getElementById('quiz-form');
    let pontuacao = 0;
    const totalPerguntas = 3;

    // Captura as respostas selecionadas
    const r1 = form.elements['q1'].value;
    const r2 = form.elements['q2'].value;
    const r3 = form.elements['q3'].value;

    // Valida se todas foram respondidas
    if (!r1 || !r2 || !r3) {
        alert('Por favor, responda a todas as perguntas antes de enviar!');
        return;
    }

    // Soma pontos para respostas corretas
    if (r1 === 'correto') pontuacao++;
    if (r2 === 'correto') pontuacao++;
    if (r3 === 'correto') pontuacao++;

    // Mensagem dinâmica com base no desempenho
    let mensagem = '';
    if (pontuacao === totalPerguntas) {
        mensagem = `Excelente! Acertou ${pontuacao} de ${totalPerguntas}. Você conhece muito bem a sustentabilidade no agro! 🌾🌱`;
    } else if (pontuacao === 1 || pontuacao === 2) {
        mensagem = `Bom trabalho! Acertou ${pontuacao} de ${totalPerguntas}. Que tal ler o conteúdo do site mais uma vez para gabaritar? 🚜`;
    } else {
        mensagem = `Ops! Acertou ${pontuacao} de ${totalPerguntas}. Não desanime, explore o nosso site e tente de novo! 🌳`;
    }

    // Exibe a caixa de resultados
    document.getElementById('quiz-score-text').innerText = mensagem;
    document.getElementById('quiz-result').classList.remove('hidden');
    form.classList.add('hidden');
});

// Reiniciar Quiz
document.getElementById('reset-quiz').addEventListener('click', () => {
    const form = document.getElementById('quiz-form');
    form.reset();
    form.classList.remove('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
});
