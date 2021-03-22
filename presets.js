module.exports = {
	getPresets: function() {
		var presets = []
		var self = this

		for(let k of this.config.countdown.split(";")) {
			let pst = {
				category: 'Countdown',
				label: `CountDown ${k}`,
				bank: {
					style: 'text',
					text: `${k}\\n\\n\$(TI:count_${k})`,
					size: 'auto',
					color: self.rgb(255, 255, 255),
					bgcolor: self.rgb(0, 0, 0),
					latch: false,
				},
				actions: [
					{
						action: 'countdown',
						options: {
							name: `${k}`,
							time: '0:10:00',
							func: 1,
						}
					}
				],
				feedbacks: [
					{
						type: 'countdown',
						options: {
							fg: this.rgb(0,0,0),
							bg: this.rgb(255,255,0),
							name: `${k}`,
							time: '0:05:00',
						}
					},{
						type: 'countdown',
						options: {
							fg: this.rgb(255,255,255),
							bg: this.rgb(255,0,0),
							name: `${k}`,
							time: '0:01:00',
						}
					}
				],
			}

			presets.push(pst)
		}

		for(let k of this.config.stopwatch.split(";")) {
			let pst = {
				category: 'Stopwatch',
				label: `Stopwatch ${k}`,
				bank: {
					style: 'text',
					text: `${k}\\n\\n\$(TI:stop_${k})`,
					size: 'auto',
					color: self.rgb(255, 255, 255),
					bgcolor: self.rgb(0, 0, 0),
					latch: false,
				},
				actions: [
					{
						action: 'stopwatch',
						options: {
							name: `${k}`,
							func: 1,
						}
					}
				],
				feedbacks: [
					{
						type: 'stopwatch',
						options: {
							fg: this.rgb(255,255,255),
							bg: this.rgb(255,0,0),
							name: `${k}`,
							time: '0:10:00',
						}
					}
				],
			}

			presets.push(pst)
		}

		return presets
	},
}
