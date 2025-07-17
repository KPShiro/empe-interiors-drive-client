import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { DriveApiClient } from '@services/drive';

function request<TResponseData = unknown, TRequestPayload = unknown>(
    config: AxiosRequestConfig<TRequestPayload>
): Promise<TResponseData> {
    const onSuccess = (response: AxiosResponse<TResponseData>): Promise<TResponseData> => {
        return Promise.resolve(response.data);
    };

    const onError = (error: AxiosError): Promise<never> => {
        console.error('Request Error:', error.message, error.response?.data);
        return Promise.reject(new Error(error.message));
    };

    // TODO: Client here has to be generic, not specific for DriveApi
    return DriveApiClient(config).then(onSuccess).catch(onError);
}

export default request;
