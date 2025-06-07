import StorageFactory from "./storageManagement"

async function logoutAuth(){
    const API_URL = "http://127.0.0.1:8000/users/logout/"
    const storage = StorageFactory.createStorage("cookie")
    const csrftoken = storage.getItem("csrftoken")
    
    try{
        const response = await fetch(API_URL, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json",
                "X-CSRFToken" : csrftoken,
            },
            credentials: "include"
        })
        return response
    } catch(error){
        console.log("Failed to fetch logout API")
    }
}

export default logoutAuth