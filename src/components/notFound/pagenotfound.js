import React from 'react';
import './notfound.css'
const NotFound=(props)=>{
 return( <div className="mainbox">
    <div className="err">4</div>
    <i className="far fa-question-circle fa-spin"></i>
    <div className="err2">4</div>
    <div className="msg">OOPS!! No Procucts Found..Maybe your filters are High to Process!!! Please reduce filters properties to show Products.</div>
      </div>
 )
}

export default NotFound;