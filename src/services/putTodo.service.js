import { test } from '../helpers/fixtures/fixture';
const urlApi = 'https://apichallenges.eviltester.com';

export class PutTodoService {
    constructor(request) {
        this.request = request;
    }
    async putTodo(token, todoId,todoData) {
        return test.step('PUT /todos', async () => {
            const response = await this.request.put(`${urlApi}/todos/${todoId}`, {
                headers: {
                    'X-CHALLENGER': token,
                },
                 data: todoData,
            });
            let bodyTodo = await response.json();
            const link = `${urlApi}/gui/challenges/${token}`;
            console.log(link);
            return {
                status: response.status(),
                body: bodyTodo
            };

        })
    };
};