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

 class instance extends instance_skel {
 	constructor(system, id, config) {
 		super(system, id, config)

 		Object.assign(this, {
 			...actions,
 			...feedbacks,
			...presets,
 		})

		this.varStatus = {}
		this.intVal = {}
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

	action(action) {
		var self = this
		var opt = action.options
		var stp = 1
		if ( opt.time === undefined) {
			opt.time = '0:00:00'
		}

		switch (action.action) {
			case 'countdown':
				stp = -1
			case 'stopwatch':
			case 'countdown':
				if (self.varStatus[`time_${opt.name}`] === undefined) {
					self.varStatus[`time_${opt.name}`] = 0
					self.setVariable(`time_${opt.name}`, opt.time)
					break
				}

				switch (self.varStatus[`time_${opt.name}`]) {
					case 1:
						if (opt.func == 0) {
							self.varStatus[`time_${opt.name}`] = 0
						} else {
							self.varStatus[`time_${opt.name}`] = 2
						}

						if (self.intVal[`time_${opt.name}`] !== undefined) {
							clearInterval(self.intVal[`time_${opt.name}`])
						}
						break

					case 2:
						self.setVariable(`time_${opt.name}`, opt.time)
						self.varStatus[`time_${opt.name}`] = 0
						self.checkFeedbacks(action.action)
						break

					case 0:
						self.varStatus[`time_${opt.name}`] = 1
						self.intVal[`time_${opt.name}`] = setInterval(
							() => {
								let d
								var tm
								self.getVariable(`time_${opt.name}`, function(res){
									tm = res
								})
								let [h, m, s] = tm.split(":")
								d = new Date((((h-1)*60*60*1000) + (m*60*1000) + (s*1000)) + (stp*1000));
								h = (d.getDate() - 1) * 24 + d.getHours()
								m = ('0' + d.getMinutes().toString()).slice(-2)
								s = ('0' + d.getSeconds().toString()).slice(-2)

								self.setVariable(`time_${opt.name}`, `${h}:${m}:${s}`)
								self.checkFeedbacks(action.action)
								if (h == 0 && m == 0 && s == 0) {
									self.varStatus[`time_${opt.name}`] = undefined
									clearInterval(self.intVal[`time_${opt.name}`])
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
			},
		]
	}

	destroy() {
		this.log('debug', `destroyed ${this.id}`)
	}

	init() {
		this.updateConfig(this.config)
	}

	updateConfig(config) {
		this.config = config
		this.actions()
		this.feedbacks()
		this.presets()
	}
}
exports = module.exports = instance
