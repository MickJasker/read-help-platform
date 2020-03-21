import axios from 'axios';

export default class Api {
  protected httpService = axios;

  public endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
}
