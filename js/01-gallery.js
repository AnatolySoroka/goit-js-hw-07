import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryEl = document.querySelector('.gallery');
const galleryMarkup = createGalleryItems(galleryItems);

function createGalleryItems(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
        <div class="gallery__item">
            <a class="gallery__link" href="large-image.jpg">
                 <img
                    loading="lazy"
                    class="gallery__image lazyload"
                    data-src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </div>
        `
    }).join('');
}

galleryEl.innerHTML = galleryMarkup;

galleryEl.addEventListener('click', onClick);

function onClick(event) {
    //Відміняєм стандартну поведінку браузера
    event.preventDefault();

    //Перевіряєм чи натискаєм саме на картинку
    if (event.target.nodeName !== 'IMG') {
        return;
    }

    //Відкриваєм модальне вікно
    const instance = basicLightbox.create(`
        <img src="${event.target.dataset.source}" width="800" height="600">
    `);
    instance.show();

    //Закриваєм модальне вікно при натисканні клавіші Esc
    window.addEventListener('keydown', (event) => {
        if (event.code === 'Escape') {
            instance.close();
        }
    }, { once: true })
};


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

