const request = require('supertest');
const app = require('./src/server');

jest.setTimeout(30000);

describe('JEST', () => {
	it('Jest Ok', async () => {
		expect(true).toBe(true);
	});
});

describe('API Routes', () => {
	it('Deve retornar status 200 e a mensagem correta', async () => {
		const res = await request(app).get('/post');
		// .send({test:true})
		console.log('res', res);
		expect(res.statusCode).toEqual(200);

		// expect(response.body).toEqual({ message: 'Hello, World!' });

	});
});