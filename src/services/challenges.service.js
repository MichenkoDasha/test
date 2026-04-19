import { test } from '../../src/helpers/fixtures/fixture';
const urlApi = 'https://apichallenges.eviltester.com';

export class ChallengesService {
  constructor(request) {
    this.request = request;
  }
  async get(token) {

    return test.step('GET /challenges', async () => {
      const response = await this.request.get(`${urlApi}/challenges`,
        {
          headers: {
            'X-CHALLENGER': token
          }
        }
      );
      const headers = response.headers();
      const r = await response.json();
      const link = `${urlApi}${headers.location}`;
      console.log(link);
      return r;
    })
  };
};

