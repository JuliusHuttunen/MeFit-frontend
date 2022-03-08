function Hamburger(props) {
    return (
    <div className="hamburger">
        <i class="material-icons" style={{fontSize: "70px"}}>menu</i>
        <style jsx>{`
            .hamburger i{
                color: #F19953;
                transform:${ props.menuOpen ? 'rotate(90deg)': 'rotate(0)'};
                transition: 0.5s;
            }
        `}
            </style>
    </div>
    );
  }
  
  export default Hamburger;