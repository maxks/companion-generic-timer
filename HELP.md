# Generic Timer module

## Functions:
*	Countdown
*	Stopwatch

## Special functions:
*	Feedbacks
*	Presets

Current version: 1.0.0

Start version: 1.0.0

## How to:

### New countdown / Stopwatch
Add new button and set the Press/On action you prefer between countdown and stopwatch. Then, only for countdown, set timer in format 0:00:00 (hours, minutes, seconds). The option "Name" need to be univoque and different from other timers. The option "Function" set action steps when you press the button on sequence.
To displaying timer on button, set the "Button text" with it's variable $(TI:time_name) where "name" is the name of the action you set.
Example: if you set action name like "cdown1", it's variable is $(TI:time_cdown1).

After action config press once the button to set it up.

### Feedbacks
It changes color when a certain timer value is reached. The configuration is similar to the action configuration: the "Time" option is the value you want to reach in the format 0:00:00 (hours, minutes, seconds); the "Name" option must have the same value as the "Name" option of the action.
