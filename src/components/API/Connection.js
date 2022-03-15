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

export async function postGoalToAPI(item) {

    const url = 'https://fi-java-mefit-backend.herokuapp.com/api/v1/goals'

    try {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    "endDate": item.endDate,
                    "profile": item.profile,
                    "achieved": item.achieved,
                    "program": item.program,
                    "workouts": item.workouts,
                    "exercises": item.exercises,
            }),
        }
        const response = await fetch(`${url}`, config)
        const data = await response.json()
        return [null, data]
    }
    catch (error) {
        return [error.message, null]
    }
}

export async function postUserLogin(username, password) {

    const url = 'https://fi-java-mefit-backend.herokuapp.com/api/v1/login'

    try {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    "username": username,
                    "password": password
            }),
        }
        const response = await fetch(`${url}`, config)
        const data = await response.json()
        return [null, data]
    }
    catch (error) {
        return [error.message, null]
    }
}


