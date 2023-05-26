//  COMP90024 GROUP48
//  Yuhang Zhou     ID:1243037
//  Jitao Feng      ID:1265994
//  Hui Liu         ID:1336645
//  Jihang Yu       ID:1341312
//  Xinran Ren      ID:1309373

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
