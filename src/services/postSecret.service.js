import { test } from '../../src/helpers/fixtures/fixture';
const urlApi = 'https://apichallenges.eviltester.com';

export class PostSecretService {
    constructor(request) {
        this.request = request;
    }
    async postSecret(token, auth = { username: 'admin', password: 'password' }) {

        return test.step('POST /secret/token', async () => {
            const postSecret = await this.request.post(`${urlApi}/secret/token`, {
                headers: {
                    'X-CHALLENGER': token,
                    'Authorization': 'Basic ' + Buffer.from(`${auth.username}:${auth.password}`).toString('base64')
                },
                 
            });
            const link = `${urlApi}/gui/challenges/${token}`;
            console.log(link);
            return {
                status: postSecret.status(),
                body: postSecret.headers()
            };
        })
    };
};