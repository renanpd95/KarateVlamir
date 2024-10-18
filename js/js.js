
//animação dos personagens do banner left e right
window.onscroll = function() {
    scrollFunction();
};


function scrollFunction() {
    var menRight = document.getElementById("men-right");
    var menLeft = document.getElementById("men-left");

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        menRight.style.transform = "translateX(100px)"; // Muda a posição da div para a direita
    } else {
        menRight.style.transform = "translateX(0)"; // Retorna a div à sua posição original
    }

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        menLeft.style.transform = "translateX(-100px)"; // Muda a posição da div para a direita
    } else {
        menLeft.style.transform = "translateX(0)"; // Retorna a div à sua posição original
    }
}


// Função para verificar o scroll e exibir a imagem quando necessário
window.addEventListener('scroll', function() {
    var imagem = document.getElementById('imagem-scroll');
    var scrollPosition = window.scrollY;

    // Ajuste o valor abaixo conforme necessário para determinar quando exibir a imagem
    if (scrollPosition > 200) {
      imagem.style.display = 'block'; // Exibe a imagem
    } else {
      imagem.style.display = 'none'; // Oculta a imagem
    }
  });


//dropdown
const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl)) 


