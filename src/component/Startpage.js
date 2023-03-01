import React from "react";



export default function Startpage(props) {
    const {newGame, newgamehandle} = props
    return(
        newGame && (
            <div className="mainpage">
              <h1 className="mainpagehead">Quizzical</h1>
              <button className="mainpagebutton" onClick={newgamehandle}>Start quiz</button>
            </div>
          )
    )
}