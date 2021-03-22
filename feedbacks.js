module.exports = {
	getFeedbacks : function(i) {
		var self = this
		var feedbacks = {}

		let ele = []
		for (let k of self.getAllActions()) {
			if (k.action == 'countdown') {
				ele.push({label: k.options.name, id: k.options.name})
			}
		}

		feedbacks['countdown'] = {
			label: `Countdown`,
			description: 'Changes color when a certain time is reached',
			options: [
				{
					type: 'colorpicker',
					label: 'Foreground color',
					id: 'fg',
					default: this.rgb(255,255,255),
				},{
					type: 'colorpicker',
					label: 'Background color',
					id: 'bg',
					default: this.rgb(0,0,0),
				},{
					type:	'dropdown',
					label:	'Name (same as action)',
					id:		'name',
					default:	[],
					choices:	ele,
				},{
					type:	'textinput',
					label:	'Time (h:mm:ss)',
					id:		'time',
					default:	'0:00:00',
					regex:	'/^(0*[0-9]|1[0-9]|2[0-3]):(0*[0-9]|[1-5][0-9]|60):(0*[0-9]|[1-5][0-9]|60)$/',
				}
			],
			callback: (feedback, bank) => {
				return this.feedbackStatus(
					feedback,
					bank
				)
			},
		}

		ele = []
		for (let k of self.getAllActions()) {
			if (k.action == 'stopwatch') {
				ele.push({label: k.options.name, id: k.options.name})
			}
		}

		feedbacks['stopwatch'] = {
			label: `Stopwatch`,
			description: 'Changes color when a certain time is reached',
			options: [
				{
					type: 'colorpicker',
					label: 'Foreground color',
					id: 'fg',
					default: this.rgb(255,255,255),
				},{
					type: 'colorpicker',
					label: 'Background color',
					id: 'bg',
					default: this.rgb(0,0,0),
				},{
					type:	'dropdown',
					label:	'Name (same as action)',
					id:		'name',
					default:	[],
					choices:	ele,
				},{
					type:	'textinput',
					label:	'Time (h:mm:ss)',
					id:		'time',
					default:	'0:00:00',
					regex:	'/^(0*[0-9]|1[0-9]|2[0-3]):(0*[0-9]|[1-5][0-9]|60):(0*[0-9]|[1-5][0-9]|60)$/',
				}
			],
			callback: (feedback, bank) => {
				return this.feedbackStatus(
					feedback,
					bank
				)
			},
		}

		return feedbacks
	},

	feedbackStatus : function(feedback, bank) {
		var ret = {}
		let d, c
		let nam = feedback.type == 'countdown' ? 'count' : 'stop'

		var tm
		this.getVariable(`${nam}_${feedback.options.name}`, function(res){
			tm = res
		})

		let [h, m, s] = tm.split(":")
		d = new Date((((h-1)*60*60*1000) + (m*60*1000) + (s*1000)));

		[h, m, s] = feedback.options.time.split(":")
		c = new Date((((h-1)*60*60*1000) + (m*60*1000) + (s*1000)));

		let ck = this.continue[`${nam}_${feedback.options.name}`] || false
		let vr = this.varStatus[`${nam}_${feedback.options.name}`] || 0

		if ( ((d <= c && nam == 'count') || (d >= c && nam == 'stop') || ck) && vr > 0 ) {
			ret = {
				color: feedback.options.fg,
				bgcolor: feedback.options.bg
			}
		} else if (vr == 0) {
			ret = {
				color: bank.color,
				bgcolor: bank.bgcolor
			}
		}

		return ret
	},
}
