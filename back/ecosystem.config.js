module.exports = {
	apps: [{
		name: 'sarnento2',
		script: './index.js',
		exec_mode: 'cluster',
		env: {
			'teste': 'Ok123' 
		},
	},
	{
		name: 'sarnento_API',
		script: './srcAPI/indexAPI.js',
		exec_mode: 'cluster',
		env: {
			'teste': 'Ok123' 
		},
	},

	],
};
