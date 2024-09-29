const clt = require('../DB/mongo/controllers/denuncias');
const cltUsers = require('../DB/mongo/controllers/users');
const nova = async (params) => {
    const res = await clt.store(params)
    return res
}

module.exports={
    nova
}