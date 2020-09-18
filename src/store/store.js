import json from '../components/localData.json';

const reducer= (state=json.responce,action)=>{
    console.log(action)
    switch(action.type){
        
        case 'ADDPRODUCT': 
        let addCotent=action.value
        addCotent.rate=Number(addCotent.rate)
            return [...state,addCotent]
                
            
        default :
        return state
    }
    
}

export default reducer;