<template>
    <p><slot></slot></p>
</template>
<script>
export default{
    name:'text-animation'
}
</script>
<style lang="scss" scoped>

    p{
        color: var(--black);
        font-size: 2.9em;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; 
        font-family: Rubik, sans-serif;
        animation: 6s show ease;
    }
    @keyframes show {
    from { opacity: 0; }
    to { opacity: 1; }
}

</style>