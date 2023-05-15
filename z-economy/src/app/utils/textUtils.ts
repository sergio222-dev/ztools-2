export const chunkify = (string: string) => {
  const regex = /(\d+)|(\D+)/g;
  return string.match(regex) || [];
};

export const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
