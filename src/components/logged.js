/**
 * 
 * @param {boolean} redirect Redirigira al usuario?
 */
export function logged(redirect){
    const server = localStorage.getItem("server");
    if(!server && redirect){
        return location.replace("/#/connect");
    }
    else if(!server){
        return false
    }
}