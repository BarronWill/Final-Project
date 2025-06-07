import StorageFactory from "../auth/storageManagement"

async function fetchCreateAddress(data) {
    const API_URL = "http://127.0.0.1:8000/users/create/address/"
    const storage = StorageFactory.createStorage("cookie")
    const csrftoken = storage.getItem("csrftoken")

    try{
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(data)
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

export default fetchCreateAddress