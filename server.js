const Express = require('express');
const bodyParser = require('body-parser');
const sse = require('./middlewares/Sse');
const robot = require('./models/Robot');
const scheduler = require('node-schedule');

const app = Express()
app.use( bodyParser.json() );
app.use(sse)
app.use(Express.static('dist'))

let connections = []

scheduler.scheduleJob('*/1 * * * * *', () => {
    const result = robot.getReport()
    robot.initStore()
    connections.forEach((res) => {
        res.sseSend(result)
    })
})

app.get("/",(req,res)=>{
    res.sendFile(path.resolve("dist/index.html"));
});

app.get('/robot/report', async (req, res) => {
    const result = robot.getReport();

    //Return JSON response
    res.contentType("application/json; charset=utf-8")
    res.end(JSON.stringify(result))
})

app.post('/robot/place', async (req, res) => {
    const result = {}

    robot.place(req.body.x, req.body.y, req.body.facing)

    //Return JSON response
    res.contentType("application/json; charset=utf-8")
    res.end(JSON.stringify(result))
})

app.post('/robot/move', async (req, res) => {
    const result = {}

    robot.move()

    //Return JSON response
    res.contentType("application/json; charset=utf-8")
    res.end(JSON.stringify(result))
})

app.post('/robot/rotate', async (req, res) => {
    const result = {}

    robot.rotate(req.body.rotation)

    //Return JSON response
    res.contentType("application/json; charset=utf-8")
    res.end(JSON.stringify(result))
})

app.get('/robot/report/stream', async (req, res) => {
    res.sseSetup()
    connections.push(res)
})

app.listen(3000, () => console.log('Socket opened on 3000...'))
