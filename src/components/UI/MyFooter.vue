<template>
    <footer>
        <div class="block">
            <div class="navigation">
                <span>Дома</span>
                <div class="links">
                    <a @click="this.$router.push({name: 'animals'})">Животные</a>
                    <a @click="this.$router.push({name: 'adoption'})">Процесс усыновления</a>
                    <a @click="this.$router.push({name: 'about-us'})">О нас</a>
                </div>
            </div>
            <div class="navigation">
                <span>Соц. сети</span>
                <div class="links">
                    <a href="">VK</a>
                    <a href="">Telegram</a>
                    <a href="">Instagram</a>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
    export default{
        name:'my-footer'
    }
</script>
<style lang="scss" scoped>
footer{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: linear-gradient(121deg, #197E66 60.3%, #6A3E26 60.3%);
    height: 10em;


    .block{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        width: 60%;
    }
    span{
        color: var(--white);
        font-family: Inter, sans-serif;
        font-size: 1.5em;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    };
    a{
        color: var(--white);
        font-family: Inter, sans-serif;
        font-size: 0.75em;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        cursor: pointer;
        text-decoration: none;
    }

    .navigation{
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 0.5em;
    }

    .links{
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 0.25em;
    }

}
</style>