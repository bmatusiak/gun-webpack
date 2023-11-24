
const path = require('path');
var gunPath = path.dirname(require.resolve("gun"))

module.exports = function (express, app) {
    var { server } = app;

    var GUN_PEER = process.env.GUN_PEER || (() => { throw new Error("CHANGE_ME") })();
    console.log(GUN_PEER)

    //dom/window object
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const dom = new JSDOM();
    global.window = dom.window;


    //gun
    var Gun = require("gun/gun.js");
    Gun.serve = require('gun/lib/serve');
    Gun.on('opt', function (root) {
        var u;
        if (u === root.opt.super) { root.opt.super = true }
        if (u === root.opt.faith) { root.opt.faith = true } // HNPERF: This should probably be off, but we're testing performance improvements, please audit.
        root.opt.log = root.opt.log || Gun.log;
        this.to.next(root);
    })
    require('gun/lib/wire');
    try { require('gun/sea'); } catch (e) { }
    require('gun/lib/multicast');
    require('gun/lib/stats');

    app.use("/gun", express.static(gunPath));//serve gun files

    //gun stats page
    //example url = http://localhost:8080/gun/stats.html
    app.use("/gun", (req, res, next) => {
        if (req.originalUrl == "/gun" || req.originalUrl == "/gun/" || req.originalUrl == "/gun/stats")
            res.redirect("/gun/stats.html")
        else
            next();
    });
    app.use("/gun/", express.static(gunPath + '/examples'));


    //gun/server logic
    var gun = Gun({ web: server, peers: [GUN_PEER] })

    gun.get("some").get("important").get("key").on(function (data, $g) {
        console.log(data);
    });

    gun.get("some").get("important").get("key2").on(function (data, $g) {
        console.log(data);
    });



}