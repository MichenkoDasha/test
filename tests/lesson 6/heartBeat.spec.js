import { expect } from '@playwright/test';
import { test } from '../../src/helpers/fixtures/fixture';
import { Api } from '../../src/services/api.service';
import fs from 'fs';

//const urlApi = 'https://apichallenges.eviltester.com/';
const token = process.env.AUTH_TOKEN || JSON.parse(fs.readFileSync('auth-token.json', 'utf-8')).token;

test('41 - Удаление hearbeat', { tag: '@delete' }, async ({ request }) => {
    const api = new Api(request);
    let response = await api.deleteHearbeat.delete(token);
    console.log(response);
    expect(response.status()).toBe(405);
    expect(response.headers()['content-type']).toContain('application/json');
    expect(response.headers()['x-challenger']).toBeDefined();
    expect(response.headers()['x-challenger']).toBe(token);
});

test('42 - Обновление hearbeat', { tag: '@patch' }, async ({ request }) => {
    const api = new Api(request);
    let response = await api.patchHearbeat.patch(token);
    console.log(response);
    expect(response.status()).toBe(500);
    expect(response.headers()['content-type']).toContain('application/json');
    expect(response.headers()['x-challenger']).toBeDefined();
    expect(response.headers()['x-challenger']).toBe(token);
});

test('44 - Получить hearbeat', { tag: '@get' }, async ({ request }) => {
    const api = new Api(request);
    let response = await api.getHeartbeat.get(token);
    console.log(response);
    expect(response.status()).toBe(204);
    expect(response.headers()['content-type']).toContain('application/json');
    expect(response.headers()['x-challenger']).toBeDefined();
    expect(response.headers()['x-challenger']).toBe(token);
});