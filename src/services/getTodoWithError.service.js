import { test } from '../helpers/fixtures/fixture';
const urlApi = 'https://apichallenges.eviltester.com';

export class GetToDoWithErrorService {
    constructor(request) {
        this.request = request;
    }
    async getWithError(token) {

        return test.step('GET /todo', async () => {
            const response = await this.request.get(`${urlApi}/todo`, {
                headers: {
                    'X-CHALLENGER': token,
                },
            });
            const link = `${urlApi}/gui/challenges/${token}`;
            console.log(link);
            return response.status();
        
        })
    };
};