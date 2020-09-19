import json from '../components/localData.json';

const reducer= (state=json.responce,action)=>{
  //  console.log(action)
    switch(action.type){
        
        case 'ADDPRODUCT': 
        let addCotent=action.value
        addCotent.rate=Number(addCotent.rate)
        return [addCotent,...state];

        case 'UPDATEPRODUCT':
            let currentState=[...state]
            let UpdateCotent=action.value
            UpdateCotent.rate=Number(UpdateCotent.rate)
           let indexVal= findIndex(state,action.value.Uniqkey)
           currentState.splice(indexVal, 0);
           currentState[indexVal]= UpdateCotent;
            return [...currentState,];        
            
        default :
        return state
    }

    
    
}

const findIndex=(state,key)=>{
    let index= state.indexOf(state.filter(function(item) {
         return item.Uniqkey === key
     })[0])
    return index;
 }


export default reducer;