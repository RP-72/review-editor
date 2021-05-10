import React from 'react'
import arrayMove from 'array-move'


function nextId(state){
    if(state.length == 0) return 0
    var maxId = 0
    for(let i=0;i<state.length;i++){
        if(state[i].key > maxId) maxId = state[i].key
    }
    return maxId+1
}
function reviewEditor(state = [], action) {
    switch(action.type){
        case 'edit': {
            return state.map((rev)=>{
                if(rev.key != action.payload.key){
                    return rev
                }
                else{
                    return {
                        key: rev.key,
                        title: action.payload.title,
                        description: action.payload.description,
                        image: action.payload.image
                    }
                }
            })
            // let arr = state
            // for(let i=0;i<state.length;i++){
            //     if(arr[i].key == action.payload.key){
            //         state[i] = {
            //             key: arr[i].key,
            //             title: action.payload.title,
            //             description: action.payload.description,
            //             image: action.payload.image
            //         }
            //     }   
            // }
            // console.log(arr, "STATE")
            // return arr
        }
        case 'delete': {
            return state.filter((rev)=> rev.key!= action.payload)
        }
        case 'add': {
            return[
                ...state,
                {
                    key: nextId(state),
                    title: action.payload.title,
                    description: action.payload.description,
                    image : action.payload.image
                }
            ]
        }
        case 'move': {
            // console.log("OLD AND NEW", action.payload.oldInd, action.payload.newInd)
            return arrayMove([...state], action.payload.oldInd, action.payload.newInd)
        }
        default:
            return state
    }
}
export default reviewEditor
