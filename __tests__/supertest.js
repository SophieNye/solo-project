const request = require('supertest');
const fs = require('fs');
const path = require('path');

const server = 'http://localhost:3000';

describe('Route integration', () => {
    describe('/', () => {
      describe('GET', () => {
        it('responds with 200 status and text/html content type', () => {
          return request(server)
            .get('/')
            .expect('Content-Type', /text\/html/)
            .expect(200);
        });
      });
    });

    describe('/auth/goodreads', () => {
        describe('GET', () => {
            it('responds with 200 status and text/html content type', () => {
                return request(server)
                    .get('/auth/goodreads')
                    .expect('Content-Type', /text\/html/)
                    .expect(200)
            })
        })
    })
    describe('/getmybooks', () => {
        describe('GET', ()=> {
            it('response is an array', () => {
                return request(server)
                    .get('/getmybooks')
                    .then((response) => {
                        expect(JSON.parse(response.body)).toBeInstanceOf(Array)
                    })
            })
        })
    })

});
