import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import { Button,Modal,Form } from 'react-bootstrap';
const Customization=(props)=>{
    let [FormData,TobeProcessed]= useState({
        product:"Comics",
        title:"",
        rate:"",
        topProduct:false,
        image:"",
        Uniqkey:"",
        errors:{
          titleError:"",
          rateError:"",
          imageError:"",
        }
      
    })
    useEffect(()=>{
      let key = generateHexString(32)
        
        if(props.headerTitle==="Edit Product" && props.filterData){
        //  console.log(props.prductbasedkey)
          const dataBase=props.filterData
          let selectedData=dataBase.filter(items=>items.Uniqkey===props.prductbasedkey)
          selectedData=selectedData[0]
         // console.log(selectedData)
          if(selectedData){
          TobeProcessed({
            product:selectedData.product,
            title:selectedData.title,
            rate:selectedData.rate,
            topProduct:selectedData.topProduct,
            image:selectedData.image,
            Uniqkey:selectedData.Uniqkey,
            errors:{
              titleError:"",
              rateError:"",
              imageError:"",
            }
            
          })
        }
        }else{
          TobeProcessed({
            product:"Comics",
            title:"",
            rate:"",
            topProduct:false,
            image:"",
            Uniqkey:key,
            errors:{
              titleError:"",
              rateError:"",
              imageError:"",
            }
          })
        }
      },[props])
      const changeHandler =  (event)=>{
        let image;
        FormData.errors= {
          titleError:"",
          rateError:"",
          imageError:"",
        }
        if(event.target.name==='image'&& event.target.files[0]){
            let reader = new FileReader();
            let fileName=event.target.name
            reader.onload = (e) => {
                image = e.target.result
                let state= {...FormData,[fileName]:image}
                TobeProcessed(state)
            };
            reader.readAsDataURL(event.target.files[0]);
        }
        let state=event.target.name==='topProduct'? {...FormData,[event.target.name]:event.target.checked} : {...FormData,[event.target.name]:event.target.value};
        TobeProcessed(state)
      }
      const generateHexString=(length)=> {
        var ret = "";
        while (ret.length < length) {
          ret += Math.random().toString(16).substring(2);
        }
        return ret.substring(0,length);
      }
      const onSubmit=async()=>{
        let isvalid=validation()
        let key =await generateHexString(32)
        //console.log({...FormData,Uniqkey:key})
          TobeProcessed({...FormData,Uniqkey:key})
         // console.log(FormData)
        if(isvalid && props.headerTitle==="Edit Product"){
          props.onEditproduct(FormData)
          props.propertyChange(false)
        }else if(isvalid){
          props.onaddproduct(FormData)
          props.propertyChange(false)
        } 
      }
      const validation=()=>{
        if(!FormData.title){
          let state= {...FormData}
          state.errors.titleError="Please Enter The Title"
          TobeProcessed(state)
          return false
        }else if(!FormData.rate){
          let state= {...FormData}
          state.errors.rateError="Please Enter The Price"
          TobeProcessed(state)
          return false
        }else if(FormData.rate>10000){
          let state= {...FormData}
          state.errors.rateError="Please Enter The Below $10000"
          TobeProcessed(state)
          return false
        }
        else if(!FormData.image){
          let state= {...FormData}
          state.errors.imageError="Please Upload image"
          TobeProcessed(state)
          return false
        }
        else{
          return true
        }
      }
    
    return(
        <>
        <Modal
        show={props.change}
        onHide={()=>props.propertyChange(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
    <Modal.Title>{props.headerTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
        <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Category *</Form.Label>
    <Form.Control as="select" name="product" value={FormData.product} onChange={(el)=>{changeHandler(el)}}>
    <option >Comics</option>
    <option >Games</option>
    <option >Electronics</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Title *</Form.Label>
    <Form.Control type="text" name="title" value={FormData.title} onChange={(el)=>{changeHandler(el)}}/>
    {FormData.errors.titleError?<label style={{color:'red',fontSize: 'smaller'}}>{FormData.errors.titleError}</label>:null}
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Price *</Form.Label>
    <Form.Control type="number"  name="rate" value={FormData.rate} onChange={(el)=>{changeHandler(el)}}/>
    {FormData.errors.rateError?<label style={{color:'red',fontSize: 'smaller'}}>{FormData.errors.rateError}</label>:null}
  </Form.Group>


  <Form.Check 
        type='checkbox'
        id='default-checkbox'
        label='Top Product'
        name="topProduct"
        onChange={(el)=>{changeHandler(el)}}
        checked={FormData.topProduct}
      />
      <br/>
            <Form.Group>
                    <Form.File id="exampleFormControlFile1"  name='image' onChange={(el)=>{changeHandler(el)}}/>
                   <div styles="height:60px">
                    <img src={FormData.image}  style={{height:'65px'}}  alt="Upload Images *"/>
                    </div>
                    {FormData.errors.imageError?<label style={{color:'red',fontSize: 'smaller'}}>{FormData.errors.imageError}</label>:null}
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>props.propertyChange(false)}>
            Close
          </Button>
          
          <Button variant="primary"onClick={onSubmit}>{props.headerTitle==="Edit Product" ? 'Update' : 'Save'} </Button>
        </Modal.Footer>
      </Modal>
      </>
    )
}
const mapPropsState=state=>{
    return{
        filterData:state
    }
}
const mapPropsDispatchState=dispatch=>{

    return {
        onaddproduct :(val)=>dispatch({type:'ADDPRODUCT',value:val}),
        onEditproduct :(val)=>dispatch({type:'UPDATEPRODUCT',value:val})
    }
}

export default connect(mapPropsState,mapPropsDispatchState)(Customization);