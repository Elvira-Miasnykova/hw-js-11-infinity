import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import PixabayApi from './js/fetchGallery';
import { galleryItemsMarkup } from './js/galleryItemsMarkup';
import './js/btnUp';

const refs = {
    searchForm: document.querySelector('.search-form'),
    searchInput: document.querySelector('input[name="searchQuery"]'),
    galleryEl: document.querySelector('.gallery'),
    target: document.querySelector('.js-guard'),
}

const PixabayApiService = new PixabayApi();

refs.searchForm.addEventListener('submit', onSearch);
const lightbox = new SimpleLightbox('.photo-card a');

let searchQuery = '';

function onSearch(e) {
    e.preventDefault();
    PixabayApiService.searchQuery = refs.searchInput.value.trim();
        if (PixabayApiService.searchQuery === "") {
            Notify.failure("Sorry, this field must be filled");
            return;
        }
    refs.galleryEl.innerHTML = "";
    PixabayApiService.resetPage();
    //console.log(PixabayApiService.searchQuery);
    PixabayApiService.fetchGallery().then(({ data }) => {
        //console.log(data.hits);
        if (data.hits.length === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        }
        if (data.hits.length < PixabayApiService.perPage) {
            Notify.info(`Hooray! We found ${data.totalHits} images.`);
            appendGalleryItemsMarkup(data.hits);
            lightbox.refresh();
            return;
        }
        Notify.info(`Hooray! We found ${data.totalHits} images.`);
            appendGalleryItemsMarkup(data.hits);
            observer.observe(refs.target);
            lightbox.refresh();
            PixabayApiService.incrementPage();
            
    }).catch((error => console.log(error)));
};

const options = {
        root: null,
        rootMargin: '200px',
        threshold: 1.0
    };
        
    
let observer = new IntersectionObserver(onLoad, options);

function onLoad (entries, observer){
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            PixabayApiService.fetchGallery().then(({ data }) => {
                appendGalleryItemsMarkup(data.hits);
                lightbox.refresh();
                PixabayApiService.incrementPage();
                if (PixabayApiService.page === data.totalHits) {
                    observer.unobserve(refs.target);
                    return Notify.failure(`We're sorry, but you've reached the end of search results.`);
                }

                const { height: cardHeight } = refs.galleryEl.firstElementChild.getBoundingClientRect();
                window.scrollBy({
                top: cardHeight * 2,
                behavior: "smooth",
        });
            }).catch((error) => console.log(error));
    
            return;
}
    })
};

function appendGalleryItemsMarkup(images) {
    refs.galleryEl.insertAdjacentHTML('beforeend', galleryItemsMarkup(images));
}

// window.addEventListener('scroll', () => {
//     const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
//     console.log({ scrollTop, scrollHeight, clientHeight });
    

//     if (clientHeight + scrollTop >= scrollHeight - 5) {
//         console.log('to the bottom');
        
//     }
// });