<template>
    <div class="flex items-center justify-between bg-navbar shadow-md">
        <button class="flex items-center">
            <img src="/logo-no-background-white.svg" alt="Logo" style="width: 60px; height: 60px;" class="ml-4 my-2" @click="goToHome" />
        </button>
        <span class="text-title text-5xl font-extrabold"> {{ title }}</span>
        <div class="flex items-center space-x-4 mr-4">
            <img src="/user-icon.svg" alt="Settings Icon" style="width: 50px; height: 50px" class="hover:text-blue-300 hover:cursor-pointer" @click="goToProfile" />
            <img src="/log-out.svg" alt="Logout Icon" style="width: 50px; height: 50px;" class="hover:text-blue-300 hover:cursor-pointer" @click="Avisolog" />
        </div>
        <AvisoLogout 
            v-if="showAviso"
            :visible="showAviso"
            message="Tem a certeza que deseja sair?"
            @close="showAviso = false"
            @confirm="logout"
        />
            
    </div>
</template>

<script>
import AvisoLogout from './AvisoLogout.vue';
export default {
    name: 'Navbar',
    props: ['title'],
    components: {
        AvisoLogout
    },
    data() {
        return {
            showAviso: false
        }
    },
    methods: {
        goToHome() {
            this.$router.push('/servicos');
        },
        goToProfile() {
            this.$router.push('/perfil');
        },
        Avisolog() {
            this.showAviso = true;
        },
        logout() {
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>
    .bg-navbar{
        background: radial-gradient(circle at top, #005b89 5%, #008bb2 40%, #8bafc1 100%);
        background-repeat: no-repeat;
        background-attachment: fixed;
    }
    .text-title {
        color: #EAEBED;
    }
</style>