<template>
    <div class="flex h-screen">
        <div class="w-1/2 bg-cover bg-center bg-custom-background flex flex-col pl-12 space-y-8">
            <h1 class="text-white text-login font-black italic login">LOGIN</h1>
            <h3 class="text-white text-4xl font-bold italic login2"> Entre na sua conta</h3>
        </div>
        <form @submit.prevent="handleLogin" class="w-1/2 flex flex-col bg-whites p-24 items-center">
            <div class="w-full max-w-xs flex flex-col items-center">
                <img src="/logo-no-background.svg" alt="Logo" class="logo" />
                <div class="mb-4">
                    <div class="flex items-center px-3 py-2 border rounded-3xl border-gray-300 bg-gray-200 botao">
                        <img src="/user.svg" alt="User" class="mr-4 icons"/>
                        <input class="bg-transparent focus:outline-none w-full text-gray-700 font-medium inp" type="text" placeholder="Utilizador" 
                        v-model="id">
                    </div>
                </div>
                <div class="mb-8">
                    <div class="flex items-center px-3 py-2 border rounded-3xl border-gray-300 bg-gray-200 botao">
                        <img src="/key.svg" alt="Lock" class="mr-4 icons" />
                        <input class="bg-transparent focus:outline-none w-full text-gray-700 font-medium inp" type="password" placeholder="Palavra-passe" v-model="password">
                    </div>
                </div>
                <button class="w-full mb-4 py-3 px-4 bg-primary text-white text-2xl rounded-3xl focus:outline-none hover:bg-cyan-600 font-extrabold botaoLogin flex justify-center items-center"
                    type="submit">
                    Login
                    <img src="/chevron-right-solid.svg" alt="Right_arrow" class="arrow">
                </button>
            </div>
            <Popup
                v-if="showPopup"
                :visible="showPopup"
                title="Login Falhado!"
                message="Utilizador ou Palavra-passe errados."
                @close="showPopup = false"
            />
        </form>
    </div>  
    
</template>


<script>
import { useMecStore } from "../store/mecStore.js";
import Popup from '../components/Popup.vue';
import axios from 'axios';

export default {
    data() {
        return {
            id: '',
            password: '',
            showPopup: false,
        }
    },
    methods: {
        async handleLogin() {
            const mecStore = useMecStore()

            if (!this.id || !this.password) {
                console.log("Username/Password não preenchidos")
                return; 
            }

            try {
                const response = await axios.get('http://localhost:3000/mecanicos', {
                    params: {
                        id: this.id,
                        password: this.password
                    }
                });
                if (response.data.length === 0) {
                    console.log('Login failed');
                    this.showPopup = true;
                } else {
                    mecStore.setMec(response.data[0]);
                    const today = new Date();
                    const date = {
                        dia: today.getDate(),
                        mes: today.getMonth() + 1, // January = 0
                        ano: today.getFullYear(),
                        hora: today.getHours(),
                        minutos: today.getMinutes()
                    };
                    mecStore.setDate(date);       

                    this.$router.push('/servicos');
                }
            } catch (error) {
                console.error(error);
            }
        }
    }, 
    components: {
        Popup
    }
};
</script>



<style scoped>
    .bg-custom-background {
        background: radial-gradient(circle at top, #005b89 5%, #008bb2 40%, #8bafc1 100%);
        background-repeat: no-repeat;
        background-attachment: fixed;
    }

    .text-login{
        font-size: 10rem;
        line-height: 1;
    }

    .logo {
        margin-bottom: 3rem;
        width: 250px;
        height: 250px;
    }

    .botao {
        width: 500px;
        height: 70px;
        font-size: 25px;
        background-color: #A3BAC3;
    }

    .botaoLogin {
        width: 500px;
        height: 70px;
        font-size: 40px;
        color: #A3BAC3;
    }

    .icons {
        width: 35px;
        height: 35px;
        margin-left: 20px;
        margin-right: 20px;
    }

    .login {
        margin-top: 6rem;
        margin-left: 2rem;
    }

    .login2 {
        margin-top: 2rem;
        margin-left: 4rem;
    }

    .forgot {
        font-size: 18px;
    }

    .arrow {
        width: 40px;
        height: 40px;
        position: absolute;
        right: 15rem;
    }

    input::placeholder {
        color: #006989;
    }

    .inp {
        color: #006989;
    }
</style>