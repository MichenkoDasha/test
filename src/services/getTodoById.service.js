import { test } from '../../src/helpers/fixtures/fixture';
const urlApi = 'https://apichallenges.eviltester.com';

export class GetToDoByIdService {
    constructor(request) {
        this.request = request;
    }
     async getTodo(token, todoId) {

        return test.step('GET /todos', async () => {
            const response = await this.request.get(`${urlApi}/todos/${todoId}`, {
                headers: {
                    'X-CHALLENGER': token,
                },
            });
            const r = await response.json();
            const link = `${urlApi}/gui/challenges/${token}`;
            console.log(link);
            return r;
        })
    };
};