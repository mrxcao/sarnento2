const get = async (outType = 1) => {

	switch (outType) {
	case 0: // markDown
		return '**STATUS** \n\n' +
        `STATUS: ok
        Usersa: 1
        Servers: 10`;
		break;
	case 1: // JSON
		return {
			STATUS: ok,
			Usersa: 1,
			Servers: 10,
		};
		break;
	default:
		return false;
		break;
	}

};

module.exports = { get };