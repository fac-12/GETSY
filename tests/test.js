const test = require('tape');
const shot = require('shot');
const router = require('../src/router');

test('Initialise', (t) => {
  const num = 2;
  t.equal(num, 2, 'should return 2');
  t.end();
});


test('Home route', (t) => {
  shot.inject(router, { method: 'get', url: '/' }, (res) => {
    t.equal(res.statusCode, 200, 'should respond with a status code of 200');
    t.equal(res.payload.startsWith('<!DOCTYPE html>'), true, 'should return index page content');
    t.end();
  });
});

test('unknown route', (t) => {
  shot.inject(router, { method: 'get', url: '/elephant' }, (res) => {
    t.equal(res.statusCode, 404, 'should respond with a status code of 200');
    t.equal(res.payload, 'Page not found', 'should return Page not found');
    t.end();
  });
});

test('api route', (t) => {
  shot.inject(router, { method: 'get', url: '/api/' }, (res) => {
    t.equal(res.statusCode, 200, 'should respond with a status code of 200');
    t.equal(typeof res.payload, 'string', 'should return an object');
    t.end();
  });
});
