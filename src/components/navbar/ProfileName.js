import { useSelector } from 'react-redux'
import KeycloakService from '../../KeycloakService';

function ProfileName() {

    const user = useSelector((state) => state.utility.user);

    return (
      <div className="name">
        <h2>You are logged in as {KeycloakService.getFirstName()} {KeycloakService.getLastName()} </h2>
      </div>
    );
  }
  
  export default ProfileName;