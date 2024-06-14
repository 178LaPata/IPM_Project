<template>
    <div class="buttons-container flex flex-col items-end">
        <button :class="buttonText(buttons.text) + ' flex items-center text-black font-bold margin py-2 px-4 rounded border border-solid text-buttons'">
            <img :src="buttons.img" alt="Right_arrow" class="arrow">
            {{ buttons.text }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'Buttons',
    props: {
        buttons: {
            type: Object,
            required: true,
        }
    },
    methods: {
        buttonText(texto) {
            switch (texto) {
                case 'Voltar':
                    return 'voltar';
                case 'Continuar':
                case 'Aceitar':
                case 'Confirmar':
                case 'Concluir':
                case 'Sim':
                    return 'button-green';
                case 'Suspender':
                case 'Recusar':
                case 'Não':
                    return 'button-red';
                default:
                    return ''; 
            }
        }
    }
}
</script>


<style scoped>
    .voltar {
        background-color: #EAEBED;
    }
    .text-buttons {
        font-size: 20px;
    }
    .arrow {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }
    .button-green {
        background-color: rgba(95, 220, 108, 0.5); /* 50% de opacidade */
    }

    .button-red {
        background-color: rgba(245, 108, 108, 0.5); /* 50% de opacidade */
    }
    
    .voltar, .button-green, .button-red {
        border-width: 2px; 
        color: #006989;
        border-color: #006989;
    }

    .margin {
        margin-bottom: 1rem;
        margin-right: 5rem;
    }

</style>