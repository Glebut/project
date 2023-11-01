<template>
    <section class="page">
            <auth-modal  
                :showFormWrongDataErrorMessage="this.showFormWrongDataErrorMessage"
                v-model:show="dialogVisible"
                @formSubmit="this.onFormSubmit"
                >
            </auth-modal>
            <modal v-model:show="showUnknownErrorModal"><p class="error__text">Неизвестная ошибка</p></modal>
            <modal v-model:show="showServerErrorModal"><p class="error__text">Ошибка сервера</p></modal>
            <div class="panel">
                <h1>Админ панель</h1>
                <div class="menu">                    
                    <button @click="this.$router.push({name: 'admin'})">Специальные запросы</button>
                    <button @click="this.$router.push({name: 'animals'})">Животные</button>
                    <button @click="this.$router.push({name: 'about-us'})">Волонтёры</button>
                </div>
                <my-button @click="unAdmin">Выйти</my-button>
            </div>
    </section>
</template>
<script>
import axios from "axios";
import qs from 'qs';

import AnimalList from "@/components/UI/AnimalList";
import AuthModal from "@/components/UI/AuthModal";
export default{
    components:{
    AnimalList,
    AuthModal,
    },
    data(){
        return {
            animals:[],
            volunteers:[],
            userLoginData:{
				email: null,
				password: null,
			},
            dialogVisible: true,
            tokenData: {
				access_token: null,
				token_type: null,
				expires_in: null,
			},
            showFormWrongDataErrorMessage: false,
            showFormNoValidEmailErrorMessage: false,
            showFormUnknownErrorMessage: false,
            showFormServerErrorMessage: false,

            showUnknownErrorModal: false,
            showServerErrorModal: false,
        }
    },
    methods:{

        checkResponseError(errorCode){
        if(errorCode == 500){
            this.showServerErrorModal = true;
            return;
        }
        if(errorCode == 403 && errorCode == 401){
            localStorage.removeItem("tokenData");
            this.dialogVisible = true;
            return;
        }
        this.showUnknownErrorModal = true
        }, 


        hideErrorMessages(){
            this.showFormUnknownErrorMessage = false;
            this.showFormServerErrorMessage = false;
            this.showFormWrongDataErrorMessage = false;
            this.showFormNoValidEmailError = false
        },

        checkUnauthorizedError(errorCode){
        if(errorCode == 403 && errorCode == 401){
            localStorage.removeItem('tokenData');
        }
        this.dialogVisible = true;
        },



        // выход из аккаунта админа
        unAdmin(){
            localStorage.removeItem('tokenData');
			this.$router.push({name: 'home'});        
        },
        openDialog(){
            this.dialogVisible = true;
        },
        closeDialog(){
            this.dialogVisible = false;
        },
        HideDialog(){
            this.$emit('update:show', true);
        },
        onFormSubmit(formData){
			this.userLoginData = formData;
			this.adminAuth();
		},
        // ошибки
        errorMessagesResetToFalse(){
			this.showFormWrongDataErrorMessage = false;
		},
        errorEmailResetToFalse(){
			this.showFormNoValidEmailError = false
		},
        adminAuth(){
            const data = qs.stringify({
                'email': this.userLoginData.email,
                'password': this.userLoginData.password, 
            });
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/auth/login',
                headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data : data
            }
            this.hideErrorMessages();
            axios.request(config)
            .then((response) => {
                this.tokenData = response.data;
                this.$router.push({name: 'animals'});
                localStorage.tokenData = JSON.stringify(this.tokenData);
                console.log(localStorage.tokenData);
                this.closeDialog();
            })
            .catch((error) => {       
                if(error == 500){
                    this.showFormServerErrorMessage = true;
                    return;
                }
                if(error == 403 || error == 401){
                    this.showFormWrongDataErrorMessage = false;
                    return;
                }
                this.showFormUnknownErrorMessage = true;
                
                this.errorMessagesResetToFalse();
                this.errorEmailResetToFalse();
                this.showFormWrongDataErrorMessage = true;
                console.log(error);

                
            });
        },
        // проверка токена
        TokenCheck(){
            if (localStorage.tokenData == null && localStorage.tokenData == undefined){
                this.openDialog();
            }
            else{
                this.closeDialog();
            }
        },


        // emailCheck(){
        //     const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        //     if(!emailRegex.test(this.userLoginData.email)){
        //         this.showFormNoValidEmailError = true;
        //         return;
        //     }else{
        //         this.showFormNoValidEmailError = false;
        //     }
        // },



        //запрос на получение всех волонтеров 
        getAllVolunteers(){
            let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/v1/volunteers/',
            headers: { },
            };

            axios.request(config)
            .then((response) => {
                this.volunteers = response.data;    
                console.log(this.volunteers);
            })
            .catch((error) => {
            console.log(error);
            });
        },
        



        // запрос на получение всех животных
        getAllAnimals(){  
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/api/v1/animals/',
                headers: { },
            };
            axios.request(config)
            .then((response) => {
                this.animals = response.data;    
            })
            .catch((error) => {
                console.log(error);
            });
        },  
    },
    // действия, выполняемые при отрисовки страницы
    mounted(){
        console.log(localStorage.tokenData);
        this.TokenCheck();
        this.HideDialog();
        this.getAllAnimals();
        this.getAllVolunteers();
    }
}



</script>
<style lang="scss" scoped>
section{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6em;
    margin-bottom: 4em;
}
.panel{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2.5em;
    width: 68.75em;
    h1{
        color: var(--black);
        font-family: Rubik, sans-serif;
        font-size: 2em;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
}
.error__text{
        color: var(--black);
        font-family: Rubik, sans-serif;
        font-size: 1.25em;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
}
.menu{
    display: flex;
    align-items: center;
    gap: 3em;
    button{
        color: var(--black);
        font-family: Inter, sans-serif;
        font-size: 1em;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        outline: none; 
        background-color: transparent;
        border: 0;
    } 
    button:hover{
            color: var(--green);
        }
}

</style>