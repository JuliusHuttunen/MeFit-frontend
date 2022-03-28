import KeycloakService from "../../KeycloakService";

function ProfilePicture() {

    const profileName = KeycloakService.getFirstName()

    return (
        <div className="profilepicture">
            <img alt="profilePicture" src={"https://identicon-api.herokuapp.com/" + profileName + "/50?format=png"}></img>
        </div>
    );
}

export default ProfilePicture;
