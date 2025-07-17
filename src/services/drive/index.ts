import axios from 'axios';

import { createAlbum } from './create-album';
import { deleteAlbum } from './delete-album';
import { getAlbum } from './get-album';
import { getAlbums } from './get-albums';
import { reorderImages } from './reorder-images';
import { updateAlbum } from './update-album';

export const DriveApiClient = axios.create({
    baseURL: import.meta.env.VITE_DRIVE_SERVICE_URL,
    headers: {
        Accept: 'application/json, text/plain, */*',
    },
    timeout: 10_000,
});

export const MAX_FILE_SIZE_IN_MEGABYTES = 10;
export const MAX_FILE_SIZE_IN_BYTES: number = MAX_FILE_SIZE_IN_MEGABYTES * 1024 * 1024;

export const MIN_FILES_PER_ALBUM: number = 1;
export const MAX_FILES_PER_ALBUM: number = 100;

export const ALLOWED_FILE_TYPES: string[] = ['image/*'];

export const DriveService = {
    createAlbum,
    deleteAlbum,
    getAlbum,
    getAlbums,
    reorderImages,
    updateAlbum,
};
