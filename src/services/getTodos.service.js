import { test } from '../../src/helpers/fixtures/fixture';
const urlApi = 'https://apichallenges.eviltester.com';

export class GetToDoService {
    constructor(request) {
        this.request = request;
    }
    async get(token, params = {}) {

        return test.step('GET /todos', async () => {
            const response = await this.request.get(`${urlApi}/todos`, {
                headers: {
                    'X-CHALLENGER': token,
                },
                params: params,
        
            });
            const h = response.headers();
            const r = await response.json();
            const link = `${urlApi}/gui/challenges/${token}`;
            console.log(link);
            return {
                body: r,
                //headers: h
            };
        })
    };

}