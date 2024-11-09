// NAVBAR
// Ativa o menu de overlay
document.getElementById("menu-toggle").addEventListener("click", function () {
  const overlay = document.getElementById("overlay");
  overlay.classList.toggle("active");
});

// Fecha o overlay se o usuário clicar fora do menu
document.addEventListener("click", function (e) {
  const overlay = document.getElementById("overlay");
  const menu = document.querySelector(".overlay-menu");

  // Se o clique for fora do overlay e do botão de menu, fecha o menu
  if (
    !overlay.contains(e.target) &&
    !document.getElementById("menu-toggle").contains(e.target)
  ) {
    overlay.classList.remove("active");
  }
});


//BANER
const slides = document.querySelectorAll(".carousel-item");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;
let interval;
let startX = 0;
let endX = 0;

// Função para exibir o slide com base no índice
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    dots[i].classList.remove("active");
  });
  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

// Exibe o primeiro slide ao carregar a página
showSlide(currentIndex);

// Inicia o intervalo para avançar os slides automaticamente
function startAutoSlide() {
  interval = setInterval(() => {
    currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    showSlide(currentIndex);
  }, 4500); // 4.5 segundos
}

// Para o intervalo de slides automáticos
function stopAutoSlide() {
  clearInterval(interval);
}

// Iniciar a rotação automática ao carregar a página
startAutoSlide();

// Controle da navegação para o slide anterior
document.querySelector(".prev").addEventListener("click", () => {
  stopAutoSlide();
  currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
  showSlide(currentIndex);
  startAutoSlide();
});

// Controle da navegação para o próximo slide
document.querySelector(".next").addEventListener("click", () => {
  stopAutoSlide();
  currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
  showSlide(currentIndex);
  startAutoSlide();
});

// Controle dos indicadores (bolinhas)
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    stopAutoSlide();
    currentIndex = index;
    showSlide(currentIndex);
    startAutoSlide();
  });
});


// ANIMAÇÃO DOS NÚMEROS
function animateNumbers() {
  const numbers = document.querySelectorAll(".stat-number");

  numbers.forEach((number) => {
    const target = parseInt(number.getAttribute("data-target"), 10); // Valor alvo
    let current = 0;
    const duration = 2000; // Duração em milissegundos (2 segundos)
    const increment = target / (duration / 50); // Incremento por intervalo

    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(interval);
        number.textContent =
          target + (number.textContent.includes("%") ? "%" : ""); // Mantém o '%' se já estiver presente
      } else {
        number.textContent =
          Math.floor(current) + (number.textContent.includes("%") ? "%" : "");
      }
    }, 50);
  });
}

// Observer para detectar quando a seção entra na visualização
const observer = new IntersectionObserver(
  (entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateNumbers();
        observerInstance.unobserve(entry.target); // Remove o observador após a animação começar
      }
    });
  },
  { threshold: 0.5 }
); // A animação começa quando 50% da seção está visível

// Adiciona o observer à seção
const section = document.querySelector("#voce-sabia");
observer.observe(section);


//INSTALASÇOES
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const closeBtn = document.getElementById("close");

document.querySelectorAll(".galeria-item").forEach((image) => {
  image.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImage.src = image.src;
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Validação do formulário de contato
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Simples validação
      if (!name || !email || !message) {
        event.preventDefault(); // Impede o envio do formulário
        alert("Por favor, preencha todos os campos antes de enviar.");
      } else {
        alert("Mensagem enviada com sucesso!"); // Mensagem de sucesso
      }
    });
  }
});
