import "./MainPic.css"

// MainPic component that renders a main picture with accompanying text
function MainPic(props) {
    return (
        <>
            <div className={props.cName}>
                <img alt="HeroImg" src={props.heroImg} />
            </div>

            <div className={props.textStyle}>
                <h1>{props.title}</h1>
                <p>{props.text}</p>
            </div>
        </>
    );
}

export default MainPic;
