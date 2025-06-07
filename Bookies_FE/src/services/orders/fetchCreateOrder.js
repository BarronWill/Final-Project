import StorageFactory from '../../services/auth/storageManagement'
async function fetchCreateOrder(data) {
    const API_URL = "http://127.0.0.1:8000/orders/"
    const storage = StorageFactory.createStorage("cookie")
    const csrfktoken = storage.getItem("csrftoken")
    try{
        const response = fetch(API_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfktoken
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(data)
        })
        return response
    } catch(error) {
        console.log(error)
    }
}

export default fetchCreateOrder