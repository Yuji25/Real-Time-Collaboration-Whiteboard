let express = require("express");
let app = express();
let httpServer = require("http").createServer(app);
let io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let connections = [];

io.on("connect", (socket) => {
    connections.push(socket);
    console.log(`Connected: ${socket.id}`);

    // Your existing event handlers remain the same
    socket.on("draw", (data) => {
        connections.forEach((conn) => {
            if(conn.id !== socket.id){
                conn.emit("ondraw", {
                    x: data.x,
                    y: data.y,
                    tool: data.tool,
                    color: data.color,
                    width: data.width,
                    isStarting: data.isStarting
                });
            }
        });
    });

    socket.on("clear", () => {
        connections.forEach((conn) => {
            if(conn.id !== socket.id){
                conn.emit("onclear");
            }
        });
    });

    // New event handlers for shapes and text
    socket.on("shapeStart", (data) => {
        connections.forEach((conn) => {
            if(conn.id !== socket.id) {
                conn.emit("onShapeStart", data);
            }
        });
    });

    socket.on("shapeUpdate", (data) => {
        connections.forEach((conn) => {
            if(conn.id !== socket.id) {
                conn.emit("onShapeUpdate", data);
            }
        });
    });

    socket.on("shapeEnd", (data) => {
        connections.forEach((conn) => {
            if(conn.id !== socket.id) {
                conn.emit("onShapeEnd", data);
            }
        });
    });

    socket.on("textAdd", (data) => {
        connections.forEach((conn) => {
            if(conn.id !== socket.id) {
                conn.emit("onTextAdd", data);
            }
        });
    });

    socket.on("disconnect", (reason) => {
        connections = connections.filter((conn) => conn.id !== socket.id);
        console.log(`Disconnected: ${socket.id}`);
    });
});

app.use(express.static("public"));

let PORT = process.env.PORT || 5501;
httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));