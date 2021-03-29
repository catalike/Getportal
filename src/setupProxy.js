const {createProxyMiddleware} = require("http-proxy-middleware");
module.exports = function(app){
    app.use(
        createProxyMiddleware("/addgroups",{
            target:"http://localhost:3001",
            changeOrigin:true,
            pathRewrite:{
                "^/addgroups":""
            }
        })
    )
}
