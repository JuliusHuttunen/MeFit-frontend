export async function getFromAPI(query) {

    const url = 'https://fi-java-mefit-backend.herokuapp.com/api/v1/' + query

    try {
        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }
        const response = await fetch(`${url}`, config)
        const data = await response.json()
        return [null, data]
    }
    catch (error) {
        return [error.message, null]
    }
}
