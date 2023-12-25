export const formatDate = (date: string, lang: string) => {
  let locale;
  if (lang === 'EN') {
    locale = 'en-US';
  } else {
    // Default to 'fr-FR' if lang is not 'EN'
    locale = 'fr-FR';
  }

  return new Date(date).toLocaleString(locale, {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}