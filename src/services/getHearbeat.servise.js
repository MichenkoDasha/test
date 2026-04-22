import { test } from '../helpers/fixtures/fixture';
const urlApi = 'https://apichallenges.eviltester.com';

export class GetHeartbeatService {
  constructor(request) {
    this.request = request;
  }
  async get(token) {

    return test.step('PATCH /heartbeat', async () => {
      const response = await this.request.get(`${urlApi}/heartbeat`,
        {
          headers: {
            'X-CHALLENGER': token
          }
        }
      );
      const r = await response;
      const link = `${urlApi}/gui/challenges/${token}`;
      console.log(link);
      return r;
    })
  };
};