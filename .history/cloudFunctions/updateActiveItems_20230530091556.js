//Create a new collection called "Active Items"
//Add items when they are listed in the market
//And Remove then when the are bought or cancelled..
const Parse = require("parse")

Parse.Cloud.afterSave("", () => {})
