<template>
    <section class="page">

        <div class="block-1">
            <my-menu></my-menu>
                <div class="header">
                    <h1>Найди <br> нового друга <br>Дома</h1>
                    <my-button  @click="this.$router.push({name: 'animals'})">Найти друга</my-button>
                </div>
        </div>
        <div class="block-3">
            <text-animation>Работники приюта обеспечивают полноценный уход за животными, которые потеряли свой дом и ищут новую семью</text-animation>
            <div class="info-cards">
                <div class="card">
                    <h2>345</h2>
                    <span class="card__text">Собак и кошек нашли себе новый дом</span>
                </div>
                <div class="card">
                    <h2>57</h2>
                    <span class="card__text">Волонтеров помогают каждый день</span>
                </div>
                <div class="card">
                    <h2>2.5</h2>
                    <span class="card__text">Года существует приют</span>
                </div>
            </div>
        </div>

        <div class="block-4">
            <h1>3 простых шага к волонтерству</h1>
            <div class="steps">
                <div class="green-block"><p class="step">Придти в приют и подарить <span class="step__accent">внимание,</span> которого так не хватает <span class="step__accent">животным</span></p></div>
                <div class="green-block"><p class="step">Самая обычная <span class="step__accent">прогулка</span> – это уже большая <span class="step__accent">помощь</span> в адаптацию и социализацию</p></div>
                <div class="green-block"> <p class="step">Делиться, <span class="step__accent">рассказывать</span> друзьям и коллегам <span class="step__accent">о приюте</span></p></div>
            </div>
        </div>
        <my-footer></my-footer>
    </section>
</template>
<script>
import AnimalList from "@/components/UI/AnimalList";
import axios from 'axios';
export default {
    components:{
        AnimalList
    },
    data(){
        return {
            animals:[],
        }
    },
    methods:{
        
    },
    
    }







</script>

<style lang="scss" scoped>

h1{
    color: var(--white);
    font-family: Rubik, sans-serif;
    font-size: 4em;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
h2{
    font-family: Rubik, sans-serif;
    font-size: 4em;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; 
    color: var(--green);
}

.name{
    color: var(--green);
}
.page{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 7.5em;
    widows: 100%;    
}
.block-1{
    width: 100%;
    height: 50em;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10em;
    background-image: url('@/assets/fon.jpg');
    background-repeat: no-repeat;
    background-position:center center;
    background-size:cover;
}
.header{
    display: flex;
    flex-direction: column;
    gap: 2.5em;
    width: 25.625em;
    margin-left: -41.25em;
}


.block-3{
    display: flex;
    flex-direction: column;
    justify-content: center;
    display: flex;
    width: 90%;
    align-items: center;
    gap: 7.5em ;
}



.info-cards{
    display: flex;
    gap: 3.75em;
    justify-content: center;
    align-items: center;
}
.card{
    display: flex;
    flex-direction: column;
    width: 13.75em;
}
.card__text{
    color: var(--black);
    font-family: Rubik, sans-serif;
    font-size: 1.25em;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
}


.block-4{
    display: flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4em;

    .steps{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 3em;
    }

    h1{
        color: var(--black);
    }
    .green-block{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 23em;
        height: 15em;
        background-color: var(--green);
        border-radius: 1.5em;
    }

    .step{
        color: var(--white);
        font-family: Inter, sans-serif;
        font-size: 1.25em;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; 
        width: 15em;

        &__accent{
            font-weight: 700;
        }
    }
}




.animal-list{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 2.5em;
    flex-wrap: wrap;
    width: 90%;
}
.animal-card{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 15.625em;
        gap: 1.25em;

        .img{
            width: 15.625em;
            height: 21.875em;
            border-radius: 1em;
            background-color: aqua;
        }

        .name{
            color: var(--black);
            font-family: Rubik, sans-serif;
            font-size: 1.5em;
            font-style: normal;
            font-weight: 500;
            line-height: 100%;      
        }
        .age{
            color: var(--black);
            font-family: Rubik, sans-serif;
            font-size: 1.15em;
            font-style: normal;
            font-weight: 400;
            line-height: 100%; /* 20px */
        }
        .info{
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
        .text{
            display: flex;
            justify-content: center;
            flex-direction: column;
            gap:0.625em;
        }
        .icon{
            width: 3em;
            height: 3em;
        }
    }






</style>