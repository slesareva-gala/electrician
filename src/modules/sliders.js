import Swiper from 'swiper'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const sliders = () => {

    const topSlider = new Swiper('.top-slider', {
        modules: [Autoplay, Pagination],
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 3000,
        },
        pagination: {
            el: ".swiper-pagination",
        },
    });

    new Swiper('.services-elements', {
        modules: [Navigation],
        slidesPerView: "auto",
        loop: true,
        navigation: {
            nextEl: '.arrow-right',
            prevEl: '.arrow-left',
        },
    });


    if (topSlider) topSlider.el.addEventListener('click', (e) => {
        if (e.target.closest('.swiper-pagination-bullet')) return

        if (topSlider.autoplay.running) {
            topSlider.autoplay.stop()
        } else {
            topSlider.autoplay.start()
        }
    })

}
export default sliders