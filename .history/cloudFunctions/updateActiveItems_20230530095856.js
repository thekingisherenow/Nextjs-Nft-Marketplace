//Create a new collection called "Active Items"
//Add items when they are listed in the market
//And Remove then when the are bought or cancelled..
const Parse = require("parse")
console.log("Parse.CLoud", Parse.Cloud)
Parse.Cloud.afterSave(() => {
    console.log("yoo")
})
// afterSave("ItemListedLogs", async (request) => {
//     const confirmed = request.Object.get("confirmed")
//     console.log("confirmed", confirmed)
// })
