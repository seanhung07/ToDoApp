import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        filter: "all",
        todos: [
            {
                'id': 1,
                'title': "Default Item (Delete first)",
                'completed': false,
                'edit': false,
            },
        ],
    },
    getters:{
        remaining(state) {
            return state.todos.filter((todo) => !todo.completed).length;
        },
        anyremaining(state, getters) {
            return getters.remaining != 0;
        },
        todosfilter(state) {
            if (state.filter == "all") {
                return state.todos;
            } else if (state.filter == "active") {
                return state.todos.filter((todo) => !todo.completed);
            } else if (state.filter == "completed") {
                return state.todos.filter((todo) => todo.completed);
            }
            return state.todos;
        },
        showclearall(state) {
            return state.todos.filter((todo) => todo.completed).length > 0;
        },

    },
    mutations:{
        addtodo(state,todo){
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: false,
                edit : false,
            })
        },
        clearcompleted(state){
            state.todos = state.todos.filter((todo) => !todo.completed);
        },
        updatefilter(state,filter){
            state.filter =filter
        },
        checkall(state, checked){

            state.todos.forEach((todo) => (todo.completed = checked));

        },
        deletetodo(state, id){
            const index = state.todos.findIndex((item) => item.id == id)
            state.todos.splice(index, 1);
        },
        updatetodo(state,todo){
            const index = state.todos.findIndex((item) => item.id == todo.id)
           state.todos.splice(index, 1,
                {
                    'id': todo.id,
                    'title': todo.title,
                    'completed': todo.completed,
                    'edit': todo.edit
                })
        },
    },
    actions:{
        addtodo(context,todo){
            // setTimeout(()=>{
            // },500)
            context.commit('addtodo',todo)
        },
        clearcompleted(context){
            context.commit('clearcompleted')
        },
        updatefilter(context,filter){
            context.commit('updatefilter',filter)
        },
        checkall(context, checked){
            context.commit('checkall',checked)
        },
        deletetodo(context, id){
            context.commit('deletetodo',id)
        },
        updatetodo(context,todo){
            context.commit('updatetodo',todo)
        }
    }
})