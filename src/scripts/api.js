export function isProd(){
    console.log("ENV:",process.env.NODE_ENV)
    return process.env.NODE_ENV!="development"
}