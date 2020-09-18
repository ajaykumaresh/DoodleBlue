import React,{useEffect,useState} from 'react';
import Customization from '../productCustomization/customization';
import { Button } from 'react-bootstrap';
import {connect} from 'react-redux';
const CommonDisplayContent=(props)=>{
    let [DisplayData,TobeProcessed]= useState([]);
    const [show, setShow] = useState(false);
    const [key, setKey] = useState('');
       useEffect(()=>{
        let {currentProfile,range,sortOder} = props.childElement.current
        let responce=props.filterData
        let fiteredArr=currentProfile==="ALL Category"?responce.filter(items=> items.rate<=range):responce.filter(items=>items.product===currentProfile && items.rate<=range);
        
        if(sortOder==="Price High to Low")fiteredArr.sort((a, b) => b.rate - a.rate); // For ascending sort
        else if(sortOder==="Price Low to High")fiteredArr.sort((a, b) => a.rate - b.rate); // For descending sort      
        TobeProcessed(fiteredArr)
       // console.log(props.childElement.current)
         },[props])
         const currentselected=(el)=>{
           
            setKey(el.currentTarget.id)
            setShow(true)
         }
       return(
           <div className="row">
           {DisplayData.map((el,index)=>{
               return <div key={index} className= "col-sm-4"  style={{padding:'10px'}}>

                        <div className="card">
                         
                            <img className="card-img-top" style={{height:'300px',width: "230px",marginLeft: "18px",marginTop:"5px"}} src={el.image} alt="displayContent"/>
                           
                                <div className="card-body">
                                    <p className="card-text"><b>{el.title}</b></p>
                                    <div><b>${el.rate}</b></div>
                               </div>
                               <>
                        <Button variant="primary pull-right" id={el.Uniqkey} key="2312" onClick={(el)=>currentselected(el)} >
                         Edit Product
                            </Button>
        
      </>
                           </div>
                    </div>
           })}
           <Customization change={show} prductbasedkey={key} headerTitle="Edit Product" propertyChange={(el)=>setShow(el)}/>
           </div>
       )
   }
const mapPropsState=state=>{
    //console.log(state)
    return{
        filterData:state
    }
}
export default connect(mapPropsState)(CommonDisplayContent);