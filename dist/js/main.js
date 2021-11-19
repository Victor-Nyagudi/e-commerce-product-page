const body = document.querySelector('body');

const hamburgerButton = document.querySelector('.navbar__button--hamburger');
const mobileMenu = document.querySelector('.navbar__links--primary');
const closeButtonMobile = document.querySelector('.close-menu-button');

const cartButton = document.querySelector('.navbar__button--cart');
const cartCheckoutButton = document.querySelector('.cart__checkout');

const cart = document.querySelector('.cart');
const cartEmptyMessage = document.querySelector('.cart__empty-message');

const cartItemsNotification = document.querySelector('.items-in-cart-notification');
let totalItemsInCart = parseInt(cartItemsNotification.textContent);

const cartItemsList = document.querySelector('.cart__items');

const defaultCounterValue = document.querySelector('.item-counter__value');
let modifiedCounterValue = parseInt(defaultCounterValue.textContent);

const minusButton = document.querySelector('.item-counter__button--minus');
const plusButton = document.querySelector('.item-counter__button--plus');
const addToCartButton = document.querySelector('.add-to-cart');

const imageArea = document.querySelector('.sneakers');
const mainImage = document.getElementsByClassName('main-image-container')[0];
const previewImages = document.getElementsByClassName('images__preview');

const lightbox = document.querySelector('.images--lightbox');
const lightboxMainImage = document.querySelector('.main-image-container--lightbox')
const closeLightboxButton = document.querySelector('.lightbox-close');

const previousImageButton = document.querySelector('.main-image-button--previouus');
const nextImageButton = document.querySelector('.main-image-button--next');

let price = document.querySelector('.info__price--final');
price = parseInt(price.textContent);

hamburgerButton.onclick = function() {
    mobileMenu.classList.add('open');
    body.classList.add('menu-open');
}

closeButtonMobile.onclick = function() {
    mobileMenu.classList.remove('open');
    body.classList.remove('menu-open');
}

cartButton.onclick = function() {
    cart.classList.toggle('open');
}

minusButton.onclick = function() {
    if (modifiedCounterValue > 0) {
        modifiedCounterValue--;
        
        defaultCounterValue.textContent = `${modifiedCounterValue}`;
    }
}

plusButton.onclick = function() {
    if (modifiedCounterValue < 25) {
        modifiedCounterValue++;
        
        defaultCounterValue.textContent = `${modifiedCounterValue}`;
    }
}

addToCartButton.onclick = function() {
    if (modifiedCounterValue != 0) {

        cartItemsNotification.classList.add('open');
        cartCheckoutButton.classList.add('open');
        cartEmptyMessage.style.display = 'none';
        
        totalItemsInCart += modifiedCounterValue;
        cartItemsNotification.textContent = `${totalItemsInCart}`;

        const item = `
            <li class="cart__item">
                <div class="item-picture">
                    <img src="./dist/images/image-product-1-thumbnail.jpg" alt="white and brown sneakers" class="cart__image">
                </div>
                
                <div class="item-info">
                    <p class="item-info__name">
                        Fall Limited Edition Sneakers
                    </p>
                    
                    <p class="item-info__pricing">
                        $${price}.00 x <span class="number-of-items">${modifiedCounterValue}</span> 
                    </p>
                    
                    <span class="item-info__price">
                        $${price * modifiedCounterValue}.00
                    </span>
                </div>
                    
                <div class="item-delete">
                    <button type="button" class="btn delete-item-button">
                        <img src="./dist/images/icon-delete.svg" alt="delete item option" class="delete-icon">
                    </button>
                </div>
            </li>
        `;
        
        cartItemsList.innerHTML += item;

        modifiedCounterValue = 0;
        defaultCounterValue.textContent = `${modifiedCounterValue}`;
    }
}

cartItemsList.addEventListener('click', e => {
    if (e.target.classList.contains('delete-icon')) {
        const item = e.target.closest('.cart__item');
        const itemInfo = item.children[1];

        const pricing = itemInfo.children[1];
        const numberOfItemsPicked = parseInt(pricing.firstElementChild.textContent);

        totalItemsInCart -= numberOfItemsPicked;
        cartItemsNotification.textContent = `${totalItemsInCart}`

        item.remove();
    }
    
    if (cartItemsList.childElementCount === 0) {
        cartItemsNotification.classList.remove('open');
        cartCheckoutButton.classList.remove('open');
        
        cartEmptyMessage.style.display = 'flex';
    }
});

let counter = 2;

imageArea.addEventListener('click', e => {
    if (e.target.classList.contains('main-image-container') && body.offsetWidth >= 900) {
        lightbox.classList.add('open');
        body.classList.add('menu-open');   
    }

    for (let i = 0; i < previewImages.length; i++) {
        if (e.target.classList.contains(`images__preview--${i + 1}`))        
            mainImage.style.backgroundImage = `url('./dist/images/image-product-${i + 1}.jpg')`;

        if (e.target.classList.contains(`images__preview--lightbox-${i + 1}`))
            lightboxMainImage.style.backgroundImage = `url('./dist/images/image-product-${i + 1}.jpg')`;
    }


    if (e.target.classList.contains('main-image-button--next')) {
        if (counter <= 4 && body.offsetWidth >=  900) {
            lightboxMainImage.style.backgroundImage = `url('./dist/images/image-product-${counter}.jpg')`;
            
            counter++;
        }
        
        else if (counter <= 4) {
            mainImage.style.backgroundImage = `url('./dist/images/image-product-${counter}.jpg')`;

            counter++;
        }
    }

    else if (e.target.classList.contains('main-image-button--previous')) {
        if (counter <= 5 && counter > 2 && body.offsetWidth >= 900) {
            counter--;
            
            lightboxMainImage.style.backgroundImage = `url('./dist/images/image-product-${counter - 1}.jpg')`;    
        }

        else if (counter <= 5 && counter > 2) {
            counter--;
            
            mainImage.style.backgroundImage = `url('./dist/images/image-product-${counter - 1}.jpg')`; 
        }
    }

});

closeLightboxButton.onclick = function() {
    lightbox.classList.remove('open');
    body.classList.remove('menu-open');
}