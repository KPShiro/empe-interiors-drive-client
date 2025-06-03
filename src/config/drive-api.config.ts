type DriveApiEndpoints = {
    albums: string;
};

type DriveApiConfig = {
    baseUrl: string;
    endpoints: DriveApiEndpoints;
};

export const DriveApiConfig: DriveApiConfig = {
    baseUrl: 'http://localhost:3000/api',
    endpoints: {
        albums: '/albums',
    },
};
