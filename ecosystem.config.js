module.exports = {
	apps : [{
		name: 'sarnento',
		script: 'index.js',
		exec_mode  : 'fork',
		watch: true,
		watch_delay: 1000,
		ignore_watch : ['node_modules', 'client/img', '.git'],

	}],
};
