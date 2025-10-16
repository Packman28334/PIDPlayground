
const graphContainer = document.getElementById("graph-container");
const canvas = graphContainer.querySelector("canvas");
const ctx = canvas.getContext("2d");

const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
        canvas.width = entry.contentRect.width;
        canvas.height = entry.contentRect.height;
        drawGraph();
    }
});
resizeObserver.observe(graphContainer);

function drawGraph() {
    console.log("drawing");

    ctx.fillStyle = "black";
    ctx.fill();

    ctx.fillStyle = "#333333";
    ctx.fillRect(0, canvas.height/2, canvas.width, 1.5);

    ctx.strokeStyle = "red"
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    
    var xStep = canvas.width/pid.values.length
    var yStep = canvas.height/(pid.setpoint*2)
    var i = 0;
    pid.values.forEach((value) => {
        ctx.lineTo(i*xStep, canvas.height-value*yStep);
        i++;
    });

    ctx.stroke(); // ok who tf decided to name that function that
}