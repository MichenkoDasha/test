import { test } from '../helpers/fixtures/fixture';
const urlApi = 'https://apichallenges.eviltester.com';

export class PatchHeartbeatService {
  constructor(request) {
    this.request = request;
  }
  async patch(token) {

    return test.step('PATCH /heartbeat', async () => {
      const response = await this.request.patch(`${urlApi}/heartbeat`,
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