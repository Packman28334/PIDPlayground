
const pid = new PIDController();

const kP_FIELD = document.getElementById("kP");
const kI_FIELD = document.getElementById("kI");
const iLimit_FIELD = document.getElementById("iLimit");
const kD_FIELD = document.getElementById("kD");
const kFF_FIELD = document.getElementById("kFF");

const CONFIGURABLE_FIELDS = [kP_FIELD, kI_FIELD, iLimit_FIELD, kD_FIELD, kFF_FIELD];

function updatePidFromFields() {
    pid.kP = Number.parseFloat(kP_FIELD.value);
    pid.kI = Number.parseFloat(kI_FIELD.value);
    pid.iLimit = Number.parseFloat(iLimit_FIELD.value);
    pid.kD = Number.parseFloat(kD_FIELD.value);
    pid.kFF = Number.parseFloat(kFF_FIELD.value);
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
        Math.floor(Math.random()*50), // setpoint
        1, // momentum
        1, // error factor
        0 // error offset
    );
    pid.calculateAll(100);
    drawGraph();
}

randomizePIDSetpoint();