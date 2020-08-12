const app = require('../app');
const expect = require('chai').expect;
const supertest = require('supertest');

describe('Frequency endpoint', () => {
  it('should return 400 status if s is undefined', () => {
    return supertest(app)
      .get('/frequency')
      .query(null)
      .expect(400, 'Invalid request');
      
  });

  it('should return an object', () => {
    return supertest(app)
      .get('/frequency')
      .query({ s: 'aabbccc' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('object');
      });
  });

  it('should return the correct response', () => {
    
    const expectedResponse = {
      count: 2,
      average: 5,
      highest: 'a',
      'a': 6,
      'b': 4
    };

    return supertest(app)
      .get('/frequency')
      .query({ s: 'aaBBAAbbaa' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.deep.eql(expectedResponse);
      });
  });
});