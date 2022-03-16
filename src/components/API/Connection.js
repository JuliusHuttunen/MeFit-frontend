export async function getFromAPI(query, token) {

    const url = 'https://fi-java-mefit-backend.herokuapp.com/api/v1/' + query

    try {
        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                
                "Authorization": "Bearer " + token,
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

export async function postGoalToAPI(item, token, profile) {

    const url = 'https://fi-java-mefit-backend.herokuapp.com/api/v1/goals'


    const jsonProfile = {"profileId": profile.profileId}
    const jsonProgram = () => {
        if (item.program !== null){
            return {"programId": item.program.programId}
        }
        else return null
    }
    const jsonWorkouts = () => {
        const workoutArray = []
        for(let workout of item.workouts){
            workoutArray.push({"workoutId": workout.workoutId})
        }
        return workoutArray
    }
    const jsonExercises = () => {
        const exerciseArray = []
        for(let exercise of item.exercises){
            exerciseArray.push({"exerciseId": exercise.exerciseId})
        }
        return exerciseArray
    }

    try {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify({
                    "endDate": item.endDate,
                    "profile": jsonProfile,
                    "achieved": item.achieved,
                    "program": jsonProgram(),
                    "workouts": jsonWorkouts(),
                    "exercises": jsonExercises(),
            }),
        }
        console.log(config.body)
        const response = await fetch(`${url}`, config)
        const data = await response.json()
        return [null, data]
    }
    catch (error) {
        return [error.message, null]
    }
}

export async function postUserLogin(username, password) {

    const url = 'https://fi-java-mefit-backend.herokuapp.com/login'

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

export async function getUserProfile(user) {

    const url = 'https://fi-java-mefit-backend.herokuapp.com/api/v1/profiles/' + user.profileId

    try {
        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.token,
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

export async function postUserRegister(user) {

    const url = 'https://fi-java-mefit-backend.herokuapp.com/register'

    try {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "firstName": user.firstname,
                "lastName": user.lastname,
                "email": user.email,
                "username": user.username,
                "password": user.pass
            }),
        }
        const response = await fetch(`${url}`, config)
        const data = await response.text()
        return [null, data]
    }
    catch (error) {
        return [error.message, null]
    }
}




