<template>
    <button><slot></slot></button>
</template>
<script>
    export default{
        name: 'my-button',
        methods:{
            
        }
    }
</script>

<style lang="scss" scoped>
    button{
        color: var(--white);
        padding: 1em 3em;
        background-color: var(--green);
        border-radius: 0.9375em;
        border: none;
        font-family: Inter, sans-serif;
        font-size: 1.25em;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        transition: 1s;
    }
    button:hover{
        background-color: var(--light-green);
        transform: scale(1.05); 
    }
</style>