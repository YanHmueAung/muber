const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose')
const app = require('../../app');
const Driver = mongoose.model('driver');

describe('Drivers Controller', () => {
    it('Post to /api/drivers creates a new driver', done => {
        Driver.count().then(count => {
            request(app)
                .post('/api/drivers')
                .send({ email: 'test@test.com' })
                .end(() => {
                    Driver.count().then(newCount => {
                        //console.log(count)
                        //console.log(newCount)
                        assert(count + 1 === newCount);
                        done()
                    })
                })
        })
    })

    it('PUT to /api/drivers/id edits an existing driver', done => {
        const driver = new Driver({ email: 't.com', driving: false });
        driver.save().then(() => {
            request(app)
                .put(`/api/drivers/${driver._id}`)
                .send({ driving: true })
                .end((err, response) => {
                    //console.log(response.body.email)
                    Driver.findOne({ email: 't.com' })
                        .then(driver => {
                            //console.log(driver)
                            assert(driver.driving === true);
                            done()
                        })
                })
        })
    })
    it('DELETE to /api/drivers/:id delete an existing driver', done => {
        const driver = new Driver({ email: 'delete.com' });
        driver.save().then(() => {
            request(app)
                .delete(`/api/drivers/${driver._id}`)
                .end((err, res) => {
                    Driver.findOne({ email: 'delete.com' })
                        .then(driver => {
                            //console.log(driver)
                            assert(!driver)
                            done()
                        })
                })
        })
    })
    it('GET to /api/drivers finds drivers in a location', done => {
        const seattleDriver = new Driver({
            email: 'seattle@test.com',
            geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
        })
        const miamiDriver = new Driver({
            email: 'miami@test.com',
            geometry: { type: 'Point', coordinates: [-80.232, 25.791] }
        })
        Promise.all([seattleDriver.save(), miamiDriver.save()])
            .then(() => {
                request(app)
                    .get('/api/drivers?lng=-80&lat=25')
                    .end((err, response) => {
                        console.log(response.body);
                        //assert(response.body.length===1);
                        //assert(response.body[0].obj.email==='miami@test.com');
                        done();
                    })
            })
    })
})