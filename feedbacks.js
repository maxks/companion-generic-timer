module.exports = {
	getFeedbacks : function(i) {
		var feedbacks = {}

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
					type:	'textinput',
					label:	'Name (same as action)',
					description: 'Same as cuntdown action name',
					id:		'name',
					default:	'',
					regex:	'/^[^\\s]{3,}$/',
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
					type:	'textinput',
					label:	'Name (same as action)',
					description: 'Same as stopwatch action name',
					id:		'name',
					default:	'',
					regex:	'/^[^\\s]{3,}$/',
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
		var tm
		this.getVariable(`time_${feedback.options.name}`, function(res){
			tm = res
		})

		let [h, m, s] = tm.split(":")
		d = new Date((((h-1)*60*60*1000) + (m*60*1000) + (s*1000)));

		[h, m, s] = feedback.options.time.split(":")
		c = new Date((((h-1)*60*60*1000) + (m*60*1000) + (s*1000)));

		if ( (d <= c && feedback.type == 'countdown') || (d >= c && feedback.type == 'stopwatch') ) {
			ret = {
				color: feedback.options.fg,
				bgcolor: feedback.options.bg
			}
		} else if (this.varStatus[`time_${feedback.options.name}`] == 0) {
			ret = {
				color: bank.color,
				bgcolor: bank.bgcolor
			}
		}

		return ret
	},
}
