import Api from './Api';

export default class NestApi extends Api {
  constructor() {
    let endpoint = '';

    if (process.env.NODE_ENV === 'production') {
      endpoint = 'https://us-central1-read-help-platform.cloudfunctions.net/api';
    } else {
      const { location } = window;
      endpoint = `${location.protocol}//${location.hostname}:3000`;
    }
    super(endpoint);
  }
}
