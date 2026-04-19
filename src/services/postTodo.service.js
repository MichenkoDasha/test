import { test } from '../helpers/fixtures/fixture';
const urlApi = 'https://apichallenges.eviltester.com';

export class PostTodoService {
    constructor(request) {
        this.request = request;
    }
    async postTodo(token, todoData) {

        return test.step('POST /todos', async () => {
            const response = await this.request.post(`${urlApi}/todos`, {
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