import { test } from '../../src/helpers/fixtures/fixture';
const urlApi = 'https://apichallenges.eviltester.com';

export class HeadToDoService {
    constructor(request) {
        this.request = request;
    }
    async head(token) {
        const response = await test.step('HEAD /todos', async () => {
            return await this.request.head(`${urlApi}/todos`, {
                headers: {
                    'X-CHALLENGER': token,
                },
            });
        });
        const link = `${urlApi}/gui/challenges/${token}`;
            console.log(link);
        return response;
    }
}