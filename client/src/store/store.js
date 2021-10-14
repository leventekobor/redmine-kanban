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
      },
      addQuerie (state, payload) {
         state.project.query_id = payload.payload
         //console.log(state.project)
      }
   }
})

export default store
