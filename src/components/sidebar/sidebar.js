import React, { useState } from 'react';
import {  NavLink } from 'react-router-dom';
import './sidebar.css'

const SideBarContent=props=>{
    const[currentPrice,changeInPrise]=useState( {value: 10000})
    const handleChange=(event)=> {
    changeInPrise({value: event.target.value});
  }
const product= props.productList
const unique = [...new Set(product.map(item => item.product))];
console.log(unique)
return(
    <div >
    <div className="sideNavDiv">
    <NavLink  className="font-weight-bold mb-3" onClick={()=>props.change('ALL Category')} to="/allcategory">ALL Category</NavLink>
    </div>
    {unique.map((item,index)=>{
    return <div className="sideNavDiv" key={index}><NavLink className="font-weight-bold mb-3" onClick={()=>props.change(item)} to={item}>{item}</NavLink></div>
    })}
    <div>
    <section className="mb-4">
    <div className="slider-price d-flex align-items-center my-4">
<input 
            id="typeinp" 
            type="range" 
            min="0" max="10000" 
            value={currentPrice.value} 
            onChange={handleChange}
            onMouseLeave={()=>{props.rangeChange(currentPrice.value)}}
            step="1"/>
            <b>
          &nbsp;${currentPrice.value}</b>
</div>
    </section>
    </div>
    </div>
   
)
}

export default SideBarContent