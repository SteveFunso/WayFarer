/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';


const should = chai.should();
chai.use(chaiHttp);

//eslint-disable-next-line no-undef
describe('POST /api/v1/auth/signup', () => {
  // eslint-disable-next-line no-undef
  it('should signup a new user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'newuser@gmail.com',
        first_name: 'John',
        last_name: 'Steve',
        is_admin: true,
        password: 'rted34w23wg',

      })
      .end((err, res) => {
        console.log(res.body);
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(201);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql(201);
        // the JSON response body should have a
        // key-value pair of {"data": [5 user objects]}
        // res.body.data.key.length.should.eql(6);
        // the first object in the data array should
        // have the right keys
        res.body.data.should.include.keys(
          'user_id', 'first_name', 'last_name', 'email_address', 'is_admin', 'token',
        );
        done();
      });
  });
});

// eslint-disable-next-line no-undef
describe('POST /api/v1/auth/signin', () => {
  // eslint-disable-next-line no-undef
  it('should signin an existing user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'adegboye@gmail.com',
        password: 'rted34w23wg',

      })
      .end((err, res) => {
        console.log(res.body);
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql(200);
        // the JSON response body should have a
        // key-value pair of {"data": [5 user objects]}
        // res.body.data.key.length.should.eql(6);
        // the first object in the data array should
        // have the right keys
        res.body.data.should.include.keys(
          'user_id', 'first_name', 'last_name', 'email_address', 'is_admin', 'token',
        );
        done();
      });
  });
});

// eslint-disable-next-line no-undef
describe('POST /api/v1/trips', () => {
  // eslint-disable-next-line no-undef
  it('should create a new trip', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .send({
        user_id: 56,
        origin: 'Ajah, Lagos',
        destination: 'Aba, Lagos',
        trip_date: '11-02-2018',
        fare: 1234.21,
        status: 'Pending',
        bus_id: 1,
        trip_id: 43,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkZWdib3llMUBnbWFpbC5jb20iLCJ1c2VySWQiOjU2LCJpYXQiOjE1NjM3MDYxNzMsImV4cCI6MTU2MzcwOTc3M30.IPF157O5Bgf1PSzdl6_IskLs9hlvTXQLk3wVlK_wPJY',
      })
      .end((err, res) => {
        console.log(res.body);
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(201);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql(201);
        // the JSON response body should have a
        // key-value pair of {"data": [5 user objects]}
        // res.body.data.key.length.should.eql(6);
        // the first object in the data array should
        // have the right keys
        res.body.data.should.include.keys(
          'origin', 'destination', 'trip_date', 'fare', 'status', 'bus_id', 'id',
        );
        done();
      });
  });
});


// eslint-disable-next-line no-undef
describe('GET /api/v1/trips', () => {
  // eslint-disable-next-line no-undef
  it('should get all trips', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .send({
        user_id: 56,
        trip_id: 6,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkZWdib3llMUBnbWFpbC5jb20iLCJ1c2VySWQiOjU2LCJpYXQiOjE1NjM3MDYxNzMsImV4cCI6MTU2MzcwOTc3M30.IPF157O5Bgf1PSzdl6_IskLs9hlvTXQLk3wVlK_wPJY',
      })
      .end((err, res) => {
        console.log(res.body);
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql(200);
        // the JSON response body should have a
        // key-value pair of {"data": [5 user objects]}
        // res.body.data.key.length.should.eql(6);
        // the first object in the data array should
        // have the right keys
        res.body.data[0].should.include.keys(
          'bus_id',
          'origin',
          'destination',
          'trip_date',
          'fare',
          'trip_id',
        );
        done();
      });
  });
});

// /trips/:tripId

// eslint-disable-next-line no-undef
describe('PATCH   /api/v1/trips/36', () => {
  // eslint-disable-next-line no-undef
  it('should cancel given trip', (done) => {
    chai.request(app)
      .patch('/api/v1/trips/36')
      .send({
        user_id: 58,
        is_admin: true,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkZWdib3llMTIzQGdtYWlsLmNvbSIsInVzZXJJZCI6NTgsImlhdCI6MTU2MzczMDgzNiwiZXhwIjoxNTYzNzM0NDM2fQ.hyEO35cGs2nqUCkoeGbwqsLkeEKez_V9YO3KXtsvhJo',
        bus_id: 1,
      })
      .end((err, res) => {
        console.log(res.body);
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql(200);
        res.body.data.should.include.keys(
          'bus_id', 'origin', 'destination', 'trip_date', 'fare', 'trip_id', 'status',
        );
        done();
      });
  });
});

// eslint-disable-next-line no-undef
describe('POST  /api/v1/bookings', () => {
  // eslint-disable-next-line no-undef
  it('should create a new booking', (done) => {
    chai.request(app)
      .post('/api/v1/bookings')
      .send({
        user_id: 60,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkZWdib3llMTIzNDVAZ21haWwuY29tIiwidXNlcklkIjo2MCwiaWF0IjoxNTYzNzM4MzE3LCJleHAiOjE1NjM3NDE5MTd9.Ke5xUneYvAmK4mKaHR0NtsnddPqggyYcNcDqhMYh9Io',
        trip_id: 7,
      })
      .end((err, res) => {
        console.log(res.body);
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(201);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql(201);
        res.body.data.should.include.keys(
          'id', 'user_id', 'trip_id',
        );
        done();
      });
  });
});

// eslint-disable-next-line no-undef
describe('GET  /api/v1/bookings', () => {
  // eslint-disable-next-line no-undef
  it('should get bookings', (done) => {
    chai.request(app)
      .get('/api/v1/bookings')
      .send({
        user_id: 60,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkZWdib3llMTIzNDVAZ21haWwuY29tIiwidXNlcklkIjo2MCwiaWF0IjoxNTYzNzM4MzE3LCJleHAiOjE1NjM3NDE5MTd9.Ke5xUneYvAmK4mKaHR0NtsnddPqggyYcNcDqhMYh9Io',
        is_admin: true, 
      })
      .end((err, res) => {
        console.log(res.body);
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql(200);
        res.body.data[0].should.include.keys(
          'booking_id', 'user_id',
        );
        done();
      });
  });
});

// eslint-disable-next-line no-undef
describe('DELETE  /api/v1/bookings/15', () => {
  // eslint-disable-next-line no-undef
  it('should delete a new booking', (done) => {
    chai.request(app)
      .delete('/api/v1/bookings/15')
      .send({
        user_id: 61,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkZWdib3llMTIzNDU2QGdtYWlsLmNvbSIsInVzZXJJZCI6NjEsImlhdCI6MTU2Mzc0MjQzNywiZXhwIjoxNTYzNzQ2MDM3fQ.jkkCavOiOjAZQyP2yaPPLTxNn5GfA6p35r61RProexA',
        is_admin: true, 
      })
      .end((err, res) => {
        console.log(res.body);
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql(200);
        // res.body.data.should.include.keys(

        // );
        done();
      });
  });
});