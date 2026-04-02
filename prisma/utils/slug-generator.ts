export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")  // Remove special chars
    .replace(/[\s_-]+/g, "-")   // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, "");   // Remove leading/trailing hyphens
}

export function generateUniqueSlug(name: string, existingSlugs: Set<string>): string {
  let slug = generateSlug(name);
  let counter = 1;

  while (existingSlugs.has(slug)) {
    slug = `${generateSlug(name)}-${counter}`;
    counter++;
  }

  existingSlugs.add(slug);
  return slug;
}

export default generateSlug;
