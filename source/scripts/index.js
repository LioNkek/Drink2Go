/* в этот файл добавляет скрипты*/

// Убираем класс no-js, так как JavaScript загрузился и работает
document.documentElement.classList.remove('no-js');

/* Слайдер */
/* global Swiper */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Swiper !== 'undefined') {
    function updateSlideFocus(swiper) {
      const allSlides = Array.from(swiper.slides);

      const activeSlide = allSlides.find((slide) => slide.classList.contains('swiper-slide-active'));

      allSlides.forEach((slide) => {
        const isActive = slide === activeSlide;
        const focusable = slide.querySelectorAll('a, button');

        focusable.forEach((el) => {
          if (isActive) {
            el.removeAttribute('tabindex');
          } else {
            el.setAttribute('tabindex', '-1');
          }
        });
      });
    }
    // eslint-disable-next-line no-new
    new Swiper('.promo__slider', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      navigation: {
        nextEl: '.promo__arrow--next',
        prevEl: '.promo__arrow--prev',
      },
      pagination: {
        el: '.promo__pagination',
        clickable: true,
        renderBullet(index, className) {
          return `<button class="${className}" aria-label="Перейти к слайду ${index + 1}"></button>`;
        },
      },
      keyboard: {
        enabled: true,
      },
      a11y: {
        enabled: true,
        prevSlideMessage: 'Предыдущий слайд',
        nextSlideMessage: 'Следующий слайд',
        firstSlideMessage: 'Это первый слайд',
        lastSlideMessage: 'Это последний слайд',
        paginationBulletMessage: 'Перейти к слайду {{index}}',
      },
      on: {
        init(swiper) {
          updateSlideFocus(swiper);
        },
        slideChange(swiper) {
          updateSlideFocus(swiper);
        },
      },
    });
  }
});

/* Карта */
/* global L */

document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('map');

  if (mapContainer && typeof L !== 'undefined') {
    const fallback = mapContainer.querySelector('.map__fallback');

    if (fallback) {
      fallback.style.display = 'none';
    }

    const coords = [59.968358, 30.317494];
    const map = L.map('map').setView(coords, 16);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: 'images/map/marker.svg',
      iconSize: [38, 50],
      iconAnchor: [19, 50],
    });

    L.marker(coords, {icon: customIcon}).addTo(map);

    map.scrollWheelZoom.disable();
  }
});


/* Синхронизация ползунка цены, полей ввода и полоски */
document.addEventListener('DOMContentLoaded', () => {
  const rangeInput = document.querySelector('.filters__range-input');
  const priceInputs = document.querySelectorAll('.filters__input');

  if (rangeInput && priceInputs.length === 2) {
    const maxInput = priceInputs[1];

    const updateRangeBackground = () => {
      if (rangeInput.hasAttribute('disabled')) {
        rangeInput.style.background = '';
        return;
      }

      const min = Number(rangeInput.min) || 0;
      const max = Number(rangeInput.max) || 100;
      const value = Number(rangeInput.value);
      const percent = ((value - min) / (max - min)) * 100;

      rangeInput.style.background = `linear-gradient(to right, #7859cf ${percent}%, #e2e2e2 ${percent}%)`;
    };

    rangeInput.addEventListener('input', () => {
      maxInput.value = rangeInput.value;
      updateRangeBackground();
    });

    maxInput.addEventListener('input', () => {
      let value = Number(maxInput.value);
      const min = Number(rangeInput.min);
      const max = Number(rangeInput.max);
      if (value < min) {
        value = min;
      }
      if (value > max) {
        value = max;
      }

      rangeInput.value = value;
      updateRangeBackground();
    });

    setTimeout(updateRangeBackground, 0);
  }
});


/* Мобильное меню */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.page-header');
  const nav = document.querySelector('.main-nav');
  const burger = document.querySelector('.burger');

  if (header && nav && burger) {
    document.documentElement.classList.remove('no-js');

    nav.classList.add('main-nav--closed');
    burger.setAttribute('aria-expanded', 'false');

    burger.addEventListener('click', () => {
      const isClosed = nav.classList.contains('main-nav--closed');

      if (isClosed) {
        nav.classList.remove('main-nav--closed');
        burger.classList.add('burger--active');
        burger.setAttribute('aria-expanded', 'true');
        burger.setAttribute('aria-label', 'Закрыть меню');
      } else {
        nav.classList.add('main-nav--closed');
        burger.classList.remove('burger--active');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Открыть меню');
      }
    });

    nav.addEventListener('click', (e) => {
      if (e.target.closest('.main-nav__link')) {
        nav.classList.add('main-nav--closed');
        burger.classList.remove('burger--active');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Открыть меню');
      }
    });
  }
});
