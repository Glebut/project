<template>
    <div class="volunteer-card"> 
        <div class="info"> 
            <p class="volunteer__fio">{{volunteer.FIO}}</p>
            <div class="buttons">
            <button class="button" @click="indicateChangeID"><span class="material-symbols-outlined">brush</span></button>
            <button class="button" @click="indicateID"><span class="material-symbols-outlined">delete</span></button>
            </div>
        </div>
    </div>
</template>
<script>


export default{
    name: 'volunteer-item',
    props: {
        volunteer: {
            type: Object,
            required: true,
        },
    },
    methods: {
        indicateChangeID(){
            this.$emit("indicateChangeID", this.volunteer.id)
        },
        indicateID(){
            this.$emit("indicateID", this.volunteer.id)
        }
    }
}
</script>
<style lang="scss" scoped>

.info{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 28em;
}

.button{
    border: none;
    background-color: var(--green);
    color: var(--white);
    width: 2.75em;
    height: 2.75em;
    border-radius: 0.25em;
}
.buttons{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.25em;
}
button:active{
    background-color: var(--light-green);
}
.volunteer__fio{
    color: var(--black);
    font-family: Rubik, sans-serif;
    font-size: 1.15em;
    font-style: normal;
    font-weight: 400;
    line-height: 100%; /* 20px */
}

</style>