<template>
    <div class="min-h-screen text-white">
        <Navbar title="Mecânico"/>
        <div class="profile-pic flex flex-row items-center">
            <img class="rounded-full prof-img" :src="profileImage" alt="profile-pic">
            <div class="ml-96 text-center text-sky-800 text-8xl font-extrabold">{{ name }}</div>
            <h3 class="ml-id text-info">{{ id }}</h3>
        </div>
        <div class="flex flex-col justify-center cards">
            <Card :card="{img: profileImage1, title: name1, subtitle: personalInfo1}"/>
            <Card :card="{img: profileImage2, title: name2, subtitle: personalInfo2}"/>
            <Card :card="{img: profileImage3, title: name3, subtitle: personalInfo3}"/>
        </div>
        <Buttons :buttons="{img: '/chevron-left-solid.svg', text: 'Voltar'}" @click="backToHome"/>
    </div>
</template>

<script>
import Card from '../components/Card.vue';
import Navbar from '../components/Navbar.vue';
import Buttons from '../components/Buttons.vue';
import { useMecStore } from "../store/mecStore.js";
import axios from 'axios';
import navMixin from '../mixins/navMixin.js';

export default {
    name: 'Perfil',
    mixins: [navMixin],
    components: {
        Navbar,
        Card,
        Buttons
    }, 
    setup() {
        const store = useMecStore()
        console.log('Mec' + store.getMecImg)
        return {
            id: store.getMecId,
            name: store.getMecName,
            profileImage: store.getMecImg,
            personalInfo: store.getMecRole
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
            profileImage3: ''
        }
    },
    async created(){
        if (this.id==null)
            this.backToLogin()
    },
    async beforeMount() {
        try {
            const mecanicos = await axios.get('http://localhost:3000/mecanicos')
            const mecanico = mecanicos.data.find(mecanico => mecanico.id === this.id)

            this.setCard1(mecanico)
            this.setCard2(mecanico)
            this.setCard3(mecanico)

        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        setCard1(mecanico) {
            this.name1 = "Idade"
            this.personalInfo1 = mecanico.idade
            this.profileImage1 = "/hourglass-end-solid.svg"
        },
        setCard2(mecanico) {
            this.name2 = "Especialização"
            const role = mecanico.role
            if (role === "eletrico") {
                this.personalInfo2 = "Motores elétricos"
            } else if (role === "combustao") {
                this.personalInfo2 = "Motores de combustão"
            } else if (role === "geral") {
                this.personalInfo2 = "Mecânico geral"
            }
            this.profileImage2 = "/car-repair-svgrepo-com.svg"
        },
        setCard3(mecanico) {
            this.name3 = "Serviços"
            this.personalInfo3 = mecanico.jobs.length
            this.profileImage3 = "/certificate-solid.svg"
        }
    }
}
</script>
<style scoped>
    .ml-id{
        margin-left: 3rem;
    }
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