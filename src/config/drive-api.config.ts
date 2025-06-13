type DriveApiEndpoints = {
    albums: string;
};

type DriveApiConfig = {
    baseUrl: string;
    endpoints: DriveApiEndpoints;
    maxFileSizeInMB: number;
    allowedFileTypes: string[];
};

export const DriveApiConfig: DriveApiConfig = {
    baseUrl: import.meta.env.VITE_API_URL,
    endpoints: {
        albums: '/albums',
    },
    maxFileSizeInMB: 10,
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
};
