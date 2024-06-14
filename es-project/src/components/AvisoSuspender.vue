<template>
    <transition name="fade">
        <transition name="fade">
            <div v-if="visible" class="pop text-center text-primary rounded-lg">
            <h3 class="font-bold warning">Aviso</h3>
            <p class="text-c">{{ message }}</p>
            <textarea class="motivo text-xl font-bold" v-model="messageC" placeholder="Escreva aqui o motivo da suspensão"></textarea>
            <div class="flex justify-around mb-4">
                <button @click="closePopup" class="but1 text-2xl font-bold">Não</button>
                <button @click="confirmAction" class="but2 text-2xl font-bold">Sim</button>
            </div>
        </div>
        </transition>
    </transition>
</template>

<script>
    export default {
        props: {
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
            },
            confirmAction() {
                this.$emit('confirm', this.messageC);
            }
        }
}
</script>

<style scoped>    

    .pop {
        background-color: #EAEBED;
        width: 50%;

        position: fixed;
        bottom: 20%;
        left: 26%;
    }


    .but1, .but2 {
        border-radius: 10px;
        border: 2px solid #006989;
        padding: 10px 20px;
        margin-top: 30px;
    }

    .but1 {
        background-color: rgba(245, 108, 108, 0.5);
    }

    .but2 {
        background-color: rgba(95, 220, 108, 0.5);
    }

    .warning {
        margin-top: 20px;
        font-size: 3.75rem;
        line-height: 1;
    }

    .text-c {
        margin-top: 20px;
        font-size: 1.875rem; 
        line-height: 2.25rem;
        margin: 20px;
    }

    .motivo {
        margin-top: 20px;
        width: 80%;
        height: 150px;
        border-radius: 10px;
        padding: 10px;
    }

    ::placeholder {
        color: #006989;
    }

</style>