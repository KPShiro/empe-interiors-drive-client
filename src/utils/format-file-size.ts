export function formatFileSize(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    const size = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));
    return `${String(size)} ${units[i]}`;
}
