
//enable e disable the anchor tag "^" go to the top when scrolling page
const elementAnchor = document.querySelector(".btn-fixed");
const elementHeader = document.querySelector(".header");
window.onscroll = function (ev) {
    var  scrollTop = window.pageYOffset || document.body.scrollTop;
    if (scrollTop > elementHeader.offsetHeight + 100) {
        elementAnchor.style.display = 'inline-block';
    } else {
        elementAnchor.style.display = 'none';   
    }
}


// smooth scrolling when clicking on a anchor tag
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const containerProdutosTag = document.getElementById("produtos");
const containerEmailProdutosTag = document.getElementById("produtosEmail");

let url = `https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1`;

//a function that consult the api e create cards
function getProdutos() {
    fetch(url)
        .then(async resp => await resp.json())
        .then(r => {
            url = `https://${r.nextPage}`;
            //on param container, if find id "produtosEmail"
            //will set the quantity cards to 2, if not, will create 8 cards
            createCardProduct(r.products, containerEmailProdutosTag || containerProdutosTag);
        });
}

//function that creates cards, receiving as parameters a array objects and a container, in order to determine the number of cards to create 
function createCardProduct(products, container) {
    let cont = 1;
    products.forEach(produto => {
        if (container.id == "produtosEmail" && cont == 3) return false;

        //transforms into a string to replace a period with a comma
        const valorProduto = produto.installments.value + ""


        const card = document.createElement('div');
        card.classList.add('card');

        const cardImage = document.createElement('div');
        cardImage.classList.add('product-image');
        cardImage.style.backgroundImage = `url(${produto.image})`;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        //inserting each element inside another or assibling together
        container.insertAdjacentElement("beforeend", card);
        card.insertAdjacentElement("afterbegin", cardImage);
        cardImage.insertAdjacentElement("afterend", cardBody);
        cardBody.innerHTML = `<p class="product-name">${produto.name}</p>
                   <p class="product-description">${produto.description}</p>
                   <p class="product-from">De: R$${produto.oldPrice},99</p>
                   <p class="product-to">Por: R$${produto.price},99</p>
                   <p class="product-parceled">ou ${produto.installments.count}x de R$${valorProduto.replace('.', ',')}0</p>
                   <a href="#productpagebyid" class="btn-card">Comprar</a>`;

        cont++;
    })
}

getProdutos()

//if the page is emailversion the application won't broke
if (containerProdutosTag) {
    document.querySelector('[data-event]').addEventListener('click', function (e) {
        getProdutos()
    });
}



