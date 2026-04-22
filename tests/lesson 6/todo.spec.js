import { expect } from '@playwright/test';
import { test } from '../../src/helpers/fixtures/fixture';
import { todoBuilder, todoXmlBuilder } from '../../src/helpers/builders/index';
import { Api } from '../../src/services/api.service';
import fs from 'fs';

//const urlApi = 'https://apichallenges.eviltester.com/';
const token = process.env.AUTH_TOKEN || JSON.parse(fs.readFileSync('auth-token.json', 'utf-8')).token;

test('03 - Получить список todos', { tag: '@get' }, async ({ request }) => {

    const api = new Api(request);
    let response = await api.todos.get(token);
    expect(response.body.todos).toBeInstanceOf(Array);

});

test('04 - неправильный запрос', { tag: '@get' }, async ({ request }) => {

    const api = new Api(request);
    const result = await api.todo.getWithError(token);
    expect(result).toBe(404);
});

test('05 - Получить информацию о конкретном todo', { tag: '@get' }, async ({ request }) => {

    const api = new Api(request);

    const createdTodo = await api.postTodo.postTodo(token, new todoBuilder()
        .withTitle()
        .withDoneStatus()
        .withDescription()
        .build());
    const fetchedTodo = await api.todoGet.getTodo(token, createdTodo.body.id);
    console.log('Fetched:', fetchedTodo);
    const todoItem = createdTodo.body[0];
    expect(todoItem).toBe(createdTodo.id);
    expect(todoItem).toBe(createdTodo.title);
    expect(todoItem).toBe(createdTodo.doneStatus);
    expect(todoItem).toBe(createdTodo.description);
});

test('06 - получение удаленного todo', { tag: '@get' }, async ({ request }) => {

    const api = new Api(request);
    // Создаем новый todo
    const createdTodo = await api.postTodo.postTodo(token, new todoBuilder()
        .withTitle()
        .withDoneStatus()
        .withDescription()
        .build());
    const deleteTodo = await api.deleteTodo.deleteTodo(token, createdTodo.id);
    // Пробуем получить удаленный todo
    const fetchTodo = await api.todoGet.getTodo(token, createdTodo.id);

    expect(fetchTodo).toEqual({
        errorMessages: ['Could not find an instance with todos/' + createdTodo.id],
    });
});

test('07 - поиск выполненных todos', { tag: '@get' }, async ({ request }) => {
    const api = new Api(request);

    const createdTodo = await api.postTodo.postTodo(token, new todoBuilder()
        .withTitle()
        .withDoneStatus(true)
        .withDescription()
        .build());
    const postTodoNotDone = await api.postTodo.postTodo(token, new todoBuilder()
        .withTitle()
        .withDoneStatus(false)
        .withDescription()
        .build());

    let response = await api.todos.get(token, { doneStatus: true });
    let body = response;
    console.log(body);
    response.body.todos.forEach(todo => {
        expect(todo.doneStatus).toBe(true);
    });
});

/*test('08 - Получить заголовки', async ({ request }) => {
    const api = new Api(request);
    
    const headResponse = await api.headTodo.head(token);
    const headHeaders = headResponse.headers();
    expect(headResponse.status()).toBe(200);

});*/

test('09 - Создать todo', { tag: '@post' }, async ({ request }) => {
    const api = new Api(request);
    const createdTodo = await api.postTodo.postTodo(token, new todoBuilder()
        .withTitle()
        .withDoneStatus()
        .withDescription()
        .build());
    console.log(createdTodo);
    expect(createdTodo.body).toEqual(expect.objectContaining({ id: expect.any(Number) }));
    expect(createdTodo.body).toEqual(expect.objectContaining({ title: expect.any(String) }));
    expect(createdTodo.body).toEqual(expect.objectContaining({ doneStatus: expect.any(Boolean) }));
    expect(createdTodo.body).toEqual(expect.objectContaining({ description: expect.any(String) }));

});

test('10 - Создать todo c невалидным параметром doneStatus', { tag: '@post' }, async ({ request }) => {

    const api = new Api(request);
    const createdTodo = await api.postTodo.postTodo(token, new todoBuilder()
        .withTitle()
        .withDoneStatus("true")
        .withDescription()
        .build());
    console.log(createdTodo);
    expect(createdTodo.status).toBe(400);
    expect(createdTodo.body).toEqual({
        errorMessages: ['Failed Validation: doneStatus should be BOOLEAN but was STRING']
    });
});

test('11 - Создать todo, c длинным параметром title ', { tag: '@post' }, async ({ request }) => {

    const api = new Api(request);
    const createdTodo = await api.postTodo.postTodo(token, new todoBuilder()
        .withTitle('a'.repeat(300))
        .withDoneStatus()
        .withDescription()
        .build());
    expect(createdTodo.status).toBe(400);
    expect(createdTodo.body).toEqual({
        errorMessages: ['Failed Validation: Maximum allowable length exceeded for title - maximum allowed is 50']
    });
});

test('12 - Создать todo, c длинным параметром Description ', { tag: '@post' }, async ({ request }) => {

    const api = new Api(request);
    const createdTodo = await api.postTodo.postTodo(token, new todoBuilder()
        .withTitle()
        .withDoneStatus()
        .withDescription('a'.repeat(201))
        .build());
    expect(createdTodo.status).toBe(400);
    expect(createdTodo.body).toEqual({
        errorMessages: ['Failed Validation: Maximum allowable length exceeded for description - maximum allowed is 200']
    });
});

test('13 - Создать todo, c максимально допустимыми параметрами title и Description ', { tag: '@post' }, async ({ request }) => {

    const api = new Api(request);
    const createdTodo = await api.postTodo.postTodo(token, new todoBuilder()
        .withTitle('title'.repeat(10))
        .withDoneStatus()
        .withDescription('descriptio'.repeat(20))
        .build());
    expect(createdTodo.status).toBe(201);
    expect(createdTodo.body.title).toContain("title");
    expect(createdTodo.body.description).toContain("descriptio");
});

test('14 - Создать todo, c огромным описанием задания ', { tag: '@post' }, async ({ request }) => {

    const api = new Api(request);
    const createdTodo = await api.postTodo.postTodo(token, new todoBuilder()
        .withTitle('title'.repeat(10))
        .withDoneStatus()
        .withDescription('descriptio'.repeat(500))
        .build());
    expect(createdTodo.status).toBe(413);
    expect(createdTodo.body).toEqual({
        errorMessages: ['Error: Request body too large, max allowed is 5000 bytes']
    });
});

test('15 - Создать todo, c лишним параметром priority', { tag: '@post' }, async ({ request }) => {

    const api = new Api(request);
    const createdTodo = await api.postTodo.postTodo(token, new todoBuilder()
        .withTitle()
        .withDoneStatus()
        .withDescription()
        .build({ priority: 'high' }));
    console.log(createdTodo);
    expect(createdTodo.status).toBe(400);
    expect(createdTodo.body).toEqual({
        errorMessages: ['Could not find field: priority']
    });
});

test('16 - Изменить todo на неправильный', { tag: '@put' }, async ({ request }) => {

    const api = new Api(request);
    const createdTodo = await api.postTodo.postTodo(token, new todoBuilder()
        .withTitle()
        .withDoneStatus()
        .withDescription()
        .build());
    const updatedTodo = await api.putTodo.putTodo(token, createdTodo.id, new todoBuilder()
        .withTitle()
        .withDoneStatus()
        .withDescription()
        .build());
    expect(updatedTodo.status).toBe(400);
});

test('17 - частичное изменение todo', { tag: '@post' }, async ({ request }) => {

    const api = new Api(request);
    const createdTodo = await api.postTodo.postTodo(token, new todoBuilder()
        .withTitle()
        .withDoneStatus()
        .withDescription()
        .build());
    const updateTodo = await api.updateTodo.updateTodo(token, createdTodo.body.id, { title: 'Update title' })
    expect(updateTodo.status).toBe(200);
    expect(updateTodo.body.title).toBe("Update title");
    expect(updateTodo.body.doneStatus).toBe(createdTodo.body.doneStatus);
    expect(updateTodo.body.description).toBe(createdTodo.body.description);
});

test('18- Изменение несуществующий todo ', { tag: '@post' }, async ({ request }) => {
    const api = new Api(request);
    const getTodo = await api.todos.get(token);
    const todoId = getTodo.body.todos[0].id;
    const deleteTodo = await api.deleteTodo.deleteTodo(token, todoId);
    const updateTodo = await api.updateTodo.updateTodo(token, todoId, { title: 'Update title' })
    expect(updateTodo.status).toBe(404);
    expect(updateTodo.body.errorMessages).toContain(`No such todo entity instance with id == ${todoId} found`);
});

test('19 - Изменить todo полностью.', { tag: '@put' }, async ({ request }) => {

    const api = new Api(request);
    const createdTodo = await api.postTodo.postTodo(token, new todoBuilder()
        .withTitle()
        .withDoneStatus()
        .withDescription()
        .build());
    const updatedTodo = await api.putTodo.putTodo(token, createdTodo.body.id, {

        title: 'Update title',
        doneStatus: true,
        description: 'Update description'
    })
    expect(updatedTodo.status).toBe(200);
    expect(updatedTodo.body.title).toContain('Update title');
    expect(updatedTodo.body.doneStatus).toBe(true);
    expect(updatedTodo.body.description).toContain('Update description');
    expect(updatedTodo.body.id).toBe(createdTodo.body.id);
});

test('20 - Изменить todo title.', { tag: '@put' }, async ({ request }) => {

    const api = new Api(request);
    const createdTodo = await api.postTodo.postTodo(token, new todoBuilder()
        .withTitle()
        .withDoneStatus()
        .withDescription()
        .build());
    const updatedTodo = await api.putTodo.putTodo(token, createdTodo.body.id, {
        title: 'Update title'
    })
    expect(updatedTodo.status).toBe(200);
    expect(updatedTodo.body.title).toContain('Update title');
    expect(updatedTodo.body.id).toBe(createdTodo.body.id);
});

test('23- Удаление todo', { tag: '@delete' }, async ({ request }) => {
    const api = new Api(request);
    const createdTodo = await api.postTodo.postTodo(token, new todoBuilder()
        .withTitle()
        .withDoneStatus()
        .withDescription()
        .build());
        console.log(createdTodo);
    const deleteTodo = await api.deleteTodo.deleteTodo(token, createdTodo.body.id);
    console.log(deleteTodo);
    expect(deleteTodo).toBe(200);
});

test('25 - Получить список todos в формате xml', { tag: '@get' }, async ({ request }) => {

    const api = new Api(request);
    let response = await api.getXml.get(token);
    console.log(response);
    expect(response.headers['content-type']).toContain('application/xml');
    expect(response.body).toContain('<todos>');
    expect(response.body).toContain('</todos>');
    expect(response.body).toContain('<todo>');
    expect(response.body).toContain('</todo>');
    expect(response.body).toContain('<id>');
    expect(response.body).toContain('<title>');
    expect(response.body).toContain('<doneStatus>');
    expect(response.body).toContain('<description>');
});

test('26 - Получить список todos в формате json', { tag: '@get' }, async ({ request }) => {

    const api = new Api(request);
    let response = await api.todos.get(token);
    expect(response.headers['content-type']).toContain('application/json');
    expect(typeof response.body).toBe('object');
    expect(response.body).toHaveProperty('todos');
    expect(response.body.todos).toBeInstanceOf(Array);

});

test('31 - Создать todo в формате xml', { tag: '@post' }, async ({ request }) => {
    const api = new Api(request);
    const createdTodo = await api.postXml.postTodoXml(token, new todoXmlBuilder()
        .withTitle()
        .withDoneStatus()
        .withDescription()
        .build());
    expect(createdTodo.status).toBe(201)
    expect(createdTodo.headers['content-type']).toContain('application/xml');
    expect(createdTodo.body).toContain('<todo>');
    expect(createdTodo.body).toContain('<doneStatus>');
    expect(createdTodo.body).toContain('<description>');
    expect(createdTodo.body).toContain('</description>');
    expect(createdTodo.body).toContain('<id>');
    expect(createdTodo.body).toContain('</id>');
    expect(createdTodo.body).toContain('<title>');
    expect(createdTodo.body).toContain('</title>');
    expect(createdTodo.body).toContain('</todo>');

});

test('32 - Создать todo в формате json', { tag: '@post' }, async ({ request }) => {
    const api = new Api(request);
    const createdTodo = await api.postTodo.postTodo(token, new todoBuilder()
        .withTitle()
        .withDoneStatus()
        .withDescription()
        .build());
    expect(createdTodo.status).toBe(201)
    expect(createdTodo.headers['content-type']).toContain('application/json');
    expect(typeof createdTodo.body).toBe('object');
    expect(createdTodo.body).toHaveProperty('id');
    expect(createdTodo.body).toHaveProperty('title');
    expect(createdTodo.body).toHaveProperty('doneStatus');
    expect(createdTodo.body).toHaveProperty('description');

});

test('33 - Создать todo в неверном формате', { tag: '@post' }, async ({ request }) => {
    const api = new Api(request);
    const createdTodo = await api.postTodo.postTodo(token, new todoXmlBuilder()
        .withTitle()
        .withDoneStatus()
        .withDescription()
        .build());
    console.log(createdTodo);
    expect(createdTodo.status).toBe(415)
    expect(createdTodo.body).toEqual({
        errorMessages: ['Unsupported Content Type - application/octet-stream']
    });
});

test('58- Удаление всех todo', { tag: '@delete' }, async ({ request }) => {
    const api = new Api(request);
    const getTodo = await api.todos.get(token);
    const todos = getTodo.body.todos;

    for (const todo of todos) {
        const deleteStatus = await api.deleteTodo.deleteTodo(token, todo.id);
        expect(deleteStatus).toBe(200);
    }
    const getAfterDelete = await api.todos.get(token);
    expect(getAfterDelete.body.todos.length).toBe(0);
});
