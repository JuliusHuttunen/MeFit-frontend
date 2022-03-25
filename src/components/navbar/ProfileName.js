import KeycloakService from '../../KeycloakService';
import { Link } from 'react-router-dom'

function ProfileName() {

    return (
      <div className="name">
        <h4>You are logged in as <Link to='/profile' className='profile-name'>{KeycloakService.getFirstName()} {KeycloakService.getLastName()} </Link></h4>
      </div>
    );
  }
  
  export default ProfileName;