const url = 'https://api.coincap.io/v2';

function getAssets() {
  return fetch(`${url}/assets?limit=20`)
    .then(res => res.json())
    .then(json => json.data);
}

function getAssetById(coin) {
  return fetch(`${url}/assets/${coin}`)
    .then(res => res.json())
    .then(json => json.data);
}

function getAssetHistory(coin) {
  const now = new Date();
  const end = now.getTime();
  now.setDate(now.getDate() - 1);
  const start = now.getTime();
  const query = `interval=h1&start=${start}&end=${end}`;
  return fetch(`${url}/assets/${coin}/history?${query}`)
    .then(res => res.json())
    .then(json => json.data);
}

export default {
  getAssets: getAssets,
  getAssetById: getAssetById,
  getAssetHistory: getAssetHistory,
};
