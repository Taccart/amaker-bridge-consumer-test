function get_sensors_string () {
    msg = "Sensors:"
    msg = "" + msg + "\n-magneticForce\n  -x = " + input.magneticForce(Dimension.X).toString() + "\n  -y = " + input.magneticForce(Dimension.Y).toString() + "\n  -z = " + input.magneticForce(Dimension.Z).toString()
    msg = "" + msg + "\n-rotation\n  -pitch =" + input.rotation(Rotation.Pitch).toString() + "\n  -roll = " + input.rotation(Rotation.Roll).toString()
    msg = "" + msg + "\n-temperature = " + input.temperature()
    msg = "" + msg + "\n-lightLevel = " + input.lightLevel()
    msg = "" + msg + "\n-compassHeading = " + input.compassHeading()
    return msg
}
input.onGesture(Gesture.EightG, function () {
    emit("EightG")
})
function broadcast_info () {
    emit(" listening on " + radio_group)
}
function update_radio_group (i: number) {
    radio_group += i
    if (radio_group >= radio_group_max) {
        radio_group = radio_group_min
    } else if (radio_group < radio_group_min) {
        radio_group = radio_group_max
    }
    basic.showNumber(radio_group)
    radio.setGroup(radio_group)
    broadcast_info()
}
function emit (message: string) {
    emitmsg = "" + control.deviceName() + ":" + control.millis().toString() + " : " + message + ": " + ""
    console.log(emitmsg)
radio.sendString(emitmsg)
}
// This code convert serial to radio and radio to signal
input.onButtonPressed(Button.A, function () {
    update_radio_group(-1)
})
input.onGesture(Gesture.FreeFall, function () {
    emit("FreeFall")
})
input.onGesture(Gesture.TiltLeft, function () {
    emit("TiltLeft")
})
input.onGesture(Gesture.SixG, function () {
    emit("SixG")
})
input.onGesture(Gesture.ScreenUp, function () {
    emit("ScreenUp")
})
input.onGesture(Gesture.ScreenDown, function () {
    emit("ScreenDown")
})
radio.onReceivedString(function (receivedString) {
    console.log("received " + receivedString)
emit("string_received = " + receivedString)
})
// This code convert serial to radio
// 
// and radio to signal
input.onButtonPressed(Button.B, function () {
    update_radio_group(1)
})
input.onGesture(Gesture.Shake, function () {
    emit("Shake")
})
input.onGesture(Gesture.TiltRight, function () {
    emit("TiltRight")
})
input.onGesture(Gesture.ThreeG, function () {
    emit("ThreeG")
})
let msg = ""
let radio_group_min = 0
let radio_group = 0
let radio_group_max = 0
let emitmsg = ""
radio_group_max = 8
radio_group = radio_group_min
radio.setGroup(radio_group)
basic.showNumber(radio_group)
broadcast_info()
console.log("Set RadioGroup via button A (inc) and B (dec)")
