
async function fetchOrder() {
    const API_URL = "http://127.0.0.1:8000/orders/"
    try{
        const response = fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

export default fetchOrder