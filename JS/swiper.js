// Инициализация Swiper
function initSwiper() {
    const swiperContainer = document.querySelector('.carousel-gallery .swiper-container');
    if (!swiperContainer) {
        console.error('Swiper container not found!');
        return;
    }

    const swiper = new Swiper('.carousel-gallery .swiper-container', {
        effect: 'slide',
        speed: 900,
        slidesPerView: 5,
        spaceBetween: 20,
        loop: true,
        simulateTouch: true,
        autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 5
            },
            765: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            1125: {
                slidesPerView: 3,
                spaceBetween: 10    
            },
            1400: {
                slidesPerView: 4,
                spaceBetween: 20
            }
        }
    });

    console.log('Swiper initialized:', swiper);
    swiper.autoplay.start();
}

// Экспортируем функцию
export { initSwiper };