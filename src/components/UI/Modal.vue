<template>
    <div class="dialog" v-if="show" @click="HideDialog">
        <div @click.stop class="dialog__content">
            <slot>

            </slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'modal',

    props:{
        show: {
            type:Boolean,
            default: false,
        }
    },
    methods:{
        HideDialog(){
            this.$emit('update:show', false);
        }
    }
}
</script>
<style scoped>
.dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    backdrop-filter: blur(8px);
    background-color: rgba(0,0,0, 0.5);
    position: fixed;
    display:flex;
}
.dialog__content{
    margin:auto;
    background-color: white;
    border-radius: 1em;
    min-width: 25em;
    display: flex;
    align-items: center;
    gap: 1.5em;
    flex-direction: column;
    padding: 1.25em;
}
</style>