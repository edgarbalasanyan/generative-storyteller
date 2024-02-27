let lastId = 0;
export default function reducer(state=[],action){
  switch(action.type){
    case "bugAdded":
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false
        }
      ]

    case "bugRemoved":
      return state.filter((bug)=>bug.id!==action.payload.id) 

    case "bugResolved":
      return state.map((bug)=>{
        if(bug.id===action.payload.id){
          return {
            id: bug.id,
            description: bug.description,
            resolved: true,
          }
        }else{
          return bug
        }
      })
    default: 
      return state
  }
}