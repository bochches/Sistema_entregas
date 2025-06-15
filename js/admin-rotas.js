document.getElementById('form-rotas').addEventListener('submit', async (e) => {
  e.preventDefault();
  const rota = {
    origem: document.getElementById('origem').value,
    destino: document.getElementById('destino').value,
    distancia: parseFloat(document.getElementById('distancia').value),
    tempo: parseFloat(document.getElementById('tempo').value) || null
  };

  await fetch('/api/rotas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rota)
  });

  document.getElementById('form-rotas').reset();
  carregarRotas();
});

async function carregarRotas() {
  const origem = document.getElementById('filtro-origem').value;
  const destino = document.getElementById('filtro-destino').value;
  let url = '/api/rotas';
  const query = [];
  if (origem) query.push(`origem=${encodeURIComponent(origem)}`);
  if (destino) query.push(`destino=${encodeURIComponent(destino)}`);
  if (query.length) url += '?' + query.join('&');

  const res = await fetch(url);
  const rotas = await res.json();
  const tbody = document.querySelector('#tabela-rotas tbody');
  tbody.innerHTML = '';
  rotas.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.origem}</td>
      <td>${r.destino}</td>
      <td>${r.distancia}</td>
      <td>${r.tempo || '-'}</td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById('btn-filtrar-rotas').addEventListener('click', carregarRotas);
document.addEventListener('DOMContentLoaded', carregarRotas);