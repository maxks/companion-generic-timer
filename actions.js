module.exports = {
	getActions : function() {
		let actions = {}

		actions['countdown'] = {
			label: 'Countdown',
			options: [
				{
					type:	'textinput',
					label:	'Name (min 3 chars)',
					id:		'name',
					default:	'',
					regex:	'/^[^\\s]{3,}$/',
				},{
					type:	'textinput',
					label:	'Time (h:mm:ss)',
					id:		'time',
					default:	'0:00:00',
					regex:	'/^(0*[0-9]|1[0-9]|2[0-3]):(0*[0-9]|[1-5][0-9]|60):(0*[0-9]|[1-5][0-9]|60)$/',
				},{
					type:	'dropdown',
					label:	'Function',
					id:		'func',
					default:	'0',
					choices:	[
						{label: 'Start/Pause', id: 0},
						{label: 'Start/Pause/Reset', id: 1},
					],
				}
			],
		}

		actions['stopwatch'] = {
			label: 'Stopwatch',
			options: [
				{
					type:	'textinput',
					label:	'Name (min 3 chars)',
					id:		'name',
					default:	'',
					regex:	'/^[^\\s]{3,}$/',
				},{
					type:	'dropdown',
					label:	'Function',
					id:		'func',
					default:	'0',
					choices:	[
						{label: 'Start/Pause', id: 0},
						{label: 'Start/Pause/Reset', id: 1},
					],
				}
			],
		}

		return actions
	},
}
