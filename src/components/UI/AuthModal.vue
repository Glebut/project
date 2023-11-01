<template>
    <modal>
        <div class="close"></div>
            <span class="name">Авторизация</span>
            <form action="">
                <input 
                type="text" 
                class="input" 
                placeholder="Email"
                maxlength="255"
                v-model="this.userData.email">
                <p v-show="showFormNoValidEmailErrorMessage" class="error__text">Некорректная почта</p>
                <input 
                class="input" 
                placeholder="Пароль"
                maxlength="255"
                type="password"
                v-model="this.userData.password"
                >            
                <p v-show="showFormWrongDataErrorMessage" class="error__text">Неверный логин или пароль</p>
                <p v-show="showFormUnknownErrorMessage" class="error__text">Неизвестная ошибка</p>
                <p v-show="showFormServerErrorMessage" class="error__text">Ошибка сервера</p>
                <p v-show="showFormNoValidPasswordErrorMessage" class="error__text">Некорректный пароль</p>

            </form>
            <my-button class="button" @click="this.formSubmit">Войти</my-button>
    </modal>
</template>
<script>

import Modal from './Modal.vue';

export default {
    name: 'auth',
    components:{
        Modal
    },
    
    props:{
            showFormWrongDataErrorMessage:{
				type: Boolean,
				required: true,
			},
            
            showFormUnknownErrorMessage:{
				type: Boolean,
				required: true,
			},
            showFormServerErrorMessage:{
				type: Boolean,
				required: true,
			},
            
		},

    data(){
        return {
				userData: {
					email: "",
					password: "",
			},
            dialogVisible: true,
            showFormNoValidEmailErrorMessage: false,
            showFormNoValidPasswordErrorMessage: false,
        }
    },
    methods:{
        closeDialog(){
            this.dialogVisible = false;
        },
		formSubmit() {
            const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
            
            this.showFormNoValidEmailErrorMessage = false;
            this.showFormNoValidPasswordErrorMessage = false;

            if(this.userData.email.length > 255 || this.userData.email < 3){
                this.showFormNoValidEmailErrorMessage = true;
            };

            if(this.userData.password.length > 255 || this.userData.password < 3){
                this.showFormNoValidPasswordErrorMessage = true;
            };

            if(!emailRegex.test(this.userData.email)){
                this.showFormNoValidEmailErrorMessage = true;
                return;
            }

			this.$emit("formSubmit", this.userData);
        },
    }
}
</script>



<style scoped lang="scss">
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
    .error__text{
        font-family: Inter, sans-serif;
        font-size: 1em;
        font-style: normal;
        font-weight: 500;
        color: red;
    }
</style>