type DriveApiEndpoints = {
    albums: string;
};

type DriveApiConfig = {
    baseUrl: string;
    endpoints: DriveApiEndpoints;
};

export const DriveApiConfig: DriveApiConfig = {
    baseUrl: import.meta.env.VITE_API_URL,
    endpoints: {
        albums: '/albums',
    },
};
