//Component handling requests between database/API/backend and frontend
import KeycloakService from "../../KeycloakService";

//GET EXERCISES, WORKOUTS OR PROGRAMS
export async function getFromAPI(query) {
  const url = "https://fi-java-mefit-backend.herokuapp.com/api/v1/" + query;
  const token = KeycloakService.getToken();

  try {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(`${url}`, config);
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}

//POST NEW GOAL TO API
export async function postGoalToAPI(item) {
  const url = "https://fi-java-mefit-backend.herokuapp.com/api/v1/goals";
  const token = KeycloakService.getToken();

  const jsonProfile = { profileId: KeycloakService.getId() };
  const jsonProgram = () => {
    if (item.program !== null) {
      return { programId: item.program.programId };
    } else return null;
  };
  const jsonWorkouts = () => {
    const workoutArray = [];
    for (let wo of item.workouts) {
      workoutArray.push({
        completed: false,
        workout: { workoutId: wo.workoutId }
      });
    }
    return workoutArray;
  };
  const jsonExercises = () => {
    const exerciseArray = [];
    for (let exer of item.exercises) {
      exerciseArray.push({
        completed: false,
        exercise: { exerciseId: exer.exerciseId }
      });
    }
    return exerciseArray;
  };

  try {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        startDate: item.startDate,
        endDate: item.endDate,
        profile: jsonProfile,
        achieved: item.achieved,
        program: jsonProgram(),
        workouts: jsonWorkouts(),
        exercises: jsonExercises(),
      }),
    };
    console.log(config.body);
    const response = await fetch(`${url}`, config);
    const data = await response.text();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}

//SET A GOAL AS ACHIEVED
export async function setGoalCompleted(goal, boolean) {
  const url =
    "https://fi-java-mefit-backend.herokuapp.com/api/v1/goals/" + goal.goalId;
  const token = KeycloakService.getToken();

  const jsonProgram = () => {
    if (goal.program !== null) {
      return { programId: goal.program.programId };
    } else return null;
  };
  const jsonWorkouts = () => {
    const workoutArray = [];
    for (let wo of goal.workouts) {
      workoutArray.push({
        completed: true,
        workout: { workoutId: wo.workout.workoutId }
      });
    }
    return workoutArray;
  };
  const jsonExercises = () => {
    const exerciseArray = [];
    for (let exer of goal.exercises) {
      exerciseArray.push({
        completed: true,
        exercise: { exerciseId: exer.exercise.exerciseId }
      })
    }
    return exerciseArray;
  };

  try {
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        goalId: goal.goalId,
        endDate: goal.endDate,
        startDate: goal.startDate,
        achieved: boolean,
        profile: {
          profileId: KeycloakService.getId()
        },
        program: jsonProgram(),
        workouts: jsonWorkouts(),
        exercises: jsonExercises()
      }),
    };
    const response = await fetch(`${url}`, config);
    const data = await response.text();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}

//GET USER PROFILE
export async function getUserProfile() {
  const userId = KeycloakService.getId();
  const token = KeycloakService.getToken();
  const url =
    "https://fi-java-mefit-backend.herokuapp.com/api/v1/profiles/" + userId;

  try {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(`${url}`, config);
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}

//GET ALL USERS FROM KEYCLOAK
export async function getKeycloakUsers() {
  const token = KeycloakService.getToken();
  const url =
    "https://fi-java-mefit-keycloak.herokuapp.com/auth/admin/realms/mefit/users";

  try {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(`${url}`, config);
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}

//REGULAR USER REQUEST FOR CONTRIBUTOR ROLE
export async function requestContributorRole() {
  const token = KeycloakService.getToken();
  const url =
    "https://fi-java-mefit-keycloak.herokuapp.com/auth/realms/mefit/account/";

  try {
    const config = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: KeycloakService.getEmail(),
        firstName: KeycloakService.getFirstName(),
        lastName: KeycloakService.getLastName(),
        attributes: {
          contributorRequest: [true],
        },
      }),
    };
    const response = await fetch(`${url}`, config);
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}

//CONTRIBUTOR REQUEST -> OFF
export async function completeContributorRequest(userId) {
  const token = KeycloakService.getToken();
  const url = `https://fi-java-mefit-keycloak.herokuapp.com/auth/admin/realms/mefit/users/${userId}`;

  try {
    const config = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attributes: {
          contributorRequest: [false],
        },
      }),
    };
    const response = await fetch(`${url}`, config);
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}

//ADD USER AS A CONTRIBUTOR
export async function addContributorRole(userId) {
  const token = KeycloakService.getToken();
  const url = `https://fi-java-mefit-keycloak.herokuapp.com/auth/admin/realms/mefit/users/${userId}/role-mappings/realm`;

  try {
    const config = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          id: "cd237d3e-0501-4779-9224-14a49641d35b",
          name: "contributor",
          composite: false,
          clientRole: false,
          containerId: "b362efb8-43a0-45f3-b5d1-78ae63549405",
        },
      ]),
    };
    const response = await fetch(`${url}`, config);
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}

//REMOVE CONTRIBUTOR ROLE FROM USER
export async function deleteContributorRole(userId) {
  const token = KeycloakService.getToken();
  const url = `https://fi-java-mefit-keycloak.herokuapp.com/auth/admin/realms/mefit/users/${userId}/role-mappings/realm`;

  try {
    const config = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          id: "cd237d3e-0501-4779-9224-14a49641d35b",
          name: "contributor",
          composite: false,
          clientRole: false,
          containerId: "b362efb8-43a0-45f3-b5d1-78ae63549405",
        },
      ]),
    };
    const response = await fetch(`${url}`, config);
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}

//DELETE KEYCLOAK USER
export async function deleteUser(userId) {
  const token = KeycloakService.getToken();
  const url = `https://fi-java-mefit-keycloak.herokuapp.com/auth/admin/realms/mefit/users/${userId}`;

  try {
    const config = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(`${url}`, config);
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}

//DELETE PROFILE FROM API
export async function deleteProfileToApi(userId) {
  const token = KeycloakService.getToken();
  const url = `https://fi-java-mefit-backend.herokuapp.com/api/v1/profiles/${userId}`;

  try {
    const config = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
    const response = await fetch(`${url}`, config);
    const data = await response.text();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}

//CREATE NEW PROFILE
export async function postProfileToAPI(profile) {
  const url = "https://fi-java-mefit-backend.herokuapp.com/api/v1/profiles";
  const token = KeycloakService.getToken();
  const userId = KeycloakService.getId();

  try {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        profileId: userId,
        weight: profile.weight,
        height: profile.height,
        fitnessLevel: profile.fitness_level,
        medicalConditions: profile.medical_conditions,
        disabilities: profile.disabilities,
        /* Needs modification to back-end*/
        address: {
          // "addressId":
          addressLine_1: profile.address_line_1,
          addressLine_2: profile.address_line_2,
          addressLine_3: profile.address_line_3,
          postalCode: profile.postal_code,
          city: profile.city,
          country: profile.country,
        },
        goals: [],
        workouts: [],
        exercise: [],
        program: [],
      }),
    };
    const response = await fetch(`${url}`, config);
    const data = await response.text();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}

//UPDATE USER PROFILE
export async function updateProfileToAPI(profile) {
  const userId = KeycloakService.getId();
  const token = KeycloakService.getToken();
  const url =
    "https://fi-java-mefit-backend.herokuapp.com/api/v1/profiles/" + userId;

  try {
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        weight: profile.weight,
        height: profile.height,
        fitnessLevel: profile.fitness_level,
        medicalConditions: profile.medical_conditions,
        disabilities: profile.disabilities,
        /* Needs modification to back-end*/
        address: {
          // "addressId":
          addressLine_1: profile.address_line_1,
          addressLine_2: profile.address_line_2,
          addressLine_3: profile.address_line_3,
          postalCode: profile.postal_code,
          city: profile.city,
          country: profile.country,
        },
      }),
    };
    const response = await fetch(`${url}`, config);
    const data = await response.text();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}

//POST NEW EXERCISE TO API
export async function postExerciseToAPI(exercise) {
  const token = KeycloakService.getToken()
  const url = "https://fi-java-mefit-backend.herokuapp.com/api/v1/exercises"

  try {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: exercise.name,
        description: exercise.description,
        targetMuscleGroup: exercise.targetMuscleGroup,
        image: null,
        fitnessLevel: exercise.fitnessLevel,
        vidLink: null,
        profile: {
          profileId: KeycloakService.getId()
        }
      }),
    };
    console.log(config.body)
    const response = await fetch(`${url}`, config);
    const data = await response.text();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}

//POST NEW WORKOUT TO API
export async function postWorkoutToAPI(workout) {
  const token = KeycloakService.getToken()
  const url = "https://fi-java-mefit-backend.herokuapp.com/api/v1/workouts"

  const jsonSets = () => {
    const setArray = []
    if (workout.exerciseId1 !== "" && workout.exerciseRepetitions1 !== "") {
      setArray.push(
        {
          exerciseRepetitions: workout.exerciseRepetitions1,
          exercise: {
            exerciseId: workout.exerciseId1
          }
        })
    }
    if (workout.exerciseId2 !== "" && workout.exerciseRepetitions2 !== "") {
      setArray.push(
        {
          exerciseRepetitions: workout.exerciseRepetitions2,
          exercise: {
            exerciseId: workout.exerciseId2
          }
        })
    }
    if (workout.exerciseId3 !== "" && workout.exerciseRepetitions3 !== "") {
      setArray.push(
        {
          exerciseRepetitions: workout.exerciseRepetitions3,
          exercise: {
            exerciseId: workout.exerciseId3
          }
        })
    }
    return setArray
  }

  try {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: workout.name,
        type: workout.type,
        sets: jsonSets(),
        profile: {
          profileId: KeycloakService.getId()
        }
      }),
    };
    console.log(config.body)
    const response = await fetch(`${url}`, config);
    const data = await response.text();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}

//POST NEW PROGRAM TO API
export async function postProgramToAPI(program) {
  const token = KeycloakService.getToken()
  const url = "https://fi-java-mefit-backend.herokuapp.com/api/v1/programs"

  const jsonWorkouts = () => {
    const workoutArray = []
    if (program.workoutId1 !== "") {
      workoutArray.push(
        { workoutId: program.workoutId1 })
    }
    if (program.workoutId2 !== "") {
      workoutArray.push(
        { workoutId: program.workoutId2 })
    }
    if (program.workoutId2 !== "") {
      workoutArray.push(
        { workoutId: program.workoutId2 })
    }
    return workoutArray
  }

  try {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: program.name,
        category: program.category,
        workouts: jsonWorkouts(),
        profile: {
          profileId: KeycloakService.getId()
        }
      }),
    };
    const response = await fetch(`${url}`, config);
    const data = await response.text();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}

//UPDATE AN EXERCISE WITH PATCH
export async function updateExerciseToAPI(exercise, id) {
  const token = KeycloakService.getToken()
  const url = "https://fi-java-mefit-backend.herokuapp.com/api/v1/exercises/" + id

  try {
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: exercise.name,
        description: exercise.description,
        targetMuscleGroup: exercise.targetMuscleGroup,
        fitnessLevel: exercise.fitnessLevel,
        profile: {
          profileId: KeycloakService.getId()
        },
      }),
    };
    const response = await fetch(`${url}`, config);
    const data = await response.text();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}

//UPDATE A PROGRAM WITH PATCH
export async function updateProgramToAPI(program, id) {
  const token = KeycloakService.getToken()
  const url = "https://fi-java-mefit-backend.herokuapp.com/api/v1/programs/" + id

  const jsonWorkouts = () => {
    const workoutArray = []
    if (program.workoutId1 !== "") {
      workoutArray.push(
        { workoutId: program.workoutId1 })
    }
    if (program.workoutId2 !== "") {
      workoutArray.push(
        { workoutId: program.workoutId2 })
    }
    if (program.workoutId2 !== "") {
      workoutArray.push(
        { workoutId: program.workoutId2 })
    }
    return workoutArray
  }

  try {
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: program.name,
        category: program.category,
        profile: {
          profileId: KeycloakService.getId()
        },
        workouts: jsonWorkouts()
      }),
    };
    const response = await fetch(`${url}`, config);
    const data = await response.text();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}

//UPDATE A WORKOUT WITH PATCH
export async function updateWorkoutToAPI(workout, id) {
  const token = KeycloakService.getToken()
  const url = "https://fi-java-mefit-backend.herokuapp.com/api/v1/workouts/" + id

  const jsonSets = () => {
    const setArray = []
    if (workout.exerciseId1 !== "" && workout.exerciseRepetitions1 !== "") {
      setArray.push(
        {
          exerciseRepetitions: workout.exerciseRepetitions1,
          exercise: {
            exerciseId: workout.exerciseId1
          }
        })
    }
    if (workout.exerciseId2 !== "" && workout.exerciseRepetitions2 !== "") {
      setArray.push(
        {
          exerciseRepetitions: workout.exerciseRepetitions2,
          exercise: {
            exerciseId: workout.exerciseId2
          }
        })
    }
    if (workout.exerciseId3 !== "" && workout.exerciseRepetitions3 !== "") {
      setArray.push(
        {
          exerciseRepetitions: workout.exerciseRepetitions3,
          exercise: {
            exerciseId: workout.exerciseId3
          }
        })
    }
    return setArray
  }

  try {
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: workout.name,
        type: workout.type,
        profile: {
          profileId: KeycloakService.getId()
        },
        sets: jsonSets()
      }),
    };
    const response = await fetch(`${url}`, config);
    const data = await response.text();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}

//SET GOAL EXERCISE TO COMPLETED
export async function setExerciseCompleted(goal, boolean, exerId) {
  const url =
    "https://fi-java-mefit-backend.herokuapp.com/api/v1/goals/" + goal.goalId;
  const token = KeycloakService.getToken();

  const jsonProgram = () => {
    if (goal.program !== null) {
      return { programId: goal.program.programId };
    } else return null;
  };
  const jsonWorkouts = () => {
    const workoutArray = [];
    for (let wo of goal.workouts) {
      if (wo.completed) {
        workoutArray.push({
          completed: true,
          workout: { workoutId: wo.workout.workoutId }
        });
      }
      else {
        workoutArray.push({
          completed: false,
          workout: { workoutId: wo.workout.workoutId }
        });
      }
    }
    return workoutArray;
  };
  const jsonExercises = () => {
    const exerciseArray = [];
    let updated = false
    for (let exer of goal.exercises) {
      if (exer.exercise.exerciseId === exerId && !updated && exer.completed !== boolean) {
        updated = true
        exerciseArray.push({
          completed: boolean,
          exercise: { exerciseId: exer.exercise.exerciseId }
        })
      }
      else if (exer.completed) {
        exerciseArray.push({
          completed: true,
          exercise: { exerciseId: exer.exercise.exerciseId }
        })
      }
      else {
        exerciseArray.push({
          completed: false,
          exercise: { exerciseId: exer.exercise.exerciseId }
        })
      }
    }
    return exerciseArray;
  };

  try {
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        goalId: goal.goalId,
        endDate: goal.endDate,
        startDate: goal.startDate,
        achieved: false,
        profile: {
          profileId: KeycloakService.getId()
        },
        program: jsonProgram(),
        workouts: jsonWorkouts(),
        exercises: jsonExercises()
      }),
    };
    const response = await fetch(`${url}`, config);
    const data = await response.text();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}

//SET GOAL WORKOUT TO COMPLETED
export async function setWorkoutCompleted(goal, boolean, woId) {
  const url =
    "https://fi-java-mefit-backend.herokuapp.com/api/v1/goals/" + goal.goalId;
  const token = KeycloakService.getToken();

  const jsonProgram = () => {
    if (goal.program !== null) {
      return { programId: goal.program.programId };
    } else return null;
  };
  const jsonWorkouts = () => {
    const workoutArray = [];
    let updated = false
    for (let wo of goal.workouts) {
      if (wo.workout.workoutId === woId && !updated && wo.completed !== boolean) {
        updated = true
        workoutArray.push({
          completed: boolean,
          workout: { workoutId: wo.workout.workoutId }
        });
      }
      else if (wo.completed) {
        workoutArray.push({
          completed: true,
          workout: { workoutId: wo.workout.workoutId }
        });
      }
      else {
        workoutArray.push({
          completed: false,
          workout: { workoutId: wo.workout.workoutId }
        });
      }
    }
    return workoutArray;
  };

  const jsonExercises = () => {
    const exerciseArray = [];
    for (let exer of goal.exercises) {
      if (exer.completed) {
        exerciseArray.push({
          completed: true,
          exercise: { exerciseId: exer.exercise.exerciseId }
        })
      }
      else {
        exerciseArray.push({
          completed: false,
          exercise: { exerciseId: exer.exercise.exerciseId }
        })
      }
    }
    return exerciseArray;
  };

  try {
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        goalId: goal.goalId,
        endDate: goal.endDate,
        startDate: goal.startDate,
        achieved: false,
        profile: {
          profileId: KeycloakService.getId()
        },
        program: jsonProgram(),
        workouts: jsonWorkouts(),
        exercises: jsonExercises()
      }),
    };
    const response = await fetch(`${url}`, config);
    const data = await response.text();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}