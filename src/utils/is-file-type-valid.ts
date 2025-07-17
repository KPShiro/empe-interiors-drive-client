/**
 * Validates if a given File object matches the accepted types/extensions string.
 *
 * @param file The File object to validate.
 * @param acceptString A string representing accepted file types, e.g., 'image/*, .png, image/jpeg'.
 * Supports exact MIME types, general MIME types (e.g., 'image/*'),
 * and file extensions (e.g., '.png').
 * @returns True if the file type is valid, false otherwise.
 */
export const isFileTypeValid = (file: File, acceptString: string): boolean => {
    if (!acceptString) {
        return true;
    }

    const acceptedTypes = acceptString
        .split(',')
        .map((type) => type.trim())
        .filter((type) => type.length > 0);

    if (acceptedTypes.length === 0) {
        return true;
    }

    const isValid = acceptedTypes.some((acceptedType) => {
        if (acceptedType.includes('/')) {
            if (acceptedType.endsWith('/*')) {
                const [generalType] = acceptedType.split('/');
                return file.type.startsWith(`${generalType}/`);
            }

            return acceptedType === file.type;
        } else if (acceptedType.startsWith('.')) {
            const fileExtension = '.' + String(file.name.split('.').pop());
            return acceptedType.toLowerCase() === fileExtension.toLowerCase();
        }

        return false;
    });

    return isValid;
};
