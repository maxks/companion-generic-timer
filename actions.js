module.exports = {
	getActions : function() {
		var self = this
		let actions = {}

		let ele = []
		for(let k of this.config.countdown.split(";")) {
			ele.push({label: `${k}`, id: `${k}`})
		}

		actions['countdown'] = {
			label: 'Countdown',
			options: [
				{
					type:	'dropdown',
					label:	'Name',
					id:		'name',
					default:	[],
					choices:	ele,
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
				},{
					type:	'dropdown',
					label:	'When finished',
					id:		'end',
					default:	'0',
					choices:	[
						{label: 'Stop', id: 0},
						{label: 'Continue', id: 1},
					],
				}
			],
			subscribe: (action) => {
				self.setVariable(`count_${action.options.name}`, action.options.time)
				self.varStatus[`count_${action.options.name}`] = 0
				self.continue[`count_${action.options.name}`] = false
				self.feedbacks
			},
			unsubscribe: (action) => {
				clearInterval(self.intVal[`count_${action.options.name}`])
			},
		}

		ele = []
		for(let k of this.config.stopwatch.split(";")) {
			ele.push({label: `${k}`, id: `${k}`})
		}

		actions['stopwatch'] = {
			label: 'Stopwatch',
			options: [
				{
					type:	'dropdown',
					label:	'Name',
					id:		'name',
					default:	[],
					choices:	ele,
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
			subscribe: (action) => {
				self.setVariable(`stop_${action.options.name}`, '0:00:00')
				self.varStatus[`stop_${action.options.name}`] = 0
				action.options.time = '0:00:00'
				self.feedbacks
			},
			unsubscribe: (action) => {
				clearInterval(self.intVal[`stop_${action.options.name}`])
			},
		}

		return actions
	},
}
