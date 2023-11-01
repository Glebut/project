<template>
    <section class="page">
    <main-menu v-if="this.show === true"></main-menu>
    <div class="panel" v-if="this.show != true">
        <h1>Админ панель</h1>
        <div class="menu">                    
            <button @click="this.$router.push({name: 'animals'})">Животные</button>
            <button @click="this.$router.push({name: 'about-us'})">Волонтёры</button>
        </div>
        <my-button @click="unAdmin">Выйти</my-button>
    </div> 
    <div class="card" v-for="info in information">
        <return-button class="MyButton"><span class="material-symbols-outlined">undo</span></return-button>
        <img :src="info.img" alt="" class="img">
        <div class="information">
            <div class="main-information">
                <h1>{{ info.name }}</h1>
                <div class="characteristic">
                    <span v-if="info.sex_id === 1">мальчик</span>
                    <span v-else>девочка</span>
                    <span>{{ getYear(info.birthday) }} г {{ getMonth(info.birthday) }} месяцев</span>
                </div>
            </div>
            <p class="text">{{ info.description }}</p>
            <p class="text">{{ info.traits }}</p>
            <div class="buttons"  v-if="this.show != true">
                <my-button @click="showDialog">Изменить</my-button>
                <my-button @click="deleteAnimal">Удалить</my-button>
            </div>
            <modal v-model:show="dialogVisible" class="modal">
                <h1 class="header">Изменение данных</h1>
                <div>
                    <p class="name">Имя</p>
                    <input class="input"
                    type="text"
                    v-model="this.newData.newname"
                    >
                    <p v-show="showFormNoValidNameErrorMessage" class="error__text">от 3 до 32 символов</p>
                </div>
                <div>
                    <p class="name">Описание</p>
                    <input class="input"
                    type="text"
                    v-model="this.newData.newdescription"
                    >
                    <p v-show="showFormNoValidDescriptionErrorMessage" class="error__text">от 11 символов</p>
                </div>
                <div>
                    <p class="name">Особенности</p>
                    <input class="input"
                    type="text"
                    v-model="this.newData.newtraits"
                    >
                    <p v-show="showFormNoValidTraitsErrorMessage" class="error__text">от 8 символов</p>
                </div>
                <my-button @click="this.checkData">Применить изменения</my-button>
            </modal>
            <my-button @click="showDialog" v-if="this.show === true">Позвонить</my-button>
        </div>
    </div>

    
    <my-footer></my-footer>
    </section>
</template>
<script>
import axios from "axios";
import qs from 'qs';

export default{ 
    
    props: {
        information: {
            type: Array,
            required: true,
        },
        info:{
            type: Object,
            required: true,
        },
        newData:{
            type: Array,
            required: true,
        }

    },
    data(){
        return {
            dialogVisible: false,
            animalId: null,
            information:[],
            show: true,
            newData:{
                newname: "",
                newdescription: "",
                newtraits: "",
            },
            showFormNoValidNameErrorMessage: false,
            showFormNoValidDescriptionErrorMessage: false,
            showFormNoValidTraitsErrorMessage: false,
        }
    },
    methods:{


        checkData(animalId){

            this.showFormNoValidNameErrorMessage = false;
            this.showFormNoValidDescriptionErrorMessage = false;
            this.showFormNoValidTraitsErrorMessage = false;


            if(this.newData.newname.length > 64 || this.newData.newname.length < 2){
                this.showFormNoValidNameErrorMessage = true;
            };

            if(this.newData.newdescription.length > 255 || this.newData.newdescription.length < 11){
                this.showFormNoValidDescriptionErrorMessage = true;
            };
            if(this.newData.newtraits.length > 255 || this.newData.newtraits.length < 8){
                this.showFormNoValidTraitsErrorMessage = true;
                return
            };
            this.changeUserData(animalId)
        },
        
        changeUserData(animalId){
        
            const data = qs.stringify({
            'name': this.newData.newname,
            'description': this.newData.newdescription,
            'traits': this.newData.newtraits,
            });
            let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/api/v1/animals/${this.animalId}`,
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
            };
            axios.request(config)
            .then((response) => {
            this.getAnimal(animalId);
            this.newData.newname = "",
            this.newData.newdescription = "",
            this.newData.newtraits = "",
            this.dialogVisible = false,
            console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
            console.log(error);
            });
        },





        unAdmin(){
            localStorage.removeItem('tokenData');
			this.$router.push({name: 'home'});        
        },
        showDialog(){
            this.dialogVisible = true;
        },

        checkTokenExist(){
        if (localStorage.tokenData != null && localStorage.tokenData != undefined) 
        return this.show = false;
        },

        deleteAnimal(animalId){
            let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/api/v1/animals/${this.animalId}`,
            headers: { }
            };

            axios.request(config)
            .then((response) => {
            this.$router.push({name: 'animals'});
            })
            .catch((error) => {
            console.log(error);
            });

        },
        getAnimal(animalId){
        const axios = require('axios');
        const qs = require('qs');
        let data = qs.stringify({
        });
        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://127.0.0.1:8000/api/v1/animals/${this.animalId}`,
        headers: { },
        data : data
        };
        axios.request(config)
        .then((response) => {
            this.information = response.data;            
            return console.log(this.information);
        })
        .catch((error) => {
        console.log(error);
        });
        },
        getYear(birthdate) {
            return Math.floor((new Date().getTime() - new Date(birthdate).getTime()) / 3.154e+10)
        },
        getMonth(dateString) {
            let year = parseInt(dateString.substring(0,4));
            let month = parseInt(dateString.substring(6,7));
            let day = parseInt(dateString.substring(9,10));

            let today = new Date();
            let birthDate = new Date(year, month - 1, day); 
            let m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                m= 12 + m;
            }
            return m;
        },


        ChangeAnimalData(){

        }



    },     

    mounted() {               
        this.animalId = this.$route.params.id,
        this.getAnimal(this.animalId);
        this.checkTokenExist();
    }





}
</script>
<style lang="scss" scoped>

section{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8em;
}
.buttons{
    display: flex;
    gap: 3em;
}
.card{
    display: flex;
    width: 75em;
    justify-content: center;
    gap: 3.75em;
    

}
.material-symbols-outlined{
    display: flex;
    align-items: center;
    justify-content: space-between;
}

h1{
    color: var(--black);
    font-family: Rubik;
    font-size: 2.75em;
    font-style: normal;
    font-weight: 500;
    line-height: 100%; 
}
.information{
    display: flex;
    width: 40.625em;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3.75em;

    .text{
        color: #000;
        font-family: Inter, sans-serif;
        font-size: 1.25em;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
    }
}
.main-information{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.25em;
}

.text{
    width: 100%;
}

.characteristic{
    display: flex;
    flex-direction: column;
    gap: 0.625em;


    span{
    color: var(--green);
    font-family: Rubik, sans-serif;
    font-size: 1.25em;
    font-style: normal;
    font-weight: 500;
    line-height: 100%; 
    }
}
my-button{
    width: 100%;
}

.img{
border-radius: 1em;
transition: 1s;
width: 21.25em;
height: 33.125em;
}
    img:hover{
    transform: scale(1.2); 
}
my-button{
    width: 100%;
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
.modal{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25em;
    padding-left: 1em;
    padding-right: 1em;
    h1{
        font-size: 1.5em;
    }
    p{
        font-family: Inter, sans-serif;
        font-size: 1em;
        font-style: normal;
        font-weight: 500;
    }
}
.input{
    width: 20em;
    padding: 1em 2em;
    border: none;
    border: 0.15em solid var(--green);
    border-radius: 1em;
    outline: none;
    
}
.error__text{
    margin-top: 0.25em;
    font-family: Inter, sans-serif;
    font-size: 0.5em;
    font-weight: 400;
    font-style: normal;
    color: red;
}


</style>