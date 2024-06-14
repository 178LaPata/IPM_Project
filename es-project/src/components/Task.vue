<template>
    <div class="bg-task rounded-xl p-2 shadow-md m-5 hover:cursor-pointer" @click="goToTask">
        <div class="task-header flex items-center justify-between">
            <div class="task-category-label inline-block text-white rounded-full px-3 py-1 text-sm font-bold mr-2"
                :class="categoryClass(task.category)">
                    {{ this.categoria }}
            </div>
            <span class="task-date text-primary text-sm text-data font-medium">{{ task.date }}</span>
        </div>
        <div class="text-3xl py-2 mt-2 font-bold">{{ task.title }}</div>
        <div class="text-lg">
            <p>
                <span class="font-bold">Duração: </span> 
                <span class="font-medium">{{ task.duration }} min </span>
            </p>
            <p>
                <span class="font-bold text-red-500" v-if="late">Em Atraso! </span>
                <span class="font-bold" v-else>Data de Entrega: </span>
                <span class="font-medium">{{ task.deliveryDate }}</span>
            </p>
        </div>
    </div>
</template>

<script>
import { useTarefaStore } from '../store/tarefaStore';

export default {
    data() {
        return {
            categoria : '',
            late : false,
           }
    },
    name: 'Task',
    props: {
        task: {
            type: Object,
            required: true,
        }
    },
    created() {
        if (this.task.isLate) {
            this.late = true;
        }
    },

    methods: {

        goToTask() {
            const tarefaStore = useTarefaStore()
            tarefaStore.setID(this.task.id)
            this.$router.push('/tarefa');
        },


        categoryClass(category) {
            console.log(category);
            switch (category) {
                case 'gasolina' || 'gasoleo':
                    this.categoria = 'Motor Combustão';
                    console.log(this.categoria);
                    return 'motoresCombustao';
                case 'universal':
                    this.categoria = 'Universal';
                    return 'universal';
                case 'eletrico':
                    this.categoria = 'Motor Elétrico';
                    return 'motoresEletricos';
                case 'hibrido':
                    this.categoria = 'Motor Híbrido';
                    return 'motoresHibridos';
                default:
                    return ''; 
            }
        }
    }
}
</script>

<style scoped>
    @import '../assets/style.css';
    .task {
        cursor: pointer;
    }
    .task-container {
        overflow-y: auto;
        max-height: 44rem; 
    }
    .bg-task {
        background-color: #EAEBED;
    }
    .bg-tabelas{
        background-color: #1B8FB3;
        box-shadow: 0 0 0 2px #006989;
    }

    .min-h-header {
        min-height: 3.5rem; 
    }

    .task-container {
        overflow-y: auto;
        height: 43rem;
    }
    .task-category-label {
        color: #EAEBED;
        border-radius: 9999px;
        font-size: 1rem;
        padding: 0.25rem 0.75rem;
    }
    .motoresCombustao { background-color: #9747FF; } 
    .universal { background-color: #EF9712; } 
    .motoresHibridos { background-color: #FF0000; }
    .motoresEletricos { background-color: #32CD32; } 

</style>