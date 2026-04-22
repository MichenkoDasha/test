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
                    'Accept': 'application/json'
                },
                params: params,

            });
            const h = response.headers();
            const r = await response.json();
            const link = `${urlApi}/gui/challenges/${token}`;
            console.log(link);
            return {
                body: r,
                headers: h
            };
        })
    };

}
export class GetXmlService {
    constructor(request) {
        this.request = request;
    }
    async get(token, params = {}) {

        return test.step('GET /todos', async () => {
            const getXml = await this.request.get(`${urlApi}/todos`, {
                headers: {
                    'X-CHALLENGER': token,
                    'Accept': 'application/xml'
                },
                params: params,

            });
            const link = `${urlApi}/gui/challenges/${token}`;
            console.log(link);
            return {
                status: getXml.status(),
                headers: getXml.headers(),
                body: await getXml.text()
            };
        })
    };
}

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

export class PutTodoService {
    constructor(request) {
        this.request = request;
    }
    async putTodo(token, todoId,todoData) {
        return test.step('PUT /todos', async () => {
            const response = await this.request.put(`${urlApi}/todos/${todoId}`, {
                headers: {
                    'X-CHALLENGER': token,
                    'Content-Type': 'application/json'
                },
                 data: JSON.stringify(todoData),
            });
            let bodyTodo = await response.json();
            const link = `${urlApi}/gui/challenges/${token}`;
            console.log(link);
            return {
                status: response.status(),
                body: await response.json()
            };

        })
    };
};

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