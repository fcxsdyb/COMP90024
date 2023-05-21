import "./MainPic.css"

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