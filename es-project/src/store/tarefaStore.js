import { defineStore } from 'pinia';

export const useTarefaStore = defineStore('tarefa', {

    state: () => ({
        id_tarefa: null
        
    }),

    actions: {
        async setID(id) {
            this.id_tarefa = id;
        }   
    },
    getters: {
        getID() {
            return this.id_tarefa;
        }
    }



});