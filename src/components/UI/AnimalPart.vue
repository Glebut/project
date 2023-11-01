<template>         
    <div class="animal-list" >
        <animal-item
v-for="part in parts" 
        :part="part"
        :key="part.id">
</animal-item>
</div>

<h2 class="no-posts" v-show="parts.length === 0">Доступных животных нет</h2>

</template>
<script>
    import AnimalItem from "@/components/UI/AnimalItem";

export default{
    
    name: 'part-of-animals',
    components:{AnimalItem},
    props: {
        parts: {
            type: Array,
            required: true,
        }
    },
}

</script>
<style lang="scss" scoped>
.animal-list{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
    width: 90%;
}
</style>