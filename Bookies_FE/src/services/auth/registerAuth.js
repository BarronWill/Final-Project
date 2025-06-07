async function registerAuth(username, password){
    const API_URL = "http://127.0.0.1:8000/users/"
    const data = {
        username: username,
        password: password
    }
    try{
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        
        return response

    } catch (error) {
        console.log("Failed to fetch API from register")
    }
}

export default registerAuth