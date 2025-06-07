
async function fetchProfile() {
    const API_URL = "http://127.0.0.1:8000/users/get/profile/"
    try{
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

export default fetchProfile