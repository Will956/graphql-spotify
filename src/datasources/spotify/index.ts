import { RESTDataSource } from 'apollo-datasource-rest'

export default class SpotifyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spotify.com/v1/';
  }

  async getMe() {
    return this.get('me');
  }
}