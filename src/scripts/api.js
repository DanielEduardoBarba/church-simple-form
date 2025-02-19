export function isProd() {
    console.log("ENV:", process.env.NODE_ENV)
    return process.env.NODE_ENV != "development"
}
let server = ""
export function setServer() {
    if (isProd()) server = "https://church-api-la-roca.web.app"
    else  server = "http://localhost:5002"
}