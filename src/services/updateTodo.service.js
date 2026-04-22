import { test } from '../helpers/fixtures/fixture';
const urlApi = 'https://apichallenges.eviltester.com';

export class UpdateToDoService {
    constructor(request) {
        this.request = request;
    }
    async updateTodo(token, todoId, updateData) {

        return test.step('POST /todos', async () => {
            const response = await this.request.post(`${urlApi}/todos/${todoId}`, {
                headers: {
                    'X-CHALLENGER': token,
                    'Content-Type': 'application/json'
                },
                 data: JSON.stringify(updateData),
            });
            const link = `${urlApi}/gui/challenges/${token}`;
            console.log(link);
            return {
                status: response.status(),
                body: await response.json()
            };
        
        })
    };
};