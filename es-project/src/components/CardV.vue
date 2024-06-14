<template>
    <div class="flex justify-center items-center">
        <div class="bg-card rounded-l p-2 shadow-md m-5 flex items-center">
            <img class="card-img" :src="card.img" alt="cardImg">
            <div>
                <div class="text-5xl py-2 mt-2 font-bold">{{ card.title }}</div>
                <div class="text-2xl">
                    <p>
                        <span class="font-medium">{{ card.subtitle }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        card: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style scoped>
    .card {
        cursor: pointer;
    }
    .bg-card {
        background-color: #D9D9D9;
        color: #006989;
        width: 700px;
        height: 115px;
        margin-top: 0px;
        border-radius: 20px;
    }
    .card-img {
        width: 100px;
        height: 100px;
        margin-right: 30px;
        margin-left: 30px;
    }
</style>