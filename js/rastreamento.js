document.getElementById('form-rastreamento').addEventListener('submit', async (e) => {
  e.preventDefault();
  const codigo = document.getElementById('codigo').value.trim();
  if (!codigo) return;

  try {
    const entrega = await fetch(`/api/entregas/${codigo}`).then(r => r.json());
    const historico = await fetch(`/api/entregas/${codigo}/historico`).then(r => r.json());

    document.getElementById('status').textContent = entrega.status || 'Status não disponível';

    const ul = document.getElementById('historico');
    ul.innerHTML = '';
    historico.forEach(h => {
      const li = document.createElement('li');
      li.textContent = `${h.data} - ${h.status}`;
      ul.appendChild(li);
    });
  } catch (error) {
    alert('Erro ao buscar rastreamento');
    console.error(error);
  }
});