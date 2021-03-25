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
         state.user = {...payload.payload}
      },
      addProject (state, payload){
         state.project = {...payload.payload}
      }
   }
})

export default store
