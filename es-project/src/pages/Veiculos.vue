<template>
  <div class="min-h-screen">
    <Navbar title="Veículo"/>
    <div class="ml-name text-center text-sky-800 text-8xl font-extrabold">{{ name }}</div>
    <div class="flex flex-col justify-center cards">
        <CardV :card="{img: profileImage1, title: name1, subtitle: personalInfo1}"/>
        <CardV :card="{img: profileImage2, title: name2, subtitle: personalInfo2}"/>
        <CardV :card="{img: profileImage3, title: name3, subtitle: personalInfo3}"/>
        <CardV :card="{img: profileImage4, title: name4, subtitle: personalInfo4}"/>
        <CardV :card="{img: profileImage5, title: name5, subtitle: personalInfo5}"/>
    </div>
    <Buttons class="Buttons" :buttons="{img: '/chevron-left-solid.svg', text: 'Voltar'}" @click="back"/>
  </div>
</template>

<script>
import CardV from '../components/CardV.vue';
import Navbar from '../components/Navbar.vue';
import Buttons from '../components/Buttons.vue';
import { useVeicStore } from '../store/veicStore';
import axios from 'axios';
import navMixin from '../mixins/navMixin';

export default {

  name: 'Veiculo',
  setup() {
    const veicStore = useVeicStore()
    return {      
        id_carro: veicStore.getVeicId
    }
  },
  mixins: [navMixin],
  components: {
    Navbar,
    CardV,
    Buttons
  },
  data(){
    return {
        name1: '',
        personalInfo1: '',
        profileImage1: '/car-repair-svgrepo-com.svg',
        name2: '',
        personalInfo2: '',
        profileImage2: '/user-solid.svg',
        name3: '',
        personalInfo3: '',
        profileImage3: '/car-repair-svgrepo-com.svg',
        name4: '',
        personalInfo4: '',
        profileImage4: '/gas-pump-solid.svg',
        name5: '',
        personalInfo5: '',
        profileImage5: '/car-repair-svgrepo-com.svg'
    }
  },
  methods: {
    back(){
        this.$router.push('/tarefa')
    }
  },
  async created(){
        if (this.id_carro==null)
            this.backToLogin()
    },
  async beforeMount() {
    try {
    
        const veiculo_data = await axios.get(`http://localhost:3000/vehicles/${this.id_carro}`)
        const veiculo = veiculo_data["data"]

        const id_cli = veiculo["clientId"]
        
        const cliente_data = await axios.get(`http://localhost:3000/clients/${id_cli}`)
        const cliente = cliente_data["data"]
        
        this.name = veiculo["marca"]
        
        this.name1 = 'Matrícula'
        this.personalInfo1 = veiculo.id
        console.log('Matricula:', veiculo.id)
        this.name2 = 'Cliente'
        this.personalInfo2 = cliente.nome
        
        if(veiculo["cilindrada"]!=null){
          this.name3 = 'Cilindrada'
          this.personalInfo3 = veiculo.cilindrada
        }
        if(veiculo["potencia"]!=null){
          if(veiculo["cilindrada"]==null){
            this.name3 = 'Potência'
            this.personalInfo3 = veiculo.potencia
          }
          else{
            this.name3 = 'Potência/Cilindrada'
            this.personalInfo3 = veiculo.potencia + ' / ' + veiculo.cilindrada
          }
        }

        
        this.name4 = 'Tipo de Veículo'
        this.personalInfo4 = veiculo["vehicle-typeId"].charAt(0).toUpperCase() + veiculo["vehicle-typeId"].slice(1);
        this.name5 = 'Kilometros'
        this.personalInfo5 = veiculo["kms"]
        



    } catch (error) {
        console.error(error);
    }
  }
}
</script>

<style scoped>
  .ml-name {
    margin-top: 30px;
  }
  .text-info{
    color: #006989;
    font-size: 1.5rem; 
  }
  .cards {
    margin-top: 30px;
  }
  .Buttons {
    margin-top: -40px;
  }
</style>