const ctrl = require('../../DB/mongo/controllers/sentences');
const sentenceTypesCtrl = require('../../DB/mongo/controllers/sentenceTypes');

const set = async (req, res, next) => {
	try {
		const {
			sentenceTypeId,
			description} = req.body
		 
		if (!sentenceTypeId || !description) res.status(403).send('bad request')
		 
		const sentenceType_ = await sentenceTypesCtrl.show(sentenceTypeId)
		if(!sentenceType_) res.status(403).send(`invalid sentenceTypeId ${sentenceTypeId}`)		
		const sentenceType = {id: sentenceType_[0].id, name: sentenceType_[0].name }
		const save = await ctrl.store({sentenceType, description});
		res.send(save);
	} 
	catch (error) {
		res.status(500).send(error.toString());
	}
};
const get = async (req, res, next) => {
	try {
		const result = await ctrl.index();
		res.send(result);
	}
	catch (error) {
		res.status(500).send(error.toString());
	}
};

module.exports = {
	get, set
};

