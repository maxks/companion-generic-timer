module.exports = {
	getVariables : function() {
		var variables = []
		var self = this

		for(let k of this.config.countdown.split(";")) {
			variables.push({
				label: `Countdown ${k}`,
				name: `count_${k}`,
			})

			self.setVariable(`count_${k}`, '0:00:00')
		}

		for(let k of this.config.stopwatch.split(";")) {
			variables.push({
				label: `Stopwatch ${k}`,
				name: `stop_${k}`,
			})

			self.setVariable(`stop_${k}`, '0:00:00')
		}

		return variables
	},
}
