<template>
    <div class="min-h-screen bg-white text-white font-extrabold">
        <Navbar title="Tarefa"/>
        
        <div class="flex justify-around mt-10">
            <h1 class="text-8xl text-primary">{{ title }}</h1>
            <div class="flex flex-col">
                <Buttons class="aceitar" :buttons="{img: '/check-solid.svg', text: 'Aceitar'}" @click="goToTarefaAtual"/>
            </div>
        </div>

        <div class="task-card bg-white p-8">
            <div class="task-details grid grid-cols-3 gap-0">
                <div class="info-label bg-label task-container rounded-tl-lg cursor-pointer" @click="goToCarro" >Veículo</div>
                <div class="info-value bg-value rounded-tr-lg cursor-pointer" @click="goToCarro">{{ matricula }}</div>
                <div class="info-label bg-label task-container">Data Chegada</div>
                <div class="info-value bg-value">{{ data_chegada }}</div>
                <div class="info-label bg-label task-container">Data Entrega</div>
                <div class="info-value bg-value">{{ data_entrega }}</div>
                <div class="info-label bg-label task-container">Descrição</div>
                <div class="info-value bg-value">{{ descricao }}</div>
                <div class="info-label bg-label task-container">Duração</div>
                <div class="info-value bg-value">{{ duracao }}</div>
                <div class="info-label bg-label task-container cursor-pointer" @click="goToCliente">Cliente</div>
                <div class="info-value bg-value cursor-pointer" @click="goToCliente">{{ cliente }}</div>
                <div class="info-label bg-label task-container rounded-bl-lg">Contacto</div>
                <div class="info-value bg-value rounded-br-lg">{{ contacto }}</div>
            </div>
        </div>

        <Buttons class="Buttons" :buttons="{img: '/chevron-left-solid.svg', text: 'Voltar'}" @click="gotoservicos"/>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Buttons from '../components/Buttons.vue';
import { useMecStore } from "../store/mecStore";
import { useTarefaStore } from '../store/tarefaStore';
import { useVeicStore } from '../store/veicStore';
import { useClientStore } from '../store/clientStore';
import axios from 'axios';
import navMixin from '../mixins/navMixin';

export default {
    components: {
        Navbar,
        Buttons
    },
    mixins: [navMixin],
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
        }
    },
    setup() {
        const store = useMecStore()
        return {
            id: store.getMecId,
            name: store.getMecName,
            profileImage: store.getMecImg,
            personalInfo: store.getMecRole
        }
    },
    methods: {
        gotoservicos() {
            this.$router.push({ name: 'Servicos' });
        },
        goToCliente() {
            const clientStore = useClientStore()
            clientStore.setClienteNome(this.cliente)
            this.$router.push({ name: 'Cliente' });
        },
        goToCarro() {
            const veicStore = useVeicStore()
            veicStore.setVeicId(this.matricula)
            this.$router.push({ name: 'Veiculos' });
        },
        goToTarefaAtual() {
            this.$router.push({ name: 'TarefaAtual' });
        }
    },
    async created(){
        if (this.id==null)
            this.backToLogin()
    },
    async beforeMount() {
        const tarefaStore = useTarefaStore();
        const id = tarefaStore.getID;
        try {
            console.log(`Getting task ${id} from server`);
            const response = await axios.get(`http://localhost:3000/services/${id}`);
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
    },
}
</script>

<style scoped>

    .text-primary {
        margin: auto;
    }
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
    .recusar {
        padding: 0px!important;
    }

</style>