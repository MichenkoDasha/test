import { expect } from '@playwright/test';
import { test } from '../../src/helpers/fixtures/fixture';
import { Api } from '../../src/services/api.service';
import fs from 'fs';

const token = process.env.AUTH_TOKEN || JSON.parse(fs.readFileSync('auth-token.json', 'utf-8')).token;

test('48 - получение авторизационного токена, с неправильными данными', { tag: '@post' }, async ({ request }) => {
    const api = new Api(request);
    let response = await api.postSecret.postSecret(token, {
        username: 'invalid',
        password: 'invalid'});
    expect(response.status).toBe(401);
    expect(response['x-auth-token']).toBeUndefined();
});

test('49 - получение авторизационного токена', { tag: '@post' }, async ({ request }) => {
    const api = new Api(request);
    let response = await api.postSecret.postSecret(token, {
        username: 'admin',
        password: 'password'});
    expect(response.status).toBe(201);
    expect(response).toBeDefined();
    expect(response.body['x-auth-token'].length).toBe(36);
});

