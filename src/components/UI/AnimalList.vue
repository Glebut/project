<template>         
    <div class="animal-list" >
        <animal-item
            v-for="animal in animals" 
            :animal="animal"
            :key="animal.id">
        </animal-item>
    </div>
<h2 class="loading__text" v-show="animals.length === 0">Загрузка . . .</h2>
</template>
<script>
    import AnimalItem from "@/components/UI/AnimalItem";

export default{
    
    name: 'animal-list',
    components:{AnimalItem},
    props: {
        animals: {
            type: Array,
            required: true,
        },
        parts:{
            type: Array,
            required: true,
        }
    },
    methods:{
        partAnimals(Array){
            const  parts = Array.slice(0, 8);
            return parts;
        },

    }
}

</script>
<style lang="scss" scoped>
.animal-list{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 2.5em;
    flex-wrap: wrap;
    width: 90%;
}
.loading__text{
    font-family: Inter, sans-serif;
    height: 400;
    font-size: 1em;
    color: var(--brown);
}
</style>