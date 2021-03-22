/**
 *
 * Companion instance class for the Generic Timer.
 * Version 1.0.0
 * Author Max Kiusso <max@kiusso.net>
 *
 * 2021-03-21	Version 1.0.0
 *
 **/

 let instance_skel   = require('../../instance_skel')
 let actions         = require('./actions')
 let feedbacks       = require('./feedbacks')
 let presets	      = require('./presets')
 let variables	      = require('./variables')

 class instance extends instance_skel {
 	constructor(system, id, config) {
 		super(system, id, config)

 		Object.assign(this, {
 			...actions,
 			...feedbacks,
			...presets,
			...variables,
 		})

		this.varStatus = {}
		this.intVal = {}
		this.continue = {}
 	}

	actions(system) {
		this.setActions(this.getActions())
	}

	feedbacks(system) {
		this.setFeedbackDefinitions(this.getFeedbacks())
	}

	presets(system) {
		this.setPresetDefinitions(this.getPresets())
	}

	variables(system) {
		this.setVariableDefinitions(this.getVariables())
	}

	action(action) {
		var self = this
		var opt = action.options
		var stp = 1
		var nam = 'stop'

		switch (action.action) {
			case 'countdown':
				stp = -1
				nam = 'count'
			case 'stopwatch':
				switch (self.varStatus[`${nam}_${opt.name}`]) {
					case 1:
						if (opt.func == 0) {
							self.varStatus[`${nam}_${opt.name}`] = 0
						} else {
							self.varStatus[`${nam}_${opt.name}`] = 2
						}

						if (self.intVal[`${nam}_${opt.name}`] !== undefined) {
							clearInterval(self.intVal[`${nam}_${opt.name}`])
						}
						break

					case 2:
						self.setVariable(`${nam}_${opt.name}`, opt.time)
						self.varStatus[`${nam}_${opt.name}`] = 0
						self.continue[`${nam}_${opt.name}`] = false
						self.checkFeedbacks(action.action)
						break

					case 0:
						self.varStatus[`${nam}_${opt.name}`] = 1
						self.intVal[`${nam}_${opt.name}`] = setInterval(
							() => {
								let f = ''
								if (self.continue[`${nam}_${opt.name}`] == true) {
									f = "+"
									stp = 1
								}

								let d
								var tm
								self.getVariable(`${nam}_${opt.name}`, function(res){
									tm = res
								})
								let [h, m, s] = tm.split(":")
								d = new Date((((h-1)*60*60*1000) + (m*60*1000) + (s*1000)) + (stp*1000));
								h = (d.getDate() - 1) * 24 + d.getHours()
								m = ('0' + d.getMinutes().toString()).slice(-2)
								s = ('0' + d.getSeconds().toString()).slice(-2)

								self.setVariable(`${nam}_${opt.name}`, `${f}${h}:${m}:${s}`)
								self.checkFeedbacks(action.action)

								if (h == 0 && m == 0 && s == 0 && (nam == 'stop' || (nam == 'count' && opt.end == 0))) {
									self.varStatus[`${nam}_${opt.name}`] = undefined
									clearInterval(self.intVal[`${nam}_${opt.name}`])
								} else if (h == 0 && m == 0 && s == 0 && nam == 'count' && opt.end == 1) {
									self.continue[`${nam}_${opt.name}`] = true
								}
							},
							1000
						)
						break
				}
				break
		}
	}

	config_fields() {
		return [
			{
				type:  'text',
				id:    'info',
				width: 12,
				label: 'Information',
				value: 'This module is for Generic Timer',
			},{
				type:	'textinput',
				label:	'Countdown names (semicolumn separated)',
				id:		'countdown',
				default:	'count1;count2;count3',
				regex:	'/^([^\\s]{3,}\\;?){1,}$/',
			},{
				type:	'textinput',
				label:	'Stopwatch names (semicolumn separated)',
				id:		'stopwatch',
				default:	'stop1;stop2;stop3',
				regex:	'/^([^\\s]{3,}\\;?){1,}$/',
			},
		]
	}

	destroy() {
		this.log('debug', `destroyed ${this.id}`)
		for(var k in this.intVal) {
			clearInterval(k);
		}
	}

	init() {
		this.updateConfig(this.config)
	}

	updateConfig(config) {
		this.config = config
		this.actions()
		this.feedbacks()
		this.presets()
		this.variables()

		this.subscribeActions('countdown');
		this.subscribeActions('stopwatch');
	}
}
exports = module.exports = instance
