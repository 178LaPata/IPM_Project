<template>
<div class="min-h-screen bg-white text-white font-extrabold ">
    <Navbar title="Serviços Extra">
    </Navbar>

    <h1 class="font-black text-5xl texto">Adicionar Serviço Extra</h1>
    <Buttons class="Buttons" :buttons="{img: '/check-solid.svg', text: 'Confirmar'} " @click="AvisoConfirmar" />
    <div class="rounded-xl flex flex-wrap justify-center bg-div scroll-container">
        <CardT v-for="card in tarefas" :key="card.id" :card="card" @click="addToSelected(card.id) " :class="{ 'button-pressed': selected.includes(card.id) }" />
    </div>

    <Buttons class="Buttons" :buttons="{img: '/chevron-left-solid.svg', text: 'Voltar'}" @click="goToAviso"/>
    <AvisoVoltar
        v-if="showAviso"
        :visible="showAviso"
        message="Tem a certeza quer voltar? Todas as seleções serão perdidas."
        @close="showAviso = false"
        @confirm="goToTarefa"
    />
    <AvisoConfirmar
        v-if="showAvisoC"
        :visible="showAvisoC"
        message="Tem a certeza que deseja confirmar as tarefas extra?"
        @close="showAvisoC = false"
        @confirm="confirmar"
    />
</div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Buttons from '../components/Buttons.vue';
import AvisoVoltar from '../components/AvisoLogout.vue';
import AvisoConfirmar from '../components/AvisoLogout.vue';
import CardT from '../components/CardT.vue';
import { useTarefaStore } from '../store/tarefaStore';
import axios from 'axios';
import navMixin from '../mixins/navMixin';

export default {
    components: {
        Navbar,
        CardT,
        Buttons,
        AvisoVoltar,
        AvisoConfirmar
    },
    mixins: [navMixin],
    setup() {
        const tarefaStore = useTarefaStore();
        return {
            idT: tarefaStore.getID,
        }
    },
    data() {
        return {
            tarefas : [

            ],
            selected: [],
            showAviso: false,
            showAvisoC: false
        }
    },
    methods: {
        AvisoConfirmar() {
            this.showAvisoC = true;
        },
        goToAviso() {
            this.showAviso = true;
        },
        goToTarefa() {
            this.showAviso = false;
            this.$router.push('/tarefaAtual');
        },
        addToSelected(id) {
            if (this.selected.includes(id)) {
                this.selected = this.selected.filter((item) => item !== id);
            } else {
                this.selected.push(id);
            }
        },
        async confirmar() {
            try {
                const response = await axios.patch(`http://localhost:3000/services/${this.idT}`, {
                    estado : 'realizado',
                    servicosExtra: this.selected
                });
                this.$router.push('/servicos');
            } catch (error) {
                console.error(error);
            }
        }
    },
    async created(){
        if (this.idT==null)
            this.backToLogin()
    },
    async beforeMount() {
        try{
            const response = await axios.get('http://localhost:3000/service-definitions');
            for (let i = 0; i < response.data.length; i++) {
                this.tarefas.push({
                    id: response.data[i]["id"],
                    Tarefa: response.data[i]["descr"],
                    duracao: response.data[i]["duração"],
                });
            }
        } catch (error) {
            console.error(error);
        }

    }

}

</script>


<style scoped>
    .bg-div {
        display: flex;
        flex-wrap: wrap; 
        justify-content: center;
        align-items: flex-start; 
        background-color: #1B8FB3;
        width: 80%;
        margin-top: 50px;
        margin-left: auto;
        margin-right: auto;
        padding: 20px;
        border-radius: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        gap: 20px; 
    }

    .scroll-container {
        height: 520px; 
        overflow-y: auto;
    }

    .texto {
        text-align: center;
        color: #006989;
        margin-top: 50px;
    }

    .Buttons {
        margin-top: 30px;
    }
    .button-pressed {
        background-color: grey;
        color: white;
        cursor: not-allowed;
    }
</style>
