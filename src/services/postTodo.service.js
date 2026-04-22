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
                    'Accept': 'application/json'
                },
                 data: todoData,
            });
            let bodyTodo = await response.json();
            const link = `${urlApi}/gui/challenges/${token}`;
            console.log(link);
            return {
                status: response.status(),
                body: bodyTodo,
                headers: response.headers()
            };
        
        })
    };
};

export class PostTodoXmlService {
    constructor(request) {
        this.request = request;
    }
    async postTodoXml(token, xmlData) {

        return test.step('POST /todos', async () => {
            const postXml = await this.request.post(`${urlApi}/todos`, {
                headers: {
                    'X-CHALLENGER': token,
                    'Content-Type': 'application/xml',
                    'Accept': 'application/xml'
                },
                 data: xmlData,
            });
            const link = `${urlApi}/gui/challenges/${token}`;
            console.log(link);
            return {
                status: postXml.status(),
                headers: postXml.headers(),
                body: await postXml.text()
            };
        
        })
    };
};
