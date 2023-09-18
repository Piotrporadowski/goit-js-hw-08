'use strict'; 
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items.js';

console.log(galleryItems);

const galleryList = document.querySelector('.gallery');

const galleryElements = galleryItems
  .map(item => {
    return `<li class="gallery__item">
     <a class="gallery__link" href="${item.original}">
       <img
        class="gallery__image"
         src="${item.preview}"
         data-source="${item.original}"
         alt="${item.description}"
       />
     </a>
   </li>`;
  })
  .join('');

galleryList.innerHTML = galleryElements;

const lightbox = new SimpleLightbox('.gallery a', {
    captionSelector: 'img',
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
});
