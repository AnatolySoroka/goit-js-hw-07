import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');
const galleryMarkup = createGalleryItems(galleryItems);

function createGalleryItems(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
            <a class="gallery__item" href="${original}">
                <img 
                    loading="lazy"
                    class="gallery__image lazyload" 
                    data-src="${preview}" 
                    data-source="${original}"
                    alt="${description}" />
            </a>
        `
    }).join('');
}

galleryEl.innerHTML = galleryMarkup;


//Ініціалізуєм SimpleLightbox
let lightbox = new SimpleLightbox('.gallery a',
    {
        captionSelector: 'img',
        captionsData: 'alt',
        captionDelay: 250,
        captionPosition: 'bottom',
    });


//Підключаєм lazyload images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(image => {
        image.src = image.dataset.src;
    });
} else {
    const script = document.createElement('script');
    script.scr = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    script.integrity = 'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
    script.crossorigin = 'anonymous" referrerpolicy="no-referrer';

    document.body.appendChild(script);
}