<template>
    <div class="min-h-screen bg-white text-white font-extrabold">
        <Navbar title="Serviços">
        </Navbar>
        <div class="selecionar">
            <select id="orderTasks" v-model="selectedOrder" @change="orderTasks" class="p-2 rounded-md text-sm selectB">
                <option value="default">ID</option>
                <option value="chegAsc">Chegada Ascendente</option>
                <option value="chegDesc">Chegada Descendente</option>
                <option value="entAsc">Entrega Ascendente</option>
                <option value="entDesc">Entrega Descendente</option>
                <option value="durAsc">Duração Ascendente</option>
                <option value="durDesc">Duração Descendente</option>
            </select>
        </div>
        <div class="grid grid-cols-3 content-center mx-10 mt-14">
            <div class="col-span-1 bg-tabelas mx-4 rounded-xl shadow flex justify-center items-center text-3xl font-bold min-h-header"> EM ESPERA</div>
            <div class="col-span-1 bg-tabelas mx-4 rounded-xl shadow flex justify-center items-center text-3xl font-bold"> PROGRAMADOS</div>
            <div class="col-span-1 bg-tabelas mx-4 rounded-xl shadow flex justify-center items-center text-3xl font-bold"> SUSPENSOS</div>

            <!--Task container - por fazer-->
            <div class="col-span-1 bg-tabelas1 rounded-xl shadow text-primary m-4 ">
                <Task v-for="task in tasksWaitList" :key="task.id" :task="task"></Task>
            </div>
            <!--Task container - em atraso-->
            <div class="col-span-1 bg-tabelas1 rounded-xl shadow text-primary m-4">
                <Task v-for="task in tasksProgrammedList" :key="task.id" :task="task"></Task>
            </div>
            <!--Task container - suspensas-->
            <div class="col-span-1 bg-tabelas1 rounded-xl shadow text-primary m-4">
                <Task v-for="task in tasksSuspendedList" :key="task.id" :task="task"></Task>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Task from '../components/Task.vue';
import { useMecStore } from '../store/mecStore';
import axios from 'axios';
import navMixin from '../mixins/navMixin';

export default {
    components: {
        Navbar,
        Task
    },
    mixins: [navMixin],
    setup() {
        const mecStore = useMecStore();
        return {
            idM : mecStore.getMecId,
        }
    },
    data() {
        return {
            tasks: [],
            tasksWaitList: [],
            tasksSuspendedList: [],
            tasksProgrammedList: [],
            selectedOrder: 'default',
        };
    },

    methods: {
        orderTasks() {
            switch (this.selectedOrder) {
                case 'chegAsc':
                    this.tasksWaitList = [...this.tasksWaitList].sort((a, b) => this.convertAndCompareDates(a.date, b.date));
                    this.tasksSuspendedList = [...this.tasksSuspendedList].sort((a, b) => this.convertAndCompareDates(a.date, b.date));
                    this.tasksProgrammedList = [...this.tasksProgrammedList].sort((a, b) => this.convertAndCompareDates(a.date, b.date));
                    break;
                case 'chegDesc':
                    this.tasksWaitList = [...this.tasksWaitList].sort((a, b) => this.convertAndCompareDates(b.date, a.date));
                    this.tasksSuspendedList = [...this.tasksSuspendedList].sort((a, b) => this.convertAndCompareDates(b.date, a.date));
                    this.tasksProgrammedList = [...this.tasksProgrammedList].sort((a, b) => this.convertAndCompareDates(b.date, a.date));
                    break;
                case 'entAsc':
                    this.tasksWaitList = [...this.tasksWaitList].sort((a, b) => this.convertAndCompareDates(a.deliveryDate, b.deliveryDate));
                    this.tasksSuspendedList = [...this.tasksSuspendedList].sort((a, b) => this.convertAndCompareDates(a.deliveryDate, b.deliveryDate));
                    this.tasksProgrammedList = [...this.tasksProgrammedList].sort((a, b) => this.convertAndCompareDates(a.deliveryDate, b.deliveryDate));
                    break;
                case 'entDesc':
                    this.tasksWaitList = [...this.tasksWaitList].sort((a, b) => this.convertAndCompareDates(b.deliveryDate, a.deliveryDate));
                    this.tasksSuspendedList = [...this.tasksSuspendedList].sort((a, b) => this.convertAndCompareDates(b.deliveryDate, a.deliveryDate));
                    this.tasksProgrammedList = [...this.tasksProgrammedList].sort((a, b) => this.convertAndCompareDates(b.deliveryDate, a.deliveryDate));
                    break;
                case 'durAsc':
                    this.tasksWaitList.sort((a, b) => a.duration - b.duration)
                    this.tasksSuspendedList.sort((a, b) => a.duration - b.duration)
                    this.tasksProgrammedList.sort((a, b) => a.duration - b.duration)
                    break;
                case 'durDesc':
                    this.tasksWaitList.sort((a, b) => b.duration - a.duration)
                    this.tasksSuspendedList.sort((a, b) => b.duration - a.duration)
                    this.tasksProgrammedList.sort((a, b) => b.duration - a.duration)
                    break;
                default:
                    // ids are strings so we can't just sort them as numbers so we need to convert them to numbers first but thet have an s in the beginning so we need to remove it
                    this.tasksWaitList.sort((a, b) => parseInt(a.id.slice(1)) - parseInt(b.id.slice(1)))
                    this.tasksSuspendedList.sort((a, b) => parseInt(a.id.slice(1)) - parseInt(b.id.slice(1)))
                    this.tasksProgrammedList.sort((a, b) => parseInt(a.id.slice(1)) - parseInt(b.id.slice(1)))
                    break;
            }
        },
        convertAndCompareDates(dateA, dateB) {
            if (dateA === "Não definido") return Number.MAX_SAFE_INTEGER;
            if (dateB === "Não definido") return Number.MIN_SAFE_INTEGER;

            const [dayA, monthA, timeA] = dateA.split(/[/ ]/);
            const [dayB, monthB, timeB] = dateB.split(/[/ ]/);
            const formattedDateA = `2022-${monthA}-${dayA}T${timeA}`;
            const formattedDateB = `2022-${monthB}-${dayB}T${timeB}`;
            console.log(formattedDateA, formattedDateB)
            return new Date(formattedDateA).getTime() - new Date(formattedDateB).getTime();
        }
    },
    async created(){
        console.log(this.idM)
        if (this.idM==null)
            this.backToLogin()
    },
    async beforeMount() {

        try {
            const mecStore = useMecStore()

            const tarefas = mecStore.getMecJobs
            console.log('Getting tasks from server:', tarefas)
            
            const tasksPromises = tarefas.map(tarefaId => axios.get(`http://localhost:3000/services/${tarefaId}`))
            const tasksResponses = await Promise.all(tasksPromises)

            const serviceDefinitionsResponse = await axios.get('http://localhost:3000/service-definitions')
            const serviceDefinitions = serviceDefinitionsResponse.data

            const vehiclesTypesResponse = await axios.get('http://localhost:3000/vehicle-types')
            const vehiclesTypes = vehiclesTypesResponse.data

            this.tasks = tasksResponses.map(response => {
                const serviceDefinition = serviceDefinitions.find(def => def.id === response.data['service-definitionId'])
                
                const categoria = vehiclesTypes.find(type => type.serviços.includes(serviceDefinition.id)).id

                const date2 = response.data['data-chegada']
                const formattedDate = `${String(date2.dia).padStart(2, '0')}/${String(date2.mes).padStart(2, '0')} ${String(date2.hora).padStart(2, '0')}:${String(date2.minutos).padStart(2, '0')}`
                
                const deliveryDate2 = response.data["data"]
                const estado = response.data["estado"]

                if (!deliveryDate2) {
                    return {
                        id: response.data.id,
                        title: serviceDefinition.descr,
                        date : formattedDate,
                        deliveryDate: 'Não definido',
                        duration: serviceDefinition.duração,
                        category: categoria,
                        estado: estado
                    }
                } else {
                    const currentDate = mecStore.getDate
                    let date = new Date(currentDate.ano, currentDate.mes - 1, currentDate.dia, currentDate.hora, currentDate.minutos)
                    const deliveryDate = new Date(deliveryDate2.ano, deliveryDate2.mes - 1, deliveryDate2.dia, deliveryDate2.hora, deliveryDate2.minutos)
                    let late = false
                    if (date > deliveryDate) {
                        late = true
                    }
                    const formattedDeliveryDate = `${String(deliveryDate2.dia).padStart(2, '0')}/${String(deliveryDate2.mes).padStart(2, '0')} ${String(deliveryDate2.hora).padStart(2, '0')}:${String(deliveryDate2.minutos).padStart(2, '0')}`
                    return {
                        id: response.data.id,
                        title: serviceDefinition.descr,
                        date : formattedDate,
                        deliveryDate: formattedDeliveryDate,
                        duration: serviceDefinition.duração,
                        category: categoria,
                        estado: estado,
                        isLate : late
                    }
                }
            })

        } catch (error) {
            console.error(error);
        }

        console.log('Tasks:', this.tasks)
        
        this.tasksWaitList = this.tasks.filter(task => task.estado === 'nafila' )
        this.tasksSuspendedList = this.tasks.filter(task => task.estado === 'parado')
        this.tasksProgrammedList = this.tasks.filter(task => task.estado === 'programado')        
    }
    
}
</script>

<style scoped>
    
    .bg-tabelas{
        background-color: #1B8FB3;
        box-shadow: 0 0 0 2px #006989;
    }

    .bg-tabelas1{
        background-color: #1B8FB3;
        box-shadow: 0 0 0 2px #006989;
        height: 600px; 
        overflow-y: auto;
    }
    .min-h-header {
        min-height: 3.5rem; 
    }

    .task-container {
        overflow-y : auto;
        max-height: 80vh;
    }

    .selecionar{
        display: flex;
        justify-content: end;
        margin-top: 40px;
        margin-right: 60px;
    }

    .selectB{
        background-color: #EAEBED;
        border-radius: 10px;
        border: 1px solid #006989;
        color: #006989;
    }

</style>