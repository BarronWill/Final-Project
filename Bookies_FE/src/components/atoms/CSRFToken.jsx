import StorageFactory from "../../services/auth/storageManagement";

function CSRFToken() {
    const storage = StorageFactory.createStorage("cookie")
    const csrftoken = storage.getItem("csrftoken")
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    )
}

export default CSRFToken