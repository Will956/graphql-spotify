import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

export default class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1/';
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getMe() {
    return this.get('me');
  }
}
