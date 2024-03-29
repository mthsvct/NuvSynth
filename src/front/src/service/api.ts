import axios, { AxiosError } from 'axios';

export function setupAPIClient() {
    const api = axios.create({
        baseURL: 'http://localhost:8080',
    });
    return api;
}

export const api = setupAPIClient();

