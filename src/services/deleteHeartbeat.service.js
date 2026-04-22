import { test } from '../helpers/fixtures/fixture';
const urlApi = 'https://apichallenges.eviltester.com';

export class DeleteHeartbeatService {
  constructor(request) {
    this.request = request;
  }
  async delete(token) {

    return test.step('DELETE /heartbeat', async () => {
      const response = await this.request.delete(`${urlApi}/heartbeat`,
        {
          headers: {
            'X-CHALLENGER': token
          }
        }
      );
      const headers = response.headers();
      const r = await response;
      const link = `${urlApi}/gui/challenges/${token}`;
      console.log(link);
      return r;
    })
  };
};