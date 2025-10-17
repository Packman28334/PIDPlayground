
const pid = new PIDController();

const kP_FIELD = document.getElementById("kP");
const kI_FIELD = document.getElementById("kI");
const iLimit_FIELD = document.getElementById("iLimit");
const kD_FIELD = document.getElementById("kD");
const kFF_FIELD = document.getElementById("kFF");

const CONFIGURABLE_FIELDS = [kP_FIELD, kI_FIELD, iLimit_FIELD, kD_FIELD, kFF_FIELD];

var debug_mode = false;

function updatePidFromFields() {
    if (kP_FIELD.value && kI_FIELD.value && iLimit_FIELD.value && kD_FIELD.value && kFF_FIELD.value) {
        pid.kP = Number.parseFloat(kP_FIELD.value);
        pid.kI = Number.parseFloat(kI_FIELD.value);
        pid.iLimit = Number.parseFloat(iLimit_FIELD.value);
        pid.kD = Number.parseFloat(kD_FIELD.value);
        pid.kFF = Number.parseFloat(kFF_FIELD.value);
    }
}

CONFIGURABLE_FIELDS.forEach((field) => {
    field.addEventListener("input", (ev) => {
        updatePidFromFields();
        pid.calculateAll(100);
        drawGraph();
    });
});

function randomizePIDSetpoint() {
    pid.setReference(
        Math.floor(Math.random()*50), // setpoint (random int between 0 and 50)
        Math.floor(Math.random()*50)/100+0.25, // momentum (random float between 0.75 and 1.25)
        Math.floor(Math.random()*50)/100+0.25, // error factor (random float between 0.75 and 1.25),
        Math.floor(Math.random()*50)/50-0.5 // error offset (random float between -0.5 and 0.5)
    );
    pid.calculateAll(100);
    drawGraph();
    kP_FIELD.value = "0";
    kI_FIELD.value = "0";
    iLimit_FIELD.value = "0";
    kD_FIELD.value = "0";
    kFF_FIELD.value = "0";
}

randomizePIDSetpoint();