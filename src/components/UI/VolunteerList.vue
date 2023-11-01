<template>         
    <div class="volunteer-list">
        <volunteer-item
            v-for="volunteer in volunteers" 
            :volunteer="volunteer"
            :key="volunteer.id"             
            @indicateChangeID="this.onIndicateChangeID"
            @indicateID="this.onIndicateID"
            >
        </volunteer-item>
    </div>
    <h2 class="loading__text" v-show="volunteers.length === 0">Загрузка . . .</h2>
</template>
<script>
    import VolunteerItem from "@/components/UI/VolunteerItem";

export default{
    
    name: 'volunteer-list',
    components:{VolunteerItem},
    props: {
        volunteers: {
            type: Array,
            required: true,
        },
    },
    methods:{
        onIndicateChangeID(volunteerID){
            this.$emit("onIndicateChangeID", volunteerID)
        },
        onIndicateID(volunteerID){
            this.$emit("onindicateID", volunteerID)

        }
    }
}
</script>
<style lang="scss" scoped>
.volunteer-list{
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