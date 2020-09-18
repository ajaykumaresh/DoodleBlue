import React, { useState } from 'react';
import {  NavLink } from 'react-router-dom';
import './sidebar.css'

const SideBarContent=props=>{
    const[currentPrice,changeInPrise]=useState( {value: 10000,Dropdown:".."})

    const handleChange= async (event)=> {
      const selectedName=event.target.name
      changeInPrise({...currentPrice,[selectedName]: event.target.value});
      changeInPrise((state) => {
        if(selectedName==="Dropdown") props.dropdownChange(state.Dropdown)
    return state;
    });
    
  }


const product= props.productList
const unique = [...new Set(product.map(item => item.product))];
return(
    <div >
    <div className="sideNavDiv">
    <NavLink  className="font-weight-bold mb-3 black" onClick={()=>props.change('ALL Category')} to="/allcategory">ALL Category</NavLink>
    </div>
    {unique.map((item,index)=>{
    return <div className="sideNavDiv" key={index}><NavLink className="font-weight-bold mb-3 black" onClick={()=>props.change(item)} to={item}>{item}</NavLink></div>
    })} 
    <div>
    <section className="mb-4">
    <div className="slider-price d-flex align-items-center my-4">
<input 
            id="typeinp" 
            type="range" 
            min="0" max="10000" 
            value={currentPrice.value} 
            name="value"
            onChange={handleChange}
            onMouseLeave={()=>{props.rangeChange(currentPrice.value)}}
            step="1"/>
            <b>
          &nbsp;${currentPrice.value}</b>
      </div>
    </section>
    <label className="fontpropsweight">Sort By</label>
    <select className="form-control" id="sel1" name="Dropdown"  value={currentPrice.Dropdown} onChange={el=>handleChange(el)}>
    <option>..</option>
    <option>Price High to Low</option>
    <option>Price Low to High</option>
  </select>
    </div>
    <br/>
    </div>
   
)
}

export default SideBarContent