has this component:
<template>
    <div class="bg-card grow shrink basis-0 rounded-3xl shadow flex flex-col justify-center items-center gap-2.5">
        <div class="text-3xl font-bold ">{{card.Tarefa}}</div>
        <div class="w-80">
            <span class=" text-xl font-bold">Duração: </span>
            <span class=" text-xl font-normal">{{card.duracao}} min</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardT',
    props: {
        card: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style scoped>
.bg-card {
    background-color: #D9D9D9;
    color: #006989;
    width: calc(33.333% - 20px);
    height: 150px;
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    flex-direction: column; 
    justify-content: center; 
    align-items: flex-start; 
    box-sizing: border-box; 
    padding: 20px;
}

</style>