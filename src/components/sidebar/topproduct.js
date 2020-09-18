import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
const TopProduct=(props)=>{
    let [DisplayData,TobeProcessed]= useState([])
       useEffect(()=>{
        let {currentProfile} = props.current
        let responce=props.filterData
        let fiteredArr=currentProfile==="ALL Category"?responce.filter(items=> items.topProduct):responce.filter(items=>items.product===currentProfile &&items.topProduct);      
        fiteredArr=fiteredArr.length<=3?fiteredArr:fiteredArr.slice(0, 3);
        TobeProcessed(fiteredArr)
        console.log(fiteredArr)
         },[props])
         
       return(
           <div>
           {DisplayData.map((el,index)=>{
               return <div className="card row" key={index}>
                         
                            <img className="card-img-top" style={{height:'120px',width: '100px',padding: '10px'}} src={el.image} alt="displayContent"/>
                           
                                <div className="card-body">
                                    <p className="card-text"><b>{el.title}</b></p>
                                    <div><b>${el.rate}</b></div>
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
export default connect(mapPropsState)(TopProduct);