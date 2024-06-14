<template>
    <div class="min-h-screen text-white">
        <Navbar title="Cliente"/>
        <div class="profile-pic flex flex-row items-center">
            <img class="rounded-full prof-img" :src="profileImage" alt="profile-pic">
            <div class="ml-96 text-center text-sky-800 text-8xl font-extrabold">{{ name }}</div>
            <h3 class="ml-12 text-info">{{ id }}</h3>
        </div>
        <div class="flex flex-col justify-center cards">
            <Card :card="{img: profileImage1, title: name1, subtitle: personalInfo1}"/>
            <Card :card="{img: profileImage2, title: name2, subtitle: personalInfo2}"/>
            <Card :card="{img: profileImage3, title: name3, subtitle: personalInfo3}"/>
        </div>
        <Buttons :buttons="{img: '/chevron-left-solid.svg', text: 'Voltar'}" @click="back"/>
    </div>
</template>

<script>
import Card from '../components/Card.vue';
import Navbar from '../components/Navbar.vue';
import Buttons from '../components/Buttons.vue';
import { useClientStore } from "../store/clientStore.js";
import axios from 'axios';
import navMixin from '../mixins/navMixin.js';
import { warn } from 'vue';

export default {
    name: 'Perfil',
    components: {
        Navbar,
        Card,
        Buttons
    }, 
    mixins: [navMixin],
    setup() {
        const clientStore = useClientStore()

        return {
            id: "",
            name: clientStore.getClienteNome,
            veiculos_cliente: [],
            profileImage: ""
        }
    },
    data() {
        return {
            name1: '',
            personalInfo1: '',
            profileImage1: '',
            name2: '',
            personalInfo2: '',
            profileImage2: '',
            name3: '',
            personalInfo3: '',
            profileImage3: '',
            profileImageAct: ''
        }
    },
    async created(){
        if (this.name==null)
            this.backToLogin()
    },
    async beforeMount() {
        try {
            console.log(this.name)
            const clientes = await axios.get('http://localhost:3000/clients')
            const cliente = clientes.data.find(cliente => cliente.nome === this.name)
            this.profileImage = cliente["image"]
            this.id = cliente["id"]
            const veiculos = await axios.get('http://localhost:3000/vehicles')
            this.veiculos_cliente = veiculos.data.filter(veiculo => veiculo.clientId === cliente.id)
            
            this.setCard1(cliente)
            this.setCard2(cliente)
            this.setCard3(cliente)

        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        setCard1(cliente) {
            this.name1 = "Email"
            this.personalInfo1 = cliente.email
            this.profileImage1 = "/envelope-solid.svg"
        },
        setCard2(cliente) {
            this.name2 = "Telefone"
            this.personalInfo2 = cliente.telefone
            this.profileImage2 = "/mobile-screen-button-solid.svg"
        },
        setCard3(cliente) {
            this.name3 = "Veículos"
            this.personalInfo3 = this.veiculos_cliente.length
            this.profileImage3 = "/car-solid.svg"
        },
        back() {
            this.$router.push('/tarefa')
        }
    }
}
</script>
<style scoped>
    .text-info{
        color: #006989;
        font-size: 1.5rem; 
    }
    .profile-pic {
        margin-left: 150px;
        margin-top: 10px;
    }        
    .prof-img {
        width: 200px;
        height: 200px;
        margin-top: 40px;
    }

</style>