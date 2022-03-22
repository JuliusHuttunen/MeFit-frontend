import KeycloakService from "../../KeycloakService";

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
    for (let workout of item.workouts) {
      workoutArray.push({ workoutId: workout.workoutId });
    }
    return workoutArray;
  };
  const jsonExercises = () => {
    const exerciseArray = [];
    for (let exercise of item.exercises) {
      exerciseArray.push({ exerciseId: exercise.exerciseId });
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

export async function setGoalCompleted(goal) {
  const url =
    "https://fi-java-mefit-backend.herokuapp.com/api/v1/goals/" + goal.goalId;
  const token = KeycloakService.getToken();

  try {
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        achieved: true,
      }),
    };
    const response = await fetch(`${url}`, config);
    const data = await response.text();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
}

export async function getUserProfile() {
  const userId = KeycloakService.getId();
  const token = KeycloakService.getToken();
  const url =
    "https://fi-java-mefit-backend.herokuapp.com/api/v1/profiles/" + userId;

<<<<<<< HEAD
    const userId = KeycloakService.getId()
    const token = KeycloakService.getToken()
    const url = 'https://fi-java-mefit-backend.herokuapp.com/api/v1/profiles/' + userId

    try {
        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
        }
        const response = await fetch(`${url}`, config)
        const data = await response.text()
        return [null, data]
    }
    catch (error) {
        return [error.message, null]
    }
=======
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
>>>>>>> 114609870e08106ed8c77e2f0026d77ce8f66bc6
}

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
        address: {
          // "addressId":
          addressLine1: profile.address_line_1,
          addressLine2: profile.address_line_2,
          addressLine3: profile.address_line_3,
          postalCode: profile.postal_code,
          city: profile.city,
          country: profile.country,
        },
        goals: [],
        workouts: [],
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
        address: {
          // "addressId":
          addressLine1: profile.address_line_1,
          addressLine2: profile.address_line_2,
          addressLine3: profile.address_line_3,
          postalCode: profile.postal_code,
          city: profile.city,
          country: profile.country,
        },
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
