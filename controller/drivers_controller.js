const Driver = require('../models/driver')
module.exports = {
    greeting(req, res) {
        res.send({ hi: 'there' })
    },
    index(req, res, next) {
        const { lng, lat } = req.query;
        console.log(lng);
        console.log(lat);

        Driver.near(
            {
                type: 'Point',
                near: [parseFloat(lng), parseFloat(lat)],
                maxDistance: 200000
            }
        )
            .then(drivers => {
                console.log(dirvers)
                return res.send(drivers)
            })
            .catch(next)



        Driver.geoNear(
            { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
            { spherical: true, maxDistance: 200000 }
        )
            .then(drivers => {
                console.log(dirvers)
                return res.send(drivers)
            })
            .catch(next)
    },
    create(req, res, next) {
        const driverProps = req.body;
        console.log(driverProps);
        Driver.create(driverProps)
            .then(driver => res.send(driver))
            .catch(next)

    },
    edit(req, res, next) {
        const driversId = req.params.id;
        const driverProps = req.body;
        Driver.findByIdAndUpdate(driversId, driverProps)
            .then(() => Driver.findById(driversId))
            .then(driver => res.send(driver))
            .catch(next);
    },
    delete(req, res, next) {
        const driversId = req.params.id;
        const driverProps = req.body;
        Driver.findByIdAndDelete(driversId)
            .then((driver) => res.status(204).send(driver))
            .catch(next)
    }
}