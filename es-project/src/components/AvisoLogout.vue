<template>
    <transition name="fade">
        <transition name="fade">
            <div v-if="visible" class="fixed text-primary text-center pop">
                <h3 class="font-bold warning">Aviso</h3>
                <p class="text-c mx-4 ">{{ message }}</p>
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
                this.$emit('confirm');
                
            }
        }
}
</script>

<style scoped>    

.pop {
    background-color: #EAEBED;
    border-radius: 15px;

    position: fixed;
    bottom: 40%;
    left: 37%;
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
    margin-bottom: 10px;
    font-size: 1.875rem; /* 30px */
    line-height: 2.25rem; /* 36px */
}

</style>