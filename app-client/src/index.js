var Gun = require("gun/gun");
var SEA = require("gun/sea");

(async ()=>{
    console.log(await SEA.pair())
})();
//gun/server logic
var gun = Gun({ peers: ["http://localhost:8080/gun"] })

gun.get("some").get("important").get("key").on(function (data, $g) {
    console.log(data);
});