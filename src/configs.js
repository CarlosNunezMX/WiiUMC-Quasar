function SeeIfLogged(){
    return {
        logged: localStorage.getItem("server") ? true : false,
        server: localStorage.getItem("server")
    }
}

export default {
    "frontend_v": "Develop",
    // ip: "https://wiiumc.herokuapp.com"
    ip: SeeIfLogged()
}