
class PIDController {
    constructor() {
        this.kP = 0;
        this.kI = 0;
        this.iLimit = 0;
        this.kD = 0;

        this.setpoint = 0;

        this.values = [];

        this.sumOfErrors = 0;
        this.lastError = 0;
    }

    setReference(setpoint, weight) {
        this.setpoint = setpoint;
    }

    calculateP(error) {
        return error;
    }

    calculateI(error) {
        if (this.iLimit > 0 && Math.abs(error) < this.iLimit) {
            this.sumOfErrors += error;
        }
        return this.sumOfErrors;
    }

    calculateD(error) {
        var derivative = error - this.lastError;
        this.lastError = error;
        return derivative;
    }

    calculate(currentValue) {
        var error = this.setpoint - currentValue;
        var correction = this.calculateP(error)*this.kP + this.calculateI(error)*this.kI + this.calculateD(error)*this.kD;
        console.log([error, correction]);
        return currentValue + correction;
    }

    calculateAll(n) {
        this.values = [];
        this.sumOfErrors = 0;
        var currentValue = 0;
        for(let i=0; i<n; i++) {
            this.values.push(currentValue);
            currentValue = this.calculate(currentValue);
        } 
    }
}