export default async function fetchBooks (){
    const API_URL = "http://127.0.0.1:8003/predict"
    try{
        const response = await fetch(API_URL , {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userId": "276726",
                "n_books": 50,
                "top_k": 10
            })
        })
        console.log("Get Book API successfully")
        return response
    } catch(error){
        console.log("Fail to get Book API")
    }
    
}
