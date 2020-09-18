import React, { useState } from 'react';
import Customization from '../productCustomization/customization';
import { Button } from 'react-bootstrap';
const Header=(props)=>{
    const [show, setShow] = useState(false);
   
  
    return (
      <div className="row" style={{width:"100%",padding: '10px'}}>
      <>
        <Button variant="primary pull-right" onClick={()=>setShow(true)} >
          Add New Product
        </Button>
        <Customization change={show} headerTitle="Add New Product" propertyChange={(el)=>setShow(el)}/>
      </>
      </div>
    );
  }
  
export default  Header;