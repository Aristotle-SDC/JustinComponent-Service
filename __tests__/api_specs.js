const frisby = require('frisby');

describe('Postgres', function() {
  it('should retrieve data corresponding to ID = 9000001 from 10M records', () => (
    frisby
      .get('http://localhost:3001/api/track/9000001')
      .expect('status', 200)
  ));

  it('should retrieve data corresponding to ID = 9876543 from 10M records', () => (
    frisby
      .get('http://localhost:3001/api/track/9876543')
      .expect('status', 200)
  ));

  it('should select matching data from last 10K data', () => (
    frisby
      .get('http://localhost:3001/1/')
      .expect('status', 200)
  ));
});






