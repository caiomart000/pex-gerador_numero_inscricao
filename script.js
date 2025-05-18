const form = document.getElementById('formInscricao');
const divImagem = document.getElementById('imagemNumero');

// Substitua pela URL do seu Web App
const URL_WEB_APP = 'https://script.google.com/macros/s/AKfycbwfy7JZuKrP5QgXcH-Ysi5hf1Gx_BHkhBP6dLj9giuvnOTkTi1RJtCx3z8XC627VoRl1w/exec';

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(URL_WEB_APP, {
      method: 'POST',
      body: formData
    });

    const resJson = await response.json();

    if (resJson.sucesso) {
      alert(resJson.mensagem);
      form.reset();

      const numero = resJson.mensagem.split('Número: ')[1];
      criarImagemNumero(numero);
    } else {
      alert('Erro: ' + resJson.mensagem);
    }
  } catch (error) {
    alert('Erro ao enviar inscrição: ' + error.message);
  }
});

function criarImagemNumero(numero) {
  divImagem.innerHTML = '';

  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 150;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#000';
  ctx.font = 'bold 80px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(numero, canvas.width / 2, canvas.height / 2);

  divImagem.appendChild(canvas);
}
