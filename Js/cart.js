let productsInCart = JSON.parse(localStorage.getItem('ShoppingCart'));
if (!productsInCart) {
    productsInCart = [];
}
const parentElenment = document.querySelector("#buyItems");
const cartSumprice = document.querySelector("#sum-prices");
const products = document.querySelectorAll('.product-under');

const countTheSumPrice = function () {
    let sumPrice = 0;
    productsInCart.forEach(product => {
        sumPrice += product.price;
    });
    return sumPrice;
}



const updateShoppingCartHTML = function () {
    localStorage.setItem('ShoppingCart', JSON.stringify(productsInCart));
    if (productsInCart.length > 0) {
        let result = productsInCart.map(product => {
            return `
            <li class="buyItem">
						<img src="${product.image}">
						<div>
							<h5>${product.name}</h5>
							<h6>${product.price}</h6>
							<div>
								<button class="button-minus" data-id='${product.id}'>-</button>
								<span class="countOfProduct">${product.count}</span>
								<button class="button-plus" data-id='${product.id}'>+</button>
							</div>
						</div>
					</li> 
            `
        });
        parentElenment.innerHTML = result.join('');
        document.querySelector('.checkout').classList.remove('.hiden');
        cartSumprice.innerHTML = "$" + countTheSumPrice();

    } else {
        document.querySelector('.checkout').classList.add('.hiden');
        parentElenment.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>';
        cartSumprice.innerHTML = "";

    }
}

function updateProductsInCart(product) {
    for (let i = 0; i < productsInCart.length; i++) {
        if (productsInCart[i].id == product.id) {
            productsInCart[i].count += 1;
            productsInCart[i].price = productsInCart[i].baseprice * productsInCart[i].count;
            return;
        }
    }
    productsInCart.push(product);
}

products.forEach(product => {
    product.addEventListener('click', (e) => {
        if (e.target.classList.contains('addToCart')) {
            const productID = e.target.dataset.productId;
            const productName = product.querySelector('.productName').innerHTML;
            const productPrice = product.querySelector('.priceValue').innerHTML;
            const productImg = product.querySelector('img').src;
            let productToCart = {
                name: productName,
                image: productImg,
                id: productID,
                count: 1,
                price: +productPrice,
                basePrice: +productPrice

            };
            updateProductsInCart(productToCart);
            updateShoppingCartHTML();

        };
    });
});

parentElenment.addEventListener('click', (e) => {
    const isPlus = e.target.classList.contains('button-plus');
    const isMinus = e.target.classList.contains('button-minus');
    if (isPlus || isMinus) {
        for (let i = 0; i < productsInCart.length; i++) {
            if (productsInCart[i].id === e.target.dataset.id) {
                if (isPlus) {
                    productsInCart[i].count += 1;
                }
                else if (isMinus) {
                    productsInCart[i].count -= 1;

                }
                productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
            }
            if (productsInCart[i].count <= 0) {
                productsInCart.splice(i, 1);
            }
        }
        updateShoppingCartHTML();
    }

})
updateShoppingCartHTML();