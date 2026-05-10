import { request } from "@playwright/test";
import fs from 'fs';
import path from "path";

export default async function globalSetup () {
    const api = await request.newContext();

//todo
    const urlApi = 'https://apichallenges.eviltester.com';
    const response = await api.post(`${urlApi}/challenger`);
    const headers = response.headers();
    // Вытащить токен из хедера
    const token = headers['x-challenger'];


    const tokenPath = path.resolve(process.cwd(), 'auth-token.json');
    fs.writeFileSync(tokenPath, JSON.stringify({token}, null, 2));
    console.log('Токен успешно сохранен', token);
    process.env.CHALLENGER_TOKEN = token;
    await api.dispose();
    return {key: token};
}