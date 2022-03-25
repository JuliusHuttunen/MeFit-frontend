import KeycloakService from '../../KeycloakService';

function ProfileName() {

    return (
      <div className="name">
        <h4>You are logged in as <a href='/profile' className='profile-name'>{KeycloakService.getFirstName()} {KeycloakService.getLastName()} </a></h4>
      </div>
    );
  }
  
  export default ProfileName;