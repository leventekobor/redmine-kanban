import { createStore } from "vuex" 

const store = createStore({
   state:{
      user: {

      }
   },
   mutations: {
      addUser (state, payload) {
         console.log("mutating")
         state.user = {...payload.payload}
      }
   }
})

export default store
