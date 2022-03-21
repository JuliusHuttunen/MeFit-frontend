import KeycloakService from '../../KeycloakService';

function ProfileName() {

    return (
      <div className="name">
        <h2>You are logged in as {KeycloakService.getFirstName()} {KeycloakService.getLastName()} </h2>
      </div>
    );
  }
  
  export default ProfileName;