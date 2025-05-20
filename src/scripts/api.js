export function isProd() {
    // console.log("ENV:", process.env.NODE_ENV)
    return process.env.NODE_ENV != "development"
} 
export function server() {
    if (isProd()) return "https://church-api-la-roca.web.app"
    else  return"http://localhost:5002"
}

