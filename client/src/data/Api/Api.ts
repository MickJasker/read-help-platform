import axios, { AxiosResponse } from 'axios';

export default class Api {
  protected httpService = axios;

  public endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  protected async post(data: unknown, path?: string): Promise<AxiosResponse> {
    if (path) {
      return this.httpService.post(`${this.endpoint}/${path}`, data);
    }

    return this.httpService.post(this.endpoint, data);
  }

  protected async get(path?: string): Promise<AxiosResponse> {
    if (path) {
      return this.httpService.get(`${this.endpoint}/${path}`);
    }

    return this.httpService.get(this.endpoint);
  }
}
