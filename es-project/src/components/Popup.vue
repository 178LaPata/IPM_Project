<template>
    <transition name="fade">
        <div v-if="visible" class="fixedp rounded-2xl w-1/3 flex flex-col justify-center items-center center pop">
            <h3 class="text-secondary text-5xl m-4 font-bold italic">{{ title }}</h3>
            <p class="text-secondary text-2xl m-4 font-light">{{ message }}</p>
            <button @click="closePopup" class="text-xl my-5 font-bold botaoPop">OK</button>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        title: {
        type: String,
        default: 'Error'
        },
        message: {
        type: String,
        required: true
        },
        visible: {
        type: Boolean,
        required: true
        }
    },
    methods: {
        closePopup() {
        this.$emit('close');
        }
    }
}
</script>

<style scoped>
    .pop {
        background-color: #C21807;
    }
    
    .fixedp {
        height: 28%;
        position: fixed;
        bottom: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .botaoPop {
        background-color: rgba(255, 255, 255, 0.3);
        width: 150px;
        height: 50px;
        border-radius: 10px;
        color: #EAEBED;
    }

</style>