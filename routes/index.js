module.exports = app => {

    app.use("/", require("./base.routes"));
    app.use("/", require("./auth.routes"));
    app.use("/", require("./user.routes"));
    
}