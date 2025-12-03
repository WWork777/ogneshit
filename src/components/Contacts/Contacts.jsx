'use client';
import { useEffect, useRef } from 'react';
import './Contacts.scss';
import Link from 'next/link';

export default function Contacts() {
  const mapRef = useRef(null);
  const timeoutRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const loadYandexMap = () => {
      if (window.ymaps && mapRef.current) {
        window.ymaps.ready(() => {
          // Проверяем еще раз, что mapRef.current существует
          if (!mapRef.current) return;

          // Точные координаты офиса СПО Огнещит
          const coordinates = [55.087675, 82.975728];

          const map = new window.ymaps.Map(mapRef.current, {
            center: coordinates,
            zoom: 17,
            // ОТКЛЮЧАЕМ ВСЕ ЛИШНИЕ ЭЛЕМЕНТЫ
            controls: [], // ← пустой массив = никаких элементов управления
            behaviors: ['default', 'scrollZoom'], // оставляем только базовое поведение
            type: 'yandex#map', // обычная схема без лишнего
          });

          // Сохраняем ссылку на карту
          mapInstanceRef.current = map;

          // Создаем кастомный маркер
          const marker = new window.ymaps.Placemark(
            coordinates,
            {
              hintContent: 'СПО Огнещит',
              balloonContent: `
                <div style="padding: 10px;">
                  <strong>СПО «ОГНЕЩИТ»®</strong><br/>
                  630110, г. Новосибирск,<br/>
                  ул. Богдана Хмельницкого 90/3
                </div>
              `,
            },
            {
              // Простой красный маркер
              preset: 'islands#redIcon',
              iconColor: '#000',
            }
          );

          map.geoObjects.add(marker);

          // ДОПОЛНИТЕЛЬНО: отключаем рекламу и другие элементы
          // Очищаем предыдущий таймер, если он был
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          timeoutRef.current = setTimeout(() => {
            // Проверяем, что mapRef.current существует перед использованием
            if (!mapRef.current || !mapInstanceRef.current) return;

            // Убираем рекламу и копирайты если они есть
            const copyrights = mapRef.current.querySelectorAll(
              '.ymaps-2-1-79-copyrights-pane, .ymaps-2-1-79-copyright'
            );
            copyrights.forEach((el) => (el.style.display = 'none'));

            const ads = mapRef.current.querySelectorAll("[class*='ads']");
            ads.forEach((el) => (el.style.display = 'none'));

            // Проверяем, что карта все еще существует
            const map = mapInstanceRef.current;
            if (map && typeof map.getCenter === 'function') {
              try {
                const currentCenter = map.getCenter();
                // Смещаем на 0.0015 по долготе для сдвига вправо
                const newCenter = [currentCenter[0], currentCenter[1]];
                map.setCenter(newCenter, 17, { duration: 300 });
              } catch (error) {
                console.error('Error setting map center:', error);
              }
            }
          }, 1000);
        });
      }
    };

    // Проверяем, есть ли уже скрипт Yandex Maps в документе
    const existingScript = document.querySelector(
      'script[src*="api-maps.yandex.ru"]'
    );

    let checkInterval = null;

    if (window.ymaps) {
      // Если API уже загружен, сразу инициализируем карту
      loadYandexMap();
    } else if (existingScript) {
      // Если скрипт уже есть, но API еще не загружен, ждем его загрузки
      existingScript.addEventListener('load', loadYandexMap);
      // Проверяем, не загрузился ли API за время между проверками
      checkInterval = setInterval(() => {
        if (window.ymaps) {
          clearInterval(checkInterval);
          loadYandexMap();
        }
      }, 100);
    } else {
      // Если скрипта нет, создаем и добавляем его
      const script = document.createElement('script');
      script.src =
        'https://api-maps.yandex.ru/2.1/?apikey=2a907ab4-e930-4aca-9ebb-13d8e04a56a5&lang=ru_RU';
      script.async = true;
      script.id = 'yandex-maps-script'; // Добавляем ID для удобства
      script.onload = loadYandexMap;
      document.head.appendChild(script);
    }

    // Очистка при размонтировании компонента
    return () => {
      // Очищаем таймер
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      // Очищаем интервал проверки
      if (checkInterval) {
        clearInterval(checkInterval);
      }
      // Удаляем обработчик события, если он был добавлен
      if (existingScript) {
        existingScript.removeEventListener('load', loadYandexMap);
      }
      // Очищаем ссылку на карту
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div id='contacts' className='map-container'>
      <div className='map-contacts'>
        <h2>Контакты</h2>
        <div className='map-all-contacts'>
          <div className='map-contact-adress'>
            <h4>Адрес:</h4>
            <span>
              630110, г. Новосибирск, ул. Богдана
              <br />
              Хмельницкого 90/3
            </span>
          </div>
          <div className='map-other-contacts'>
            <h4>Мы на связи</h4>
            <a href='mailto:zakaz@ogneshit.ru'>zakaz@ogneshit.ru</a>
            <a href='tel:+78003339591'>+7 (800) 333-95-91</a>
            <a href='tel:+73832898058'>+7 (383) 28-98-058</a>
            {/* Закомментировано для будущего возврата */}
            {/* <div className='map-contacts-messages'>
              <Link href={'#'}>
                <div className='map-contact-message'>
                  <span>Whatsapp</span>
                  <svg
                    width='29'
                    height='29'
                    viewBox='0 0 29 29'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g clipPath='url(#clip0_321_344)'>
                      <path
                        d='M0 29L1.98418 21.553C0.759799 19.3732 0.11644 16.9022 0.117616 14.3683C0.121144 6.44646 6.39596 0 14.1057 0C17.847 0.00120833 21.3591 1.49833 24.0007 4.21467C26.6412 6.931 28.0949 10.5415 28.0938 14.3816C28.0902 22.3046 21.8154 28.7511 14.1057 28.7511C11.7651 28.7499 9.45868 28.1469 7.41569 27.0014L0 29ZM7.75912 24.3999C9.73037 25.6022 11.6122 26.3223 14.101 26.3235C20.5087 26.3235 25.7285 20.9658 25.732 14.3792C25.7344 7.77925 20.5393 2.42875 14.1104 2.42633C7.69796 2.42633 2.4817 7.78408 2.47934 14.3695C2.47817 17.058 3.24502 19.0711 4.53292 21.1772L3.35794 25.5853L7.75912 24.3999ZM21.1521 17.7975C21.065 17.6477 20.8321 17.5583 20.4816 17.3783C20.1323 17.1982 18.414 16.3294 18.0929 16.2098C17.7729 16.0902 17.5401 16.0298 17.306 16.3898C17.0731 16.7487 16.4027 17.5583 16.1992 17.7975C15.9958 18.0368 15.7911 18.067 15.4418 17.887C15.0925 17.7069 13.9657 17.3287 12.6308 16.1047C11.5922 15.1525 10.8901 13.9768 10.6866 13.6167C10.4831 13.2578 10.6654 13.0633 10.8395 12.8845C10.9971 12.7238 11.1888 12.4652 11.3641 12.2549C11.5417 12.0471 11.5993 11.8973 11.7169 11.6568C11.8333 11.4175 11.7757 11.2073 11.6875 11.0273C11.5993 10.8484 10.9006 9.08063 10.6101 8.36167C10.3255 7.66204 10.0373 7.75629 9.82329 7.74542L9.15287 7.73333C8.91999 7.73333 8.54127 7.82275 8.22136 8.18283C7.90144 8.54292 6.99815 9.4105 6.99815 11.1783C6.99815 12.9461 8.25076 14.6535 8.42483 14.8927C8.60008 15.132 10.8889 18.7594 14.395 20.3145C15.2289 20.6843 15.8805 20.9054 16.3874 21.0709C17.2249 21.344 17.987 21.3053 18.5892 21.2135C19.2608 21.1108 20.6569 20.3447 20.9486 19.5061C21.2403 18.6663 21.2403 17.9474 21.1521 17.7975Z'
                        fill='#09CD51'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_321_344'>
                        <rect width='29' height='29' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </Link>
              <Link href={'#'}>
                <div className='map-contact-message'>
                  <span>Telegram</span>
                  <svg
                    width='29'
                    height='29'
                    viewBox='0 0 29 29'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g clipPath='url(#clip0_321_343)'>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M29 14.5C29 22.5081 22.5081 29 14.5 29C6.49187 29 0 22.5081 0 14.5C0 6.49187 6.49187 0 14.5 0C22.5081 0 29 6.49187 29 14.5ZM15.0196 10.7045C13.6093 11.2911 10.7906 12.5053 6.56354 14.3469C5.87713 14.6199 5.51756 14.8869 5.48483 15.148C5.42951 15.5893 5.98211 15.7631 6.73461 15.9997C6.83697 16.0319 6.94303 16.0652 7.05176 16.1006C7.7921 16.3412 8.788 16.6228 9.30572 16.634C9.77535 16.6441 10.2995 16.4505 10.8782 16.0531C14.8277 13.3871 16.8664 12.0396 16.9944 12.0106C17.0847 11.9901 17.2098 11.9643 17.2946 12.0396C17.3794 12.115 17.371 12.2577 17.3621 12.296C17.3073 12.5294 15.1382 14.546 14.0156 15.5896C13.6657 15.915 13.4174 16.1458 13.3667 16.1985C13.253 16.3165 13.1372 16.4282 13.0258 16.5356C12.338 17.1986 11.8222 17.6958 13.0544 18.5078C13.6465 18.898 14.1203 19.2206 14.593 19.5426C15.1092 19.8941 15.6241 20.2447 16.2903 20.6814C16.46 20.7927 16.6221 20.9082 16.78 21.0208C17.3808 21.4491 17.9205 21.8339 18.5873 21.7725C18.9748 21.7369 19.375 21.3725 19.5782 20.2859C20.0586 17.718 21.0028 12.154 21.221 9.86118C21.2401 9.6603 21.2161 9.40321 21.1968 9.29036C21.1775 9.17751 21.1371 9.01671 20.9904 8.89768C20.8167 8.75672 20.5485 8.72699 20.4285 8.7291C19.8832 8.73871 19.0464 9.02965 15.0196 10.7045Z'
                        fill='#2AABEE'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_321_343'>
                        <rect width='29' height='29' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
      <div ref={mapRef} className='map' />
    </div>
  );
}
