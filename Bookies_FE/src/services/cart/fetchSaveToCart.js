import StorageFactory from "../auth/storageManagement"

async function saveToCart(book_id){
    const API_URL = `http://127.0.0.1:8000/cart/save/book/${book_id}/`
    const STORAGE_TYPE = "cookie"
    const storage = StorageFactory.createStorage(STORAGE_TYPE)
    const csrftoken = storage.getItem("csrftoken")
    try{
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({csrftoken})
        })
        return response
    } catch(error) {
        console.log(error)
    }
}

export default saveToCart