const elementos = document.querySelectorAll('[data-key]');
let dadosTexto = null;

function inserirTextos(data) {
  elementos.forEach(el => {
    const chave = el.dataset.key;
    const valor = chave.split('.').reduce((obj, prop) => obj?.[prop], data) ?? '';
    const contemHTML = typeof valor === 'string' && /<\/?[a-z][\s\S]*>/i.test(valor);
    el[contemHTML ? 'innerHTML' : 'textContent'] = valor;
    el.style.display = el.tagName === 'BUTTON' ? 'inline-block' : 'block';
  });
}

fetch('/textos.json')
  .then(res => res.json())
  .then(data => {
    dadosTexto = data;
    inserirTextos(data);
  });
