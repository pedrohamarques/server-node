export function slugify(str: string): string {
    // Remove accents
    const withoutAccents = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Replace symbols and spaces with dashes
    const slug = withoutAccents.replace(/[^a-zA-Z0-9]/g, "-");

    // Remove leading and trailing dashes
    return slug.replace(/^-+|-+$/g, "").toLowerCase();
}
