<template>
    <section class="page" >
        <main-menu v-if="this.show === true"></main-menu>
        <div class="history" v-if="this.show === true">
            <h2>История</h2>
            <div class="text">
                <p>Приют "Дома" был основан в 2020 году группой энтузиастов, любящих животных, с одной простой целью: спасать и обеспечивать уход для бездомных и нуждающихся животных. 
                    Началось это маленьким уютным домом, который служил приютом для нескольких собак и кошек.</p>
                <p>Сегодня "Добрые лапки" - это большой и современный приют, где находят временное убежище и заботу сотни животных. 
                    Мы предоставляем им медицинскую помощь, реабилитацию и всю необходимую заботу, чтобы они могли найти своих навсегда друзей и новые дома.</p>
            </div>
        </div>
        <div class="gallery" v-if="this.show === true">
            <h2>Фотогалерея</h2>
            <div class="images">
                <img src="@/assets/info_1.jpg" alt="">
                <img src="@/assets/info_2.jpg" alt="">
                <img src="@/assets/info_3.jpg" alt="">
                <img src="@/assets/info_4.jpg" alt="">
                <img src="@/assets/info_5.jpg" alt="">
                <img src="@/assets/info_6.jpg" alt="">
            </div>        
        </div>




        <div class="page" v-if="this.show != true">
            <div class="panel" >
                <h1>Админ панель</h1>
                <div class="menu">                    
                    <button @click="this.$router.push({name: 'animals'})">Животные</button>
                    <button @click="this.$router.push({name: 'about-us'})">Волонтёры</button>
                </div>
                <my-button @click="unAdmin">Выйти</my-button>
            </div> 

            <AnimalOption
                v-model="this.sortByQuery"
                :defaultOption="{name: 'Сортировка', value: null}"
                :options="[
            {name: 'Получить список волонтёров, занимающихся собаками', value: 'view_id=1',},
            {name: 'Получить список волонтёров, занимающиеся кошками', value: 'view_id=2',},
        ]"> 
        </AnimalOption>

            <volunteer-list 
            :volunteers = "this.volunteers"
            @onindicateID="this.deleteVolunteer"
            @onIndicateChangeID="this.changeData"
            ></volunteer-list>

<!-- модальное окно для изменения данных о волонтере -->
            <modal v-model:show="dialogVisible" class="modal">
                <h1 class="header">Изменение данных</h1>
                <div>
                    <p class="name">ФИО</p>
                    <input class="input"
                    type="text"
                    v-model="this.newData.newFIO"
                    >
                    <p v-show="showFormNoValidFIOErrorMessage" class="error__text">от 5 до 128 символов</p>
                </div>
                <div>
                    <p class="name">Каким видом животных занимается</p>
                    <div class="view">
                        <button class="view-button" @click="this.DogView">Собаки</button>
                        <button class="view-button"  @click="this.CatView">Кошки</button>
                        <input class="view-input"
                            type="text"
                            :value="this.newData.view_id"
                        >
                    </div>
                    <p v-show="showFormNoValidViewErrorMessage" class="error__text">Выберите параметр</p>
                </div>
                <my-button @click="this.checkVolunteerData">Применить изменения</my-button>
            </modal>
<!-- кнопка создания новой записи -->
            <my-button @click="OpenNewForm" >Создать нового волонтёра</my-button>
<!-- модальное окно для создания новой записи о волонтере -->
            <modal v-model:show="NewdialogVisible" class="modal">
                <h1 class="header">Создание нового волонтёра</h1>
                <div>
                    <p class="name">ФИО</p>
                    <input class="input"
                    type="text"
                    v-model="this.newVol.newVolFIO"
                    >
                    <p v-show="showFormNoValidFIOErrorMessage" class="error__text">от 5 до 128 символов</p>
                </div>
                <div>
                    <p class="name">Каким видом животных занимается</p>
                    <div class="view">
                        <button class="view-button" @click="NewDogView">Собаки</button>
                        <button class="view-button"  @click="NewCatView">Кошки</button>
                        <input class="view-input"
                            type="text"
                            :value="this.newVol.volView_id"
                            readonly
                        >
                    </div>
                    <p v-show="showFormNoValidViewErrorMessage" class="error__text">Выберите параметр</p>
                </div>
                <my-button @click="this.CreateNewVol">Создать новую запись</my-button>
            </modal>
        </div>              
        <my-footer></my-footer>
    </section>        
</template>
<script>
import axios from "axios";
import VolunteerList from "@/components/UI/VolunteerList";
import qs from 'qs';
import AnimalOption from "@/components/UI/AnimalOption";


export default{
    components:{
    VolunteerList,
    AnimalOption
},

    props: {
        newData:{
            type: Array,
            required: true,
        },
        newVol:{
            type: Array,
            required: true,
        }

    },
    data(){
        return {
            sortByQuery: "",
            volunteers:[],
            volunteerID: null,
            show: true,
            NewdialogVisible: false,
            dialogVisible: false,
            newData:{
                newFIO: "",
                view_id: "",
            },
            newVol:{
                newVolFIO: "",
                volView_id: "",
            },
            showFormNoValidFIOErrorMessage: false,
            showFormNoValidViewErrorMessage: false,
        }
    },


    methods:{

// открытие модального окна на создание новой записи
        OpenNewForm(){
            this.NewdialogVisible = true
        },
// выбор вида животного, которым занимается волонтер
        NewDogView(){
            this.newVol.volView_id = 1
        },
        NewCatView(){
            this.newVol.volView_id = 2
        },

// создане нового волонтера
// проверка введенных значений
        CreateNewVol(){
            this.showFormNoValidFIOErrorMessage = false;
            this.showFormNoValidViewErrorMessage = false;

            if(this.newVol.newVolFIO.length > 128 ||  this.newVol.newVolFIO.length < 4){
                this.showFormNoValidFIOErrorMessage = true;
                return
            };

            if(this.newVol.volView_id < 1){
                this.showFormNoValidViewErrorMessage = true;
                return
            };
// запрос на создание записи
            this.CreateNewVolRequest();
            },
// запрос на сощдание записи
        CreateNewVolRequest(){
            const data = qs.stringify({
            'FIO': this.newVol.newVolFIO,
            'view_id': this.newVol.volView_id  
            });
            console.log(data);
            const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/v1/volunteers',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
            };
            axios.request(config)
            .then((response) => {
            this.newVol.newVolFIO = "",
            this.newVol.volView_id = "",
            this.getAllVolunteers(),
            this.NewdialogVisible = false,
            console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
            console.log(error);
            });
        },

// выбор вида животного, которым занимается волонтер
        DogView(){
            this.newData.view_id = 1;
        },
        CatView(){
            this.newData.view_id = 2;
        },
// открытие формы изменения данных
        changeData(volunteerID){
            this.volunteerID = volunteerID;
            this.dialogVisible = true
        },
// проверка введенных в форму данных
        checkVolunteerData(volunteerID){
            console.log(volunteerID);

            this.showFormNoValidFIOErrorMessage = false;
            this.showFormNoValidViewErrorMessage = false;

            if(this.newData.newFIO.length > 128 || this.newData.newFIO.length < 1){
                this.showFormNoValidFIOErrorMessage = true;
                return
            };

            if(this.newData.view_id.length < 1){
                this.showFormNoValidViewErrorMessage = true;
                return
            };
// функция по обновлению данных о волонтере
            this.changeVolunteerData(volunteerID);
            },
// запрос на обновление данных о волонтере
            changeVolunteerData(volunteerID){
                console.log(volunteerID);

            const data = qs.stringify({
            'FIO': this.newData.newFIO,
            'view_id': this.newData.view_id,
            });
            console.log(data);
            let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/api/v1/volunteers/${this.volunteerID}`,
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
            };
            axios.request(config)
            .then((response) => {
            this.newData.newFIO = "",
            this.newData.view_id = "",
            this.getAllVolunteers(),
            this.dialogVisible = false,
            console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log("ошибка"),
                console.log(error);
            });
        },
        // удаление волонтера
        deleteVolunteer(volunteerID){
            let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/api/v1/volunteers/${volunteerID}`,
            headers: { }
            };

            axios.request(config)
            .then((response) => {
            this.getAllVolunteers();
            console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
            console.log(error);
            });
        },
// запрос на получение всех волонтеров
    getAllVolunteers(searchQuery = null, sortByQuery = null){
        let url = 'http://127.0.0.1:8000/api/v1/volunteers';
        if (searchQuery != null) url += `&search=${searchQuery}`;
        if (sortByQuery != null){
            if(sortByQuery === "view_id=1") url += `?${sortByQuery}`; 
            if(sortByQuery === "view_id=2") url += `?${sortByQuery}`; 
        }

            let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: url,
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
// проверка токена на актуальность
    checkTokenExist(){
        if (localStorage.tokenData != null && localStorage.tokenData != undefined) 
        return this.show = false;
        },
// выход из админ панели при просроченом токене
        unAdmin(){
            localStorage.removeItem('tokenData');
			this.$router.push({name: 'home'});        
        },
    },
watch:{
    sortByQuery(newQuery){
        console.log(newQuery);
        this.getAllVolunteers(null, newQuery);
    },
},
// функции, выполняемые при отрисовке страницы
mounted(){
        this.checkTokenExist();
        this.getAllVolunteers();
},
}
</script>
<style lang="scss" scoped>
.page{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 7.5em;
    widows: 100%;    
}
section{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6em;
}
h2{
    color: var(--green);
    font-family: Rubik, sans-serif;
    font-size: 1.5em;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}
.text {
    display: flex;
    flex-direction: column;
    gap: 2em;

    p{
        color: var(--black);
        font-family: Rubik, sans-serif;
        font-size: 1.25em;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
}
}
.history{
    display: flex;
    justify-content: center;
    gap: 3em;
    flex-direction: column;
    width: 90%;
}

.gallery{
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 3em;
    width: 90%;

    .images{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 1.25em;
    }

    img{
        width: 22.5em;
        border-radius: 1em;
        transition: 1s;
    }
    img:hover {
        transform: scale(1.3); 
}

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
.header{
        font-family: Rubik, sans-serif;
        font-size: 1.5em;
        font-style: normal;
        font-weight: 500;
}
.input{
    width: 20em;
    padding: 1em 2em;
    border: none;
    border: 0.15em solid var(--green);
    border-radius: 1em;
    outline: none;
    
}
.view-input{
    width: 2em;
    padding: 1em 1em;
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
.view{
    display: flex;
    align-items: center;
    justify-content: center;
}

.view-button{
        color: var(--white);
        padding: 0.75em 1.75em;
        background-color: var(--green);
        border-radius: 0.75em;
        border: none;
        font-family: Inter, sans-serif;
        font-size: 1em;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        transition: 1s;
        margin: 0.5em;
    }


</style>