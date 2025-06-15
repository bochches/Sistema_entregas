document.getElementById('form-encomendas').addEventListener('submit', async (e) => {
  e.preventDefault();
  const encomenda = {
    peso: parseFloat(document.getElementById('peso').value),
    tipo: document.getElementById('tipo').value,
    descricao: document.getElementById('descricao').value,
    enderecoEntrega: document.getElementById('endereco-entrega').value
  };

  await fetch('/api/encomendas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(encomenda)
  });

  document.getElementById('form-encomendas').reset();
  carregarEncomendas();
});

async function carregarEncomendas() {
  const tipo = document.getElementById('filtro-tipo').value;
  const pesoMin = parseFloat(document.getElementById('filtro-peso-min').value) || 0;
  const pesoMax = parseFloat(document.getElementById('filtro-peso-max').value) || 9999;
  let url = '/api/encomendas';
  const query = [];
  if (tipo) query.push(`tipo=${tipo}`);
  if (pesoMin) query.push(`pesoMin=${pesoMin}`);
  if (pesoMax) query.push(`pesoMax=${pesoMax}`);
  if (query.length) url += '?' + query.join('&');

  const res = await fetch(url);
  const encomendas = await res.json();
  const tbody = document.querySelector('#tabela-encomendas tbody');
  tbody.innerHTML = '';
  encomendas.forEach(e => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${e.peso.toFixed(2)}</td><td>${e.tipo}</td><td>${e.descricao || '-'}</td><td>${e.enderecoEntrega}</td>`;
    tbody.appendChild(tr);
  });
}

document.getElementById('btn-filtrar-encomendas').addEventListener('click', carregarEncomendas);
document.addEventListener('DOMContentLoaded', carregarEncomendas);