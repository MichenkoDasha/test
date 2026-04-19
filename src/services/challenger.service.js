//todo
const urlApi = 'https://apichallenges.eviltester.com/';
import { test } from '../../src/helpers/fixtures/fixture';
export class ChallengerService {
  constructor(request) {
    this.request = request;
  }

  async post (){

    return test.step('POST /challenger', async () => {

    const response = await this.request.post(`${urlApi}challenger`);
    const headers = response.headers();
    const token = headers['x-challenger'];
    //todo для удобства 
    const link = `${urlApi}${headers.location}`;
    console.log(link);
    return token;
})
}
}