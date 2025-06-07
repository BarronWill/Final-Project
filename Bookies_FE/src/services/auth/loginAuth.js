import StorageFactory from "./storageManagement"

async function loginAuth(username, password) {
    const API_URL = "http://127.0.0.1:8000/users/login/"
    const EXPIRE_DAY = 7
    const STORAGE_TYPE = "cookie"
    const storage = StorageFactory.createStorage(STORAGE_TYPE)
    const data = {
        username: username, 
        password: password 
    }

    try{
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        const session_key = result["sessionid"]
        const csrf_token = result["csrftoken"]
        storage.setItem("sessionid", session_key, EXPIRE_DAY)
        storage.setItem("csrftoken", csrf_token, EXPIRE_DAY)

        return response
    } catch (error) {
        console.log(error)
    }
}

export default loginAuth