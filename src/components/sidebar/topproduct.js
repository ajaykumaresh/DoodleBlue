import React,{useEffect,useState} from 'react';
import './sidebar.css'
import {connect} from 'react-redux';
const TopProduct=(props)=>{
    let [DisplayData,TobeProcessed]= useState([])
       useEffect(()=>{
        let {currentProfile} = props.current
        let responce=props.filterData
        let fiteredArr=currentProfile==="ALL Category"?responce.filter(items=> items.topProduct):responce.filter(items=>items.product===currentProfile &&items.topProduct);      
        fiteredArr=fiteredArr.length<=3?fiteredArr:fiteredArr.slice(0, 3);
        TobeProcessed(fiteredArr)
       // console.log(fiteredArr)
         },[props])
         
       return(
        <div className="topProduct mt-5">
               <p className="fontpropscenter text-sm font-weight-bold text-left text-secondary">Top Products</p>
           {DisplayData.map((el,index)=>{
               return <div className="card cardbottom" key={index}>
                            <div className="card-img">
                            <img className="card-img-top" style={{height:'120px',width: '100px',padding: '10px'}} src={el.image} alt="displayContent"/>
                            </div>
                                <div className="card-body p-0">
                                    <p className="card-text mb-0"><b>{el.title}</b></p>
                                    <div className="text-sm">${el.rate}</div>
                               </div>
                           </div>
                 
           })}
           </div>
       )
   }
const mapPropsState=state=>{
  //  console.log(state)
    return{
        filterData:state
    }
}
export default connect(mapPropsState)(TopProduct);