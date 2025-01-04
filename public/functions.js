const canvas = document.querySelector("#whiteboard");
const ctx = canvas.getContext("2d");

var io = io.connect(window.location.origin);

const penSlide = document.querySelector("#pen-width");
const inkColor = document.querySelectorAll(".color-switch");
const penButton = document.getElementById("pen");
const eraserBtn = document.getElementById("eraser");
const pointerBtn = document.getElementById("pointer");
const trashBtn = document.getElementById("trash");
const undoBtn = document.getElementById("undo");
const redoBtn = document.getElementById("redo");
const overDiv = document.querySelector(".overdiv");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

let isDrawing = false;
let penWidth = 7;
let selectedColor = "black";
let selectedTool = "pen";
let lastX = 0;
let lastY = 0;

let canvasHistory = [];
let historyStep = -1;

// Socket.io event handler for receiving drawing data
io.on("ondraw", ({ x, y, tool, color, width, isStarting }) => {
    if (isStarting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over";
        ctx.stroke();
    }
});

// Socket.io event handler for clear canvas
io.on("onclear", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = penWidth;
    ctx.strokeStyle = selectedColor;
    saveCanvasState();
});

const saveCanvasState = () => {
    if (historyStep < canvasHistory.length - 1) {
        canvasHistory = canvasHistory.slice(0, historyStep + 1);
    }
    canvasHistory.push(canvas.toDataURL());
    historyStep++;
};

const restoreCanvasState = () => {
    if (historyStep > 0) {
        historyStep--;
        let canvasPic = new Image();
        canvasPic.src = canvasHistory[historyStep];
        canvasPic.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(canvasPic, 0, 0);
        };
    }
};

const redoCanvasState = () => {
    if (historyStep < canvasHistory.length - 1) {
        historyStep++;
        let canvasPic = new Image();
        canvasPic.src = canvasHistory[historyStep];
        canvasPic.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(canvasPic, 0, 0);
        };
    }
};

const startDraw = (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    ctx.beginPath();
    ctx.lineWidth = penWidth;
    ctx.moveTo(lastX, lastY);
    
    // Emit starting position
    if (selectedTool !== "pointer") {
        io.emit("draw", {
            x: lastX,
            y: lastY,
            tool: selectedTool,
            color: selectedColor,
            width: penWidth,
            isStarting: true
        });
    }
};

const drawing = (e) => {
    if (!isDrawing) return;

    const currentX = e.offsetX;
    const currentY = e.offsetY;

    // Calculate the distance between current and last point
    const distance = Math.sqrt(
        Math.pow(currentX - lastX, 2) + Math.pow(currentY - lastY, 2)
    );

    if (selectedTool === "pen") {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = selectedColor;

        // If distance is large, interpolate points
        if (distance > 10) {
            const stepCount = Math.floor(distance / 2);
            for (let i = 1; i <= stepCount; i++) {
                const x = lastX + (currentX - lastX) * (i / stepCount);
                const y = lastY + (currentY - lastY) * (i / stepCount);
                
                ctx.lineTo(x, y);
                ctx.stroke();
                
                io.emit("draw", {
                    x,
                    y,
                    tool: selectedTool,
                    color: selectedColor,
                    width: penWidth
                });
            }
        } else {
            ctx.lineTo(currentX, currentY);
            ctx.stroke();
            
            io.emit("draw", {
                x: currentX,
                y: currentY,
                tool: selectedTool,
                color: selectedColor,
                width: penWidth
            });
        }
    } else if (selectedTool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";

        // Apply same interpolation for eraser
        if (distance > 10) {
            const stepCount = Math.floor(distance / 2);
            for (let i = 1; i <= stepCount; i++) {
                const x = lastX + (currentX - lastX) * (i / stepCount);
                const y = lastY + (currentY - lastY) * (i / stepCount);
                
                ctx.lineTo(x, y);
                ctx.stroke();
                
                io.emit("draw", {
                    x,
                    y,
                    tool: selectedTool,
                    width: penWidth
                });
            }
        } else {
            ctx.lineTo(currentX, currentY);
            ctx.strokeStyle = "rgb(0,0,0,1)";
            ctx.stroke();
            
            io.emit("draw", {
                x: currentX,
                y: currentY,
                tool: selectedTool,
                width: penWidth
            });
        }
    } else if (selectedTool === "pointer") {
        isDrawing = false;
    }

    [lastX, lastY] = [currentX, currentY];
};

undoBtn.addEventListener("click", restoreCanvasState);
redoBtn.addEventListener("click", redoCanvasState);

trashBtn.addEventListener("click", () => {
    overDiv.style.display = "flex";
});

noBtn.addEventListener("click", () => {
    overDiv.style.display = "none";
});

yesBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    overDiv.style.display = "none";
    io.emit("clear");
});

pointerBtn.addEventListener("click", () => {
    isDrawing = false;
    selectedTool = "pointer";
});

eraserBtn.addEventListener("click", () => {
    isDrawing = false;
    selectedTool = "eraser";
    ctx.globalCompositeOperation = "destination-out";
});

penSlide.addEventListener("input", () => {
    penWidth = penSlide.value;
    ctx.lineWidth = penWidth;
});

inkColor.forEach((swatch) => {
    swatch.addEventListener("click", () => {
        inkColor.forEach((btn) => btn.classList.remove("selected-color"));
        swatch.classList.add("selected-color");
        selectedColor = swatch.dataset.color;
        ctx.strokeStyle = selectedColor;
    });
});

penButton.addEventListener("click", () => {
    isDrawing = false;
    selectedTool = "pen";
    ctx.globalCompositeOperation = "source-over";
});

canvas.addEventListener("mousedown", (e) => {
    saveCanvasState();
    startDraw(e);
});

canvas.addEventListener("mousemove", drawing);

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    ctx.closePath();
});