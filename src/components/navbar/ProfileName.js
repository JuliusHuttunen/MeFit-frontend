import { useSelector } from 'react-redux'

function ProfileName() {

    const user = useSelector((state) => state.utility.user);

    return (
      <div className="name">
        <h2>You are logged in as {user.firstName} {user.lastName} </h2>
      </div>
    );
  }
  
  export default ProfileName;