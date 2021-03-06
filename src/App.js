import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import  SideBarContent  from './components/sidebar/sidebar'
import json from './components/localData.json';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Comics from './components/main/comics';
import Allcategory from './components/main/allcategory';
import  Electronics from './components/main/electronics';
import Games from './components/main/games';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import TopProduct from './components/sidebar/topproduct';

function App() {
  const {responce} = json
  const [state,changeProfile]=useState({currentProfile:'ALL Category',range:10000})


  return (
    <BrowserRouter>
      <Header/>
      <div className="container-lg">
      <div className="row">
        <div className="col-sm-6 col-md-4 col-lg-3">
      <SideBarContent productList={responce} 
      rangeChange={(currentRange)=>{changeProfile({...state,range:currentRange})}}
      dropdownChange={(currentRange)=>{changeProfile({...state,sortOder:currentRange})}}
      change={(el)=>{changeProfile({...state,currentProfile:el})}}/>
      <TopProduct current={state}/>
      </div>
      <div className="col-sm-6 col-md-8 col-lg-9">
      <Redirect from="/" to="allcategory" />
      <Route exact path="/comics" children={ <Comics current={state} />}/>
      <Route exact path="/allcategory" children={ <Allcategory current={state} />}/>
      <Route exact path="/electronics" children={ <Electronics current={state}/>} />
      <Route exact path="/games" children={ <Games current={state} />}/>
      </div>
      </div>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
