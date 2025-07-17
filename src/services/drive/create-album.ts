import request from '@utils/request';

export type CreateAlbumParams = {
    title: string;
    images: File[];
};

export const createAlbum = (params: CreateAlbumParams): Promise<void> => {
    const formData = new FormData();
    formData.append('title', params.title);

    params.images.forEach((file) => {
        formData.append('images', file);
    });

    return request({
        url: '/albums',
        method: 'post',
        data: formData,
    });
};
