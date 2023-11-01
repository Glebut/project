<template>
    <section class="page">
    <main-menu v-if="this.show === true"></main-menu>    
        <div class="panel" v-if="this.show != true">
            <h1>Админ панель</h1>
            <div class="menu">                    
                <button @click="this.$router.push({name: 'animals'})">Животные</button>
                <my-button @click="OpenNewAnimal">Создать запись</my-button>

                <button @click="this.$router.push({name: 'about-us'})">Волонтёры</button>
            </div>
            <my-button @click="unAdmin">Выйти</my-button>
        </div>
        <div class="block">        
        <AnimalOption
        v-model="this.sortByQuery"
        :defaultOption="{name: 'Сортировка', value: null}"
        :options="[
// 7 
            {name: 'Отсортировать по возрастанию возраста', value: 'new'},
// 1
            {name: 'Получить список животных отсортированных по виду (собаки)', value: 'view_id=1',},
            {name: 'Получить список животных отсортированных по виду  (кошки)', value: 'view_id=2',},
// 5
            {name: 'Получить список животных, которым требуется лечение', value: 'health_id=2',},
// 4
            {name: 'Получить список животных, у которых превышено время пребывания', value: 'status_id=3',},
// 6
            {name: 'Получить список животных, которые уже были усыновлены', value: 'status_id=2',},
// 3
            {name: 'Получить список животных, доступных для усыновления', value: 'status_id=1',},
// 9
            {name: 'Получить список животных, находящиеся на карантине', value: 'health_id=3',},
        ]"
        > 
        </AnimalOption>

    </div>
        <animal-list  :animals="animals" ></animal-list>
        <modal v-model:show="showUnknownErrorModal"><p class="error__text">Неизвестная ошибка</p></modal>
        <modal v-model:show="showServerErrorModal"><p class="error__text">Ошибка сервера</p></modal>

        <!-- модальное окно для создания новой записи о животном -->
        <modal v-model:show="NewdialogVisible" class="modal">
                <h1 class="header">Создание нового животного</h1>
                <div class="param">
                    <input class="input"
                    type="text"
                    v-model="this.newAnimal.name"
                    placeholder="Имя животного"
                    >
                    <p v-show="showFormNoValidNameErrorMessage" class="error__text">от 3 до 16 символов</p>
                </div>
                    <div class="block">
                        <div class="param">
                            <input class="input-text"
                            type="text"
                            v-model="this.newAnimal.description"
                            placeholder="Описание"
                            >
                            <p v-show="showFormNoValidDescriptionErrorMessage" class="error__text">от 11 символов</p>
                        </div>

                        <div class="param">
                            <input class="input-text"
                            type="text"
                            v-model="this.newAnimal.traits"
                            placeholder="Особенности"
                            >
                            <p v-show="showFormNoValidTraitsErrorMessage" class="error__text">от 11 символов</p>
                        </div>
                    </div>
                <div class="block">
                    <div class="block">
                        <div class="param">
                            <p class="name">Вид</p>
                            <div class="view">
                                <button class="view-button"  @click="NewDogView">Собака</button>
                                <button class="view-button"  @click="NewCatView">Кошка</button>
                                <input class="view-input"
                                    type="text"
                                    :value="this.newAnimal.view_id"
                                    readonly
                                >
                            </div>
                            <p v-show="showFormNoValidViewErrorMessage" class="error__text">Выберите параметр</p>
                        </div>
                        <div class="param">
                            <p class="name">Пол</p>
                            <div class="view">
                                <button class="view-button" @click="NewBoySex">Мальчик</button>
                                <button class="view-button"  @click="NewGirlSex">Девочка</button>
                                <input class="view-input"
                                    type="text"
                                    :value="this.newAnimal.sex_id"
                                    readonly
                                >
                            </div>
                            <p v-show="showFormNoValidSexErrorMessage" class="error__text">Выберите параметр</p>
                        </div>
                    </div>
                    <div class="param">
                    <p class="name">Статус животного</p>
                    <div class="view">
                        <button class="view-button" @click="NewAvailable">Доступен</button>
                        <button class="view-button"  @click="NewUnAvailable">Усыновлён</button>
                        <button class="view-button"  @click="NewTimeExpired">На передержке</button>
                        <input class="view-input"
                            type="text"
                            :value="this.newAnimal.status_id"
                            readonly
                        >
                    </div>
                    <p v-show="showFormNoValidStatusErrorMessage" class="error__text">Выберите параметр</p>
                </div>
                <div class="param">
                    <p class="name">Состояние здоровья</p>
                    <div class="view">
                        <button class="view-button"  @click="NewHealth">Здоров</button>
                        <button class="view-button"  @click="NewUnHealth">Требует лечение</button>
                        <button class="view-button"  @click="NewQuarantine">На карантине</button>
                        <input class="view-input"
                            type="text"
                            :value="this.newAnimal.health_id"
                            readonly
                        >
                    </div>
                    <p v-show="showFormNoValidHealthErrorMessage" class="error__text">Выберите параметр</p>
                </div>
                </div>
                <div class="block">
                    <div class="param">
                    <div class="view">
                        <p class="name">Картинка животного</p>
                        <input
                        type="file"
                        @change="onFileSelected">
                    </div>                    
                    <p v-show="showFormNoValidBirthdayErrorMessage" class="error__text">Выберите параметр</p>
                </div>
                <div class="param">
                    <div class="padd">
                        <p class="name">Дата рождения</p>
                        <input
                        type="date"
                        v-model="this.newAnimal.birthday"
                        >
                    </div>                     
                    <p v-show="showFormNoValidImgErrorMessage" class="error__text">Выберите параметр</p>
                </div>
                </div>
                
                <button class="create-button" @click="this.CreateNewAnimal">Создать новую запись</button>
            </modal>


    <my-footer></my-footer>
    </section>
</template>

<script>
import axios from "axios";
import AnimalList from "@/components/UI/AnimalList";
import AnimalOption from "@/components/UI/AnimalOption"
import MySelect from "@/components/UI/MySelect";



export default{
    components:{
    AnimalList,
    MySelect,
    AnimalOption
},
    props: {
        newData:{
            type: Array,
            required: true,
        },
        newAnimal:{
            type: Array,
            required: true,
        },

    },
    data(){
        return {
            sortByQuery: "",
            animals:[],
            show: true,
            color: false,
            showUnknownErrorModal: false,
            showServerErrorModal: false,
            NewdialogVisible: false,
            newAnimal:{
                name: "",
                view_id: "",
                sex_id: "",
                description: "",
                traits: "",
                status_id: "",
                health_id: "",
                img: "",
                birthday: "",
            },
            files: [],

            showFormNoValidNameErrorMessage: false,
            showFormNoValidBirthdayErrorMessage: false,
            showFormNoValidDescriptionErrorMessage: false,
            showFormNoValidTraitsErrorMessage: false,
            showFormNoValidViewErrorMessage: false,
            showFormNoValidStatusErrorMessage: false,
            showFormNoValidHealthErrorMessage: false,
            showFormNoValidSexErrorMessage: false,
            showFormNoValidImageErrorMessage: false,
        }
    },


    
methods:{
    onFileSelected(event) {
        this.files = event.target.files;
        this.newAnimal.img = this.files[0];
        console.log(this.newAnimal.img);
    },

    OpenNewAnimal(){
        this.NewdialogVisible = true
    },

    // выбор вида животного
    NewDogView(){
        this.color = true
        this.newAnimal.view_id = 1
    },
    NewCatView(){
        this.newAnimal.view_id = 2
    },
    // выбор пола животного
    NewBoySex(){
        this.newAnimal.sex_id = 1
    },
    NewGirlSex(){
        this.newAnimal.sex_id = 2
    },
    // выбор статуса животного
    NewBoySex(){
        this.newAnimal.sex_id = 1
    },
    NewGirlSex(){
        this.newAnimal.sex_id = 2
    },
    NewAvailable(){
        this.newAnimal.status_id = 1
    },
    NewUnAvailable(){
        this.newAnimal.status_id = 2
    },
    NewTimeExpired(){
        this.newAnimal.status_id = 3
    },
    NewHealth(){
        this.color = true
        this.newAnimal.health_id = 1
    },
    NewUnHealth(){
        this.newAnimal.health_id = 2
    },
    NewQuarantine(){
        this.newAnimal.health_id = 3
    },


    CreateNewAnimal(){
            this.showFormNoValidNameErrorMessage = false,
            this.showFormNoValidBirthdayErrorMessage = false,
            this.showFormNoValidDescriptionErrorMessage = false,
            this.showFormNoValidTraitsErrorMessage = false,
            this.showFormNoValidViewErrorMessage = false,
            this.showFormNoValidStatusErrorMessage = false,
            this.showFormNoValidHealthErrorMessage = false,
            this.showFormNoValidSexErrorMessage = false,
            this.showFormNoValidImageErrorMessage = false;

        if(this.newAnimal.name.length > 16 ||  this.newAnimal.name.length < 2){
                this.showFormNoValidNameErrorMessage = true;
                return
            };
            if(this.newAnimal.description.length < 8){
                this.showFormNoValidDescriptionErrorMessage = true;
                return
            };
            if(this.newAnimal.traits.length < 8){
                this.showFormNoValidTraitsErrorMessage = true;
                return
            };
            if(this.newAnimal.view_id < 1){
                this.showFormNoValidViewErrorMessage = true;
                return
            };
            if(this.newAnimal.sex_id < 1){
                this.showFormNoValidSexErrorMessage= true;
                return
            };
            if(this.newAnimal.status_id < 1){
                this.showFormNoValidStatusErrorMessage = true;
                return
            };
            if(this.newAnimal.health_id < 1){
                this.showFormNoValidHealthErrorMessage= true;
                return
            };
            if(this.newAnimal.img < 1){
                this.showFormNoValidImageErrorMessage= true;
                return
            };
            if(this.newAnimal.birthday < 1){
                this.showFormNoValidBirthdayErrorMessage = true;
                return
            };
            this.CreateNewAnimalRequest();
    },


    CreateNewAnimalRequest(){
            const FormData = require('form-data');
            let data = new FormData();
            data.append('name', this.newAnimal.name);
            data.append('birthday', this.newAnimal.birthday);
            data.append('description', this.newAnimal.description);
            data.append('traits', this.newAnimal.traits);
            data.append('img', this.newAnimal.img, this.newAnimal.img.name);
            data.append('status_id', this.newAnimal.status_id);
            data.append('view_id', this.newAnimal.view_id);
            data.append('health_id', this.newAnimal.health_id);
            data.append('sex_id', this.newAnimal.sex_id);

            console.log(FormData);
            const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/v1/animals',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
            };
            axios.request(config)
            .then((response) => {
                this.getAllAnimals();                
                this.NewdialogVisible = false,
                this.newAnimal.name = "",
                this.newAnimal.birthday = "",
                this.newAnimal.description = "",
                this.newAnimal.img = "",
                this.newAnimal.traits = "",
                this.newAnimal.view_id = "",
                this.newAnimal.health_id = "",
                this.newAnimal.sex_id = "",
            console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
            console.log(error);
            });
        },







    checkResponseError(error){
        if(error == 500){
            this.showServerErrorModal = true;
            return;
        }
        if(error == 403 && error == 401){
            localStorage.removeItem("tokenData");
            this.dialogVisible = true;
            return;
        }
        this.showUnknownErrorModal = true
        }, 
        
    unAdmin(){
            localStorage.removeItem('tokenData');
			this.$router.push({name: 'home'});        
        },
    checkTokenExist(){
        if (localStorage.tokenData != null && localStorage.tokenData != undefined) 
        return this.show = false;
    },



    getAllAnimals(searchQuery = null, sortByQuery = null){  
        let url = 'http://127.0.0.1:8000/api/v1/animals';
        if (searchQuery != null) url += `&search=${searchQuery}`;
        if (sortByQuery != null){      
                //   сортировка по возрастанию 
            if(sortByQuery === "new") url += `?sortBy=${sortByQuery}`; 
               // сортировка по виду 
            if(sortByQuery === "view_id=1") url += `?${sortByQuery}`; 
            if(sortByQuery === "view_id=2") url += `?${sortByQuery}`; 
// сортировка по здоровью
            if(sortByQuery === "health_id=2") url += `?${sortByQuery}`;             
            if(sortByQuery === "health_id=3") url += `?${sortByQuery}`; 
// сортировка по статусу
            if(sortByQuery === "status_id=3") url += `?${sortByQuery}`; 
            if(sortByQuery === "status_id=2") url += `?${sortByQuery}`; 
            if(sortByQuery === "status_id=1") url += `?${sortByQuery}`; 

        }
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: url,
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
watch:{
    sortByQuery(newQuery){
        console.log(newQuery);
        this.getAllAnimals(null, newQuery);
    },
},
    mounted(){
        this.getAllAnimals();
        this.checkTokenExist();
        console.log(localStorage.tokenData);
    },

}
</script>

<style lang="scss" scoped>
section{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8em;
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
.block{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row; 
    gap: 2em; 
}
.param{
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;  
    gap: 0.5em;
}


.modal{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 1em;
    padding-right: 1em;
    h1{
        font-size: 1.5em;
    }
    p{
        font-family: Inter, sans-serif;
        font-size: 0.75em;
        font-style: normal;
        font-weight: 500;
    }
}
.header{
        font-family: Rubik, sans-serif;
        font-size: 1.25em;
        font-style: normal;
        font-weight: 500;
}
.padd{
    display: flex;
    flex-direction: column;
    gap: 0.25em;
}
.input{
    width: 15em;
    padding: 1em 0.75em;
    border: none;
    border: 0.15em solid var(--green);
    border-radius: 0.5em;
    outline: none; 
}
.input-text{
    width: 20em;
    height: 2em;
    padding: 1em 0.75em;
    border: none;
    border: 0.15em solid var(--green);
    border-radius: 0.75em;
    outline: none; 
}
.view-input{
    width: 1.5em;
    padding: 0.75em 0.75em;
    border: none;
    border: 0.15em solid var(--green);
    border-radius: 0.5em;
    outline: none;
}
.error__text{
    margin-top: 0.25em;
    font-family: Inter, sans-serif;
    font-size: 0.25em;
    font-weight: 400;
    font-style: normal;
    color: red;
}
.view{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.25em;
}

.view-button{
        color: var(--white);
        padding: 0.75em 1.5em;
        background-color: var(--green);
        border-radius: 0.75em;
        border: none;
        font-family: Inter, sans-serif;
        font-size: 0.75em;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        transition: 1s;
        margin: 0.5em;
    }
    .create-button{
        color: var(--white);
        padding: 1em 2em;
        background-color: var(--green);
        border-radius: 0.75em;
        border: none;
        font-family: Inter, sans-serif;
        font-size: 0.75em;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        transition: 1s;
        margin: 0.5em;
    }
    .active{
        background-color: var(--light-green);

    }
    .create-button:hover{
        background-color: var(--light-green);
        transform: scale(1.05); 
    }
</style>