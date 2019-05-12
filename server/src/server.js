const koa = require('koa');
const koaBody = require('koa-body');
const koaRouter = require('koa-router');
const koaMount = require('koa-mount');
const koaStatic = require('koa-static');
const path = require('path');

const app = new koa();
const lightRouter = new koaRouter();

var lightState = false;

lightRouter.post('/light/switchLight', async (ctx, next) => {
    const {newLightState} = ctx.request.body;
    lightState = newLightState;
    ctx.response.status = 200;
    ctx.response.type = 'json';
    ctx.response.body = {
        lightState: newLightState
    };
});

lightRouter.get('/light/getLightState', async (ctx, next) => {
    ctx.response.status = 200;
    ctx.response.type = 'json';
    ctx.response.body = {
        lightState: lightState
    };
});

app
.use(koaBody())
.use(lightRouter.routes())
.use(koaMount('/light', koaStatic(path.resolve(__dirname, '../dist/'))));

const port = 80;
app.listen(port, () => {
    console.log(`Server is on and is running on port ${port}`);
});