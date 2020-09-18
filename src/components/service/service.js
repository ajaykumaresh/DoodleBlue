import React,{useEffect,useState} from 'react';
import Customization from '../productCustomization/customization';
import { Button } from 'react-bootstrap';
import {connect} from 'react-redux';
const CommonDisplayContent=(props)=>{
    let [DisplayData,TobeProcessed]= useState([]);
    const [show, setShow] = useState(false);
       useEffect(()=>{
        let {currentProfile,range} = props.childElement.current
        let responce=props.filterData
        let fiteredArr=currentProfile==="ALL Category"?responce.filter(items=> items.rate<=range):responce.filter(items=>items.product===currentProfile && items.rate<=range);      
        TobeProcessed(fiteredArr)
        console.log(fiteredArr)
         },[props])
         
       return(
           <div className="row">
           {DisplayData.map((el,index)=>{
               return <div key={index} className= "col-sm-4"  style={{padding:'10px'}}>

                        <div className="card">
                         
                            <img className="card-img-top" style={{height:'300px'}} src={el.image} alt="displayContent"/>
                           
                                <div className="card-body">
                                    <p className="card-text"><b>{el.title}</b></p>
                                    <div><b>${el.rate}</b></div>
                               </div>
                               <>
        <Button variant="primary pull-right" onClick={()=>setShow(true)} >
          Add New Product
        </Button>
        <Customization change={show} headerTitle="Add New Product" propertyChange={(el)=>setShow(el)}/>
      </>
                           </div>
                    </div>
           })}
           </div>
       )
   }
const mapPropsState=state=>{
    console.log(state)
    return{
        filterData:state
    }
}
export default connect(mapPropsState)(CommonDisplayContent);