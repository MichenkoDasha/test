import { expect } from '@playwright/test';
import { test } from '../../src/helpers/fixtures/fixture';
import { todoBuilder } from '../../src/helpers/builders';
import { Api } from '../../src/services/api.service';
import fs from 'fs';

const urlApi = 'https://apichallenges.eviltester.com/';
const token = process.env.AUTH_TOKEN || JSON.parse(fs.readFileSync('auth-token.json', 'utf-8')).token;

test('03 - Получить список todos', async ({ request }) => {

    const api = new Api(request);
    let response = await api.todos.get(token);
    expect(response.body.todos).toBeInstanceOf(Array);

});

test('04 - неправильный запрос', async ({ request }) => {

    const api = new Api(request);
    const result = await api.todo.getWithError(token);
    expect(result).toBe(404);
});

test('05 - Получить информацию о конкретном todo', async ({ request }) => {

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

test('06 - получение удаленного todo', async ({ request }) => {

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

test('07 - поиск выполненных todos', async ({ request }) => {
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

test('09 - Создать todo', async ({ request }) => {
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

test('10 - Создать todo c невалидным параметром doneStatus', async ({ request }) => {

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

test('11 - Создать todo, c длинным параметром title ', async ({ request }) => {

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

test('12 - Создать todo, c длинным параметром Description ', async ({ request }) => {

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

test('13 - Создать todo, c максимально допустимыми параметрами title и Description ', async ({ request }) => {

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

test('14 - Создать todo, c огромным описанием задания ', async ({ request }) => {

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

test('15 - Создать todo, c лишним параметром priority', async ({ request }) => {

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

test('16 - Изменить todo на неправильный', async ({ request }) => {

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

test('23- Удаление todo', async ({ request }) => {
    const api = new Api(request);
    const getTodo = await api.todos.get(token);
    console.log(getTodo);
    let todoId = getTodo.body.todos[0].id;
    const deleteTodo = await api.deleteTodo.deleteTodo(token, todoId);
    console.log(deleteTodo);
    expect(deleteTodo).toBe(200);
})