<template>
    <section class="page">
        <main-menu></main-menu>
        <div class="step">
            <img src="@/assets/tracks.svg" alt="#">
            <div class="info">
                <span class="info__header">Заполнение анкеты</span>
                <p class="info__text">Наш приют тчательно отбирает будущих хозяев, поэтому предлагает заполнить анкету усыноыления. 
                    В анкете попросят указать информацию о вашем жилище, семье и опыте владения животными.</p>
            </div>
        </div>
        <div class="step">
            <img src="@/assets/tracks.svg" alt="#">
            <div class="info">
                <span class="info__header">Выбор животного</span>
                <p class="info__text">Чтобы выбрать животное можно воспользоваться сайтом или лично приехать в приют, чтобы увидеть и познакомиться с ними. 
                    У вас будет возможность поговорить с работниуами приюта и задать вопросы о животных.</p>
                    <my-button @click="this.$router.push({name: 'animals'})">Животные</my-button>
            </div>
        </div>
        <h1>Помните, что животное - это ответственность и доверие. Заботьтесь о нем с любовью и заботой</h1>
        <div class="step">
            <img src="@/assets/tracks.svg" alt="#">
            <div class="info">
                <span class="info__header">Встреча с животным</span>
                <p class="info__text"> Если ваша анкета будет одобрена, вам предоставят возможность встретиться с животным, которое вас заинтересовало. 
                    Вы сможете провести время с ним, узнать больше о его характере.</p>
            </div>
        </div>
        <div class="step">
            <img src="@/assets/tracks.svg" alt="#">
            <div class="info">
                <span class="info__header">Договор</span>
                <p class="info__text">После встречи с животным и решением усыновить его, необходимо будет подписать договор об усыновлении.</p>
            </div>
        </div>
        <h1>Пусть ваш новый спутник приносит вам радость, ласку и множество незабываемых моментов</h1>
        <my-footer></my-footer>
</section>
</template>
<script>
</script>
<style lang="scss" scoped>

section{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6em;
}
h1{
    color: #000;
    text-align: center;
    font-family: Rubik, sans-serif;
    font-size: 2em;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; 
    width: 80%;
}

.step{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10em;  

    img{
        width: 6.25em;
        height: 13em;
    }
    .info{
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 31.25em;
        gap: 1.5em;
    }

    .info__header{
        color: var(--black);
        font-family: Rubik, sans-serif;
        font-size: 1.5em;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; 
    }
    .info__text{
        color: var(--black);
        font-family: Inter, sans-serif;
        font-size: 1em;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; 
    }
}
</style>