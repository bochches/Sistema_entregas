// js/api.js

const BASE_URL = "https://localhost:5500/api"; // troque pela URL real da sua API

async function get(endpoint) {
  const response = await fetch(BASE_URL + endpoint);
  return response.json();
}

async function post(endpoint, dados) {
  const response = await fetch(BASE_URL + endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return response.json();
}
