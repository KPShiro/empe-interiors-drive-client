export function formatDateTime(
    date: Date | string | number,
    locale?: string,
    options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }
): string {
    const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
    const resolvedLocale =
        locale || (typeof navigator !== 'undefined' && navigator.language) || 'en-US';
    return new Intl.DateTimeFormat(resolvedLocale, options).format(d);
}
