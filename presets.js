module.exports = {
	getPresets: function() {
		var presets = []
		var self = this

		for (let i = 1; i <= 10; i++) {
			let pst = {
				category: 'Countdown',
				label: `CountDown ${i}`,
				bank: {
					style: 'text',
					text: `CDown ${i}\\n\\n\$(TI:time_cd${i})`,
					size: 'auto',
					color: self.rgb(255, 255, 255),
					bgcolor: self.rgb(0, 0, 0),
					latch: false,
				},
				actions: [
					{
						action: 'countdown',
						options: {
							name: `cd${i}`,
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
							name: `cd${i}`,
							time: '0:05:00',
						}
					},{
						type: 'countdown',
						options: {
							fg: this.rgb(255,255,255),
							bg: this.rgb(255,0,0),
							name: `cd${i}`,
							time: '0:01:00',
						}
					}
				],
			}

			presets.push(pst)
		}

		for (let i = 1; i <= 10; i++) {
			let pst = {
				category: 'Stopwatch',
				label: `Stopwatch ${i}`,
				bank: {
					style: 'text',
					text: `SWatch ${i}\\n\\n\$(TI:time_sw${i})`,
					size: 'auto',
					color: self.rgb(255, 255, 255),
					bgcolor: self.rgb(0, 0, 0),
					latch: false,
				},
				actions: [
					{
						action: 'stopwatch',
						options: {
							name: `sw${i}`,
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
							name: `sw${i}`,
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
