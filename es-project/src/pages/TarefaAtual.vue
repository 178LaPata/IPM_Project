<template>
    <div class="min-h-screen bg-white text-white font-extrabold">
        <Navbar title="Tarefa Atual"/>
        
        <div class="flex justify-center mt-10 mb-4">
            <h1 class="text-8xl text-primary">{{ title }}</h1>
        </div>

        <div class="task-card bg-white p-8">
            <div class="task-details grid grid-cols-3 gap-0">
                <div class="info-label bg-label task-container rounded-tl-lg">Veículo</div>
                <div class="info-value bg-value rounded-tr-lg">{{ matricula }}</div>
                <div class="info-label bg-label task-container">Data Chegada</div>
                <div class="info-value bg-value">{{ data_chegada }}</div>
                <div class="info-label bg-label task-container">Data Entrega</div>
                <div class="info-value bg-value">{{ data_entrega }}</div>
                <div class="info-label bg-label task-container">Descrição</div>
                <div class="info-value bg-value">{{ descricao }}</div>
                <div class="info-label bg-label task-container">Duração</div>
                <div class="info-value bg-value">{{ duracao }}</div>
                <div class="info-label bg-label task-container">Cliente</div>
                <div class="info-value bg-value">{{ cliente }}</div>
                <div class="info-label bg-label task-container rounded-bl-lg">Contacto</div>
                <div class="info-value bg-value rounded-br-lg">{{ contacto }}</div>
            </div>
        </div>
        <div class="flex flex-row justify-center">
                <Buttons class="recusar2" :buttons="{img: '/pause-solid.svg', text: 'Suspender'}" @click="suspenderTarefa()"/>
                <Buttons class="aceitar2" :buttons="{img: '/check-solid.svg', text: 'Concluir'}" @click="concluirTarefa()"/>
        </div>
        <Aviso
            v-if="showAviso"
            :visible="showAviso"
            message="Confirma a conclusão da tarefa?"
            @close="showAviso = false"
            @addExtraServices = "goToExtraServices"
            @confirm="confirmTask"
        />
        <AvisoSuspender 
            v-if="showAvisoSuspender"
            :visible="showAvisoSuspender"
            message="Tem a certeza que quer suspender esta tarefa? Se sim, indique o motivo."
            @close="showAvisoSuspender = false"
            @confirm="FecharAviso"
        />
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Buttons from '../components/Buttons.vue';
import Aviso from '../components/Aviso.vue';
import AvisoSuspender from '../components/AvisoSuspender.vue';
import { useTarefaStore } from '../store/tarefaStore';
import axios from 'axios';
import navMixin from '../mixins/navMixin';

export default {
    components: {
        Navbar,
        Buttons,
        Aviso,
        AvisoSuspender
    },
    mixins: [navMixin],
    setup() {
        const store = useTarefaStore();
        return {
            id: store.getID,
        }
    },
    data() {
        return {
            title: "",
            matricula: null,
            data_chegada: "",
            data_entrega: "",
            descricao: "",
            duracao: null,
            cliente: null,
            contacto: null,
            showTextbox: false,
            showAviso: false,
            showAvisoSuspender: false,

        }
    },
    
    methods: {
        async confirmTask() {
            this.showAviso = false;
            try {
                console.log(`Concluding task ${this.id}`);
                const response = await axios.patch(`http://localhost:3000/services/${this.id}`, {
                    'estado': 'realizado'
                });
                console.log('Response from server:', response.data);
                this.backToHome();
            } catch (error) {
                console.error(error);
            }
        },
        goToExtraServices() {
            this.showAviso = false;
            this.$router.push('/servicosExtra');
        },
        concluirTarefa() {
            this.showAviso = true;
        },
        suspenderTarefa() {
            this.showAvisoSuspender = true;
        },
        async FecharAviso(reason) {
            this.showAvisoSuspender = false;
            try {
                console.log(`Suspending task ${this.id}`);
                const response = await axios.patch(`http://localhost:3000/services/${this.id}`, {
                    'estado': 'parado',
                    'descrição': reason
                });
                console.log('Response from server:', response.data);
                this.backToHome();
            } catch (error) {
                console.error(error);
            }
        }
    },
    async created(){
        if (this.id==null)
            this.backToLogin()
    },
    async beforeMount() {
        try {
            console.log(`Getting task ${this.id} from server`);
            const response = await axios.get(`http://localhost:3000/services/${this.id}`);
            const data = response.data;
            console.log('Response from server:', data);

            this.matricula = data['vehicleId'];

            if (data['data-chegada']) {
                const { dia, mes, ano, hora, minutos } = data['data-chegada'];
                this.data_chegada = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')} ${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
            }

            if (data['data']) {
                const { dia, mes, ano, hora, minutos } = data['data'];
                this.data_entrega = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')} ${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
            }
            else {
                this.data_entrega = "Não definida";
            }

            if (data['descrição']) {
                this.descricao = data['descrição'];
            }

            const sd = data['service-definitionId'];
            const serviceDefinitionResponse = await axios.get(`http://localhost:3000/service-definitions/${sd}`);
            const vehicleResponse = await axios.get(`http://localhost:3000/vehicles/${this.matricula}`);

            this.title = serviceDefinitionResponse.data['descr'];
            this.duracao = `${serviceDefinitionResponse.data['duração']} minutos`;

            const id_client = vehicleResponse.data['clientId'];
            const clientResponse = await axios.get(`http://localhost:3000/clients/${id_client}`);

            this.cliente = clientResponse.data['nome'];
            this.contacto = clientResponse.data['telefone'];
        } catch (error) {
            console.error(error);
        }
    }
}
</script>

<style scoped>
    .text-data {
        font-size: 2.5rex; 
    }

    .task-card {
        border-radius: 12px; 
        width: 80%;
        height: auto;
        margin: auto;
    }
    
    .info-label, .info-value {
        padding: 10px;
        text-align: center; 
        align-content: center;
    }

    .info-label {
        background-color: #1B8FB3; 
        color: #EAEBED;
        border: 1px solid #006989; 
        font-size: 1.875rem;
        line-height: 2.25rem; 
    }

    .info-value {
        color: #006989; 
        border: 1px solid #006989; 
        padding: 10px;
        background-color: #D9D9D9;
        font-size: 1.25rem; 
        line-height: 1.75rem; 
    }

    .task-details {
        display: grid;
        grid-template-columns: 1fr 2fr; 
        grid-auto-rows: 70px;
        width: fit-content; 
        margin: auto;
        width: 80%; 
        border: 1px solid #006989;
        border-radius: 10px;
    }

    .task-container {
        overflow-y: auto;
        max-width: 25rem; 
        text-align: center;
        height: auto;
    }

</style>



       