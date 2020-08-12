const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('Express App', () => {
  it('should return a message from GET /', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello Express!');
  });
});

describe('GET /quotient', () => {
  it('8/4 should be 2', () => {
    return supertest(app)
      .get('/quotient')
      .query({ a: 8, b: 4 })
      .expect(200, '8 divided by 4 is 2');
  });

  const requiredQuery = [ 'a', 'b'];

  requiredQuery.forEach(param => 
    it(`should return 400 if ${param} is missing`, () => {
      return supertest(app)
        .get('/quotient')
        .query({ param: 4 })
        .expect(400, `Value for a is needed`);
    })
  );

  it('should return 400 is b == 0', () => {
    return supertest(app)
      .get('/quotient')
      .query({ a: 4, b: 0})
      .expect(400, 'Cannot divide by 0');
  });
  
});