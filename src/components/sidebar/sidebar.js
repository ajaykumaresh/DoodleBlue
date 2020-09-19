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
  <>
  <p className="fontpropscenter text-sm font-weight-bold text-left text-secondary">CATEGORIES</p>
  <div>
    <div>
      <div className="sideContainer mb-4">
        <div className="sideNavDiv mb-2">
          <NavLink className="font-weight-bold black" activeClassName='is-active' onClick={() => props.change('ALL Category')} to="/allcategory">ALL Category</NavLink>
        </div>
        {unique.map((item, index) => {
          return <div className="sideNavDiv mb-2" key={index}><NavLink activeClassName='is-active' className="font-weight-bold mb-3 black" onClick={() => props.change(item)} to={item}>{item}</NavLink></div>
        })}
      </div>
      <div>
        <p className="fontpropscenter text-sm font-weight-bold text-left text-secondary mb-3">FILTER BY PRICE</p>
        <section className="mb-4">
          <div className="slider-price d-flex flex-column  mb-4">
            <input
              id="typeinp"
              className="w-full"
              type="range"
              min="0" max="10000"
              value={currentPrice.value}
              name="value"
              onChange={handleChange}
              onMouseLeave={() => { props.rangeChange(currentPrice.value) }}
              step="1" />
            <div className="text-right text-base mt-1">
              Price: <b className="is-active">${currentPrice.value}</b></div>
          </div>
        </section>
        <p className="fontpropscenter text-sm font-weight-bold text-left text-secondary">SORT BY</p>
        <select className="form-control" id="sel1" name="Dropdown" value={currentPrice.Dropdown} onChange={el => handleChange(el)}>
          <option>Select Sort</option>
          <option>Price High to Low</option>
          <option>Price Low to High</option>
        </select>
      </div>
    </div>
  </div>
</>
   
)
}

export default SideBarContent