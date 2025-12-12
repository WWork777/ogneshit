// Данные видео с объектов
// Видео должны быть загружены в папку public/videos/
// Поддерживаемые форматы: .mp4, .webm, .ogg
// Рекомендуется использовать .mp4 для лучшей совместимости
export const videosData = [
  {
    id: 1,
    title: 'Международный аэропорт',
    videoUrl: '/videos/emelianovov-airport.mp4', // Путь к локальному видео файлу
    thumbnail: '/images/Projects/krasnoyarsk-airport.webp', // Превью/обложка видео
    city: 'Красноярск',
    country: 'Россия',
  },
  {
    id: 2,
    title: 'Фонд Назарбаева',
    videoUrl: '/videos/fond.mp4',
    thumbnail: '/images/Projects/almaty-fond-nazarbaev.webp',
    city: 'Алматы',
    country: 'Казахстан',
  },
  {
    id: 3,
    title: 'Административное здание Казахмыс',
    videoUrl: '/videos/kazyhmis.mp4',
    thumbnail: '/images/Projects/almaty-kazakhmys.webp',
    city: 'Алматы',
    country: 'Казахстан',
  },
];

// Получить все видео
export function getAllVideos() {
  return videosData;
}

// Получить видео по ID
export function getVideoById(id) {
  return videosData.find((video) => video.id === id);
}
