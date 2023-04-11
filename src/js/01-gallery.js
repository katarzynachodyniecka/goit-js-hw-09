import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from "./gallery-items";

// Change code below this line

const galleryEl = document.querySelector(".gallery");

galleryEl.innerHTML = "";
for (const img of galleryItems) {
  const newImage = `<a class="gallery__link" href="${img.original}">
<img
  class="gallery__image"
  src="${img.preview}"
  data-source="${img.original}"
  alt="${img.description}"
/>
</a>`;
  galleryEl.innerHTML += newImage;
}

const lightBox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionPosition: "outside",
  captionDelay: 200,
});
