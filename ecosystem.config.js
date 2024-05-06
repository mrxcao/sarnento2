module.exports = {
	apps: [{
		name: 'sarnento2',
		script: './index.js',
		exec_mode: 'cluster',
	},
	{
		name: 'sarnento_API',
		script: './sreAPI/indexAPI.js',
		exec_mode: 'cluster',
	},

	],
};
