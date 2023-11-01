<template>
    <div class="dialog" v-if="show" @click="HideDialog">
        <div @click.stop class="dialog__content">
            <div class="close"></div>
            <span class="name">Заявка</span>
            
            <form action="">
                <input type="text" class="input" placeholder="Имя">
                <input type="text" class="input" placeholder="Фамилия">
                <input type="text" class="input" placeholder="Номер телефона">
            </form>
            <my-button class="button">Отправить</my-button>

        </div>
    </div>
</template>
<script>
export default {
    name: 'my-dialog',

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
    background-color: rgba(0,0,0, 0.5);
    position: fixed;
    display:flex;
}
.dialog__content{
    margin:auto;
    background-color: white;
    border-radius: 1em;
    width: 25em;
    display: flex;
    align-items: center;
    gap: 3em;
    flex-direction: column;
    padding-top: 20px;
    padding-bottom: 20px;
}
form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
    width: 20em;


}

.input{
    width: 20em;
    padding: 1em 2em;
    border: none;
    border: 0.15em solid var(--green);
    border-radius: 1em;
    outline: none;
}

.button{
    transform: scale(0.8);
}
button:hover{
        transform: scale(0.9);

    } 
    .name{
        color: var(--black);
    font-family: Rubik, sans-serif;
    font-size: 1.5em;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    }
</style>