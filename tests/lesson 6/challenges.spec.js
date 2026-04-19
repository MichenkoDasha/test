import { expect } from '@playwright/test';
import { test } from '../../src/helpers/fixtures/fixture.js';
import { Api } from '../../src/services/api.service.js';
import fs from 'fs';
import path from 'path';

const urlApi = 'https://apichallenges.eviltester.com/';
const token = process.env.AUTH_TOKEN || JSON.parse(fs.readFileSync('auth-token.json', 'utf-8')).token;

test.beforeAll('Получить токен доступа', async ({ request }) => {
    const api = new Api(request);
    console.log(token);
    expect(token.length).toEqual(36);
});

test('02 - Получить список заданий', async ({ request }) => {
    const api = new Api(request);
    let response = await api.challenges.get(token);
    let body = response;
    expect(body.challenges).toBeInstanceOf(Array);
});
