export function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Normalizes strings, removes diacritics
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Replace spaces with -
    .replace(/\s+/g, '-')
    // Remove all non-word chars
    .replace(/[^\w-]+/g, '')
    // Replace multiple - with single -
    .replace(/--+/g, '-')
    // Trim - from start of text
    .replace(/^-+/, '')
    // Trim - from end of text
    .replace(/-+$/, '');
}
