

fetch('https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=2')
    .then(resp => resp.json())
    .then(r => console.log(r.products))
