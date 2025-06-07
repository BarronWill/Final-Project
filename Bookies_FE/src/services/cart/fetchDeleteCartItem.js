import StorageFactory from "../auth/storageManagement"

async function deleteCartItem(book_id){
    const API_URL = `http://127.0.0.1:8000/cart/delete/book/${book_id}/`
    const storage = StorageFactory.createStorage("cookie")
    const csrftoken = storage.getItem("csrftoken")
    try{
        const response = await fetch(API_URL, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            mode: "cors",
            credentials: 'include',
        })
        return response
    } catch(error){
        console.log(error)
    }
}

export default deleteCartItem