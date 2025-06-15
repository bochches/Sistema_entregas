document.getElementById('form-clientes').addEventListener('submit', async (e) => {
  e.preventDefault();
  const cliente = {
    nome: document.getElementById('nome').value,
    cpfCnpj: document.getElementById('cpfCnpj').value,
    email: document.getElementById('email').value,
    endereco: document.getElementById('endereco').value
  };

  await fetch('/api/clientes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente)
  });

  document.getElementById('form-clientes').reset();
  carregarClientes();
});

async function carregarClientes() {
  const nomeFiltro = document.getElementById('filtro-nome').value;
  const cpfFiltro = document.getElementById('filtro-cpf').value;
  let url = '/api/clientes';
  const query = [];
  if (nomeFiltro) query.push(`nome=${encodeURIComponent(nomeFiltro)}`);
  if (cpfFiltro) query.push(`cpfCnpj=${encodeURIComponent(cpfFiltro)}`);
  if (query.length) url += '?' + query.join('&');

  const res = await fetch(url);
  const clientes = await res.json();
  const tbody = document.querySelector('#tabela-clientes tbody');
  tbody.innerHTML = '';
  clientes.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${c.nome}</td><td>${c.cpfCnpj}</td><td>${c.email}</td><td>${c.endereco}</td>`;
    tbody.appendChild(tr);
  });
}

document.getElementById('btn-filtrar-clientes').addEventListener('click', carregarClientes);
document.addEventListener('DOMContentLoaded', carregarClientes);