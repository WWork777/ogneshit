// Данные о подразделах светопрозрачных конструкций
export const translucentStructuresSubsections = [
  {
    id: 1,
    title: 'Светопрозрачные витражи (фасады)',
    slug: 'svetoprozrachnye-vitrazhi-fasady',
    image:
      '/images/Directions/TranslucentStructures/svetoprozrachnie-vitrazhi.webp', // Временное изображение, пользователь добавит позже
    category: 'Светопрозрачные конструкции',
  },
  {
    id: 2,
    title: 'Пространственные самонесущие светопрозрачные конструкции',
    slug: 'prostranstvennye-samonesushchie-svetoprozrachnye-konstrukcii',
    image:
      '/images/Directions/TranslucentStructures/prostranstvennie-samonesushie-svetoprozrachnie-konstrukcii.webp',
    category: 'Светопрозрачные конструкции',
  },
  {
    id: 3,
    title: 'Спайдерное остекление',
    slug: 'spajdernoe-osteklenie',
    image: '/images/Directions/TranslucentStructures/spider.webp',
    category: 'Светопрозрачные конструкции',
  },
  {
    id: 4,
    title: 'Системы перегородок',
    slug: 'sistemy-peregorodok',
    image: '/images/Directions/TranslucentStructures/sistema-peregorodok.webp',
    category: 'Светопрозрачные конструкции',
  },
  {
    id: 5,
    title: 'Светопрозрачные ограждения',
    slug: 'svetoprozrachnye-ograzhdeniya',
    image:
      '/images/Directions/TranslucentStructures/svetoprozrachnie-ograzhdenia.webp',
    category: 'Светопрозрачные конструкции',
  },
  {
    id: 6,
    title: 'Противопожарное остекление',
    slug: 'protivopozharnoe-osteklenie',
    image:
      '/images/Directions/TranslucentStructures/protivopozharnoe-osteklenie.webp',
    category: 'Светопрозрачные конструкции',
  },
  {
    id: 7,
    title: 'Легкосбрасываемые конструкции',
    slug: 'legkosbrosyvaemye-konstrukcii',
    image:
      '/images/Directions/TranslucentStructures/legkosbrasivaemie-konstrukcii.webp',
    category: 'Светопрозрачные конструкции',
  },
  {
    id: 8,
    title: 'Стекло с электрообогревом',
    slug: 'steklo-s-elektroobogrevom',
    image:
      '/images/Directions/TranslucentStructures/steklo-s-electroobogrevom.webp',
    category: 'Светопрозрачные конструкции',
  },
];

// Функция для получения подраздела по slug
export function getTranslucentSubsectionBySlug(slug) {
  return translucentStructuresSubsections.find(
    (subsection) => subsection.slug === slug
  );
}

// Получить все подразделы светопрозрачных конструкций
export function getAllTranslucentSubsections() {
  return translucentStructuresSubsections;
}
