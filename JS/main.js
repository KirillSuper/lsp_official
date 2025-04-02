import { initScrollToTop } from './scroll.js';
import { initBackground } from './background.js';
import { initLyrics } from './lyrics.js';
import { initSwiper } from './swiper.js';
import { initHeaderScroll } from './header.js';
import { initSearch } from './search.js';

document.addEventListener('DOMContentLoaded', () => {
    initScrollToTop();
    initBackground();
    initLyrics();
    initSwiper();
    initHeaderScroll();
    initSearch();
});