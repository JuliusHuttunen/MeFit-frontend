import { useSelector } from "react-redux";
import RandomImage from "./RandomImage";

function ProfilePicture(props) {

    const user = useSelector((state) => state.utility.user);
    const imageSrc = "https://identicon-api.herokuapp.com/" + user.username + "/50?format=png"
    return (
        <div className="profilepicture">
            {/* Super secret image 
            <img src="https://ca.slack-edge.com/T02T2EPAMHR-U02TAMWJF1Q-2bf7bbb6f704-72" style={{"borderRadius":"50%", "width":"30px"}}></img>
            <img src="https://ca.slack-edge.com/T02T2EPAMHR-U02T41KQHNJ-ee57ca6bc81a-512" style={{"borderRadius":"50%", "width":"30px"}}></img>
            */}
            <RandomImage></RandomImage>
        </div>
    );
  }
  
  export default ProfilePicture;
  