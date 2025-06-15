document.addEventListener('DOMContentLoaded', () => {
  carregarOpcoes();
  carregarEntregas();

  document.getElementById('form-entregas').addEventListener('submit', async (e) => {
    e.preventDefault();
    const entrega = {
      clienteId: document.getElementById('cliente').value,
      encomendaId: document.getElementById('encomenda').value,
      rotaId: document.getElementById('rota').value,
      dataEstimada: document.getElementById('data-estimada').value
    };

    await fetch('/api/entregas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entrega)
    });

    document.getElementById('form-entregas').reset();
    carregarEntregas();
  });

  document.getElementById('btn-filtrar-entregas').addEventListener('click', carregarEntregas);
});

async function carregarOpcoes() {
  await preencherSelect('/api/clientes', 'cliente', 'nome');
  await preencherSelect('/api/encomendas', 'encomenda', 'descricao');
  await preencherSelect('/api/rotas', 'rota', r => `${r.origem} → ${r.destino}`);
}

async function preencherSelect(url, selectId, labelFn) {
  const res = await fetch(url);
  const lista = await res.json();
  const select = document.getElementById(selectId);
  select.innerHTML = '';
  lista.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = typeof labelFn === 'function' ? labelFn(item) : item[labelFn];
    select.appendChild(option);
  });
}

async function carregarEntregas() {
  const cliente = document.getElementById('filtro-cliente').value;
  const rota = document.getElementById('filtro-rota').value;
  const data = document.getElementById('filtro-data').value;
  const status = document.getElementById('filtro-status').value;

  let url = '/api/entregas';
  const query = [];
  if (cliente) query.push(`cliente=${encodeURIComponent(cliente)}`);
  if (rota) query.push(`rota=${encodeURIComponent(rota)}`);
  if (data) query.push(`dataEstimada=${data}`);
  if (status) query.push(`status=${status}`);
  if (query.length) url += '?' + query.join('&');

  const res = await fetch(url);
  const entregas = await res.json();
  const tbody = document.querySelector('#tabela-entregas tbody');
  tbody.innerHTML = '';
  entregas.forEach(e => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${e.clienteNome || e.clienteId}</td>
      <td>${e.encomendaDescricao || e.encomendaId}</td>
      <td>${e.rotaResumo || e.rotaId}</td>
      <td>${e.dataEstimada}</td>
      <td>${e.status || 'em_preparo'}</td>
    `;
    tbody.appendChild(tr);
  });
}