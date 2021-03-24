import { createStore } from "vuex" 

const store = createStore({
   state:{
      user: {

      },
      project: {

      }
   },
   mutations: {
      addUser (state, payload) {
         console.log(payload)
         state.user = {...payload.payload}
      },
      addProject (state, payload){
         console.log(payload)
         state.project = {...payload.payload}
         //console.log(state.project)
         //console.log(state.user)
      }
   }
})

export default store
