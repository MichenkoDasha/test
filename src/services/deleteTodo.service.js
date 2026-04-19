import { test } from '../helpers/fixtures/fixture';
const urlApi = 'https://apichallenges.eviltester.com';

export class DeleteService {
    constructor(request) {
        this.request = request;
    }
    async deleteTodo(token, createdTodoId) {

        return test.step('DELETE /todos', async () => {
            const response = await this.request.delete(`${urlApi}/todos/${createdTodoId}`, {
                headers: {
                    'x-challenger': token,
                },
            });
            
            const link = `${urlApi}/gui/challenges/${token}`;
            console.log(link);
            return response.status();

        })
    };
};