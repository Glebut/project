<template>
    <section class="menu">
        <a href="" @click="this.$router.push({name: 'home'})"><img src="@/assets/white-logo.svg" alt="" class="menu__logo"></a>
        <div class="navigation">
            <a class="navigation__link" @click="this.$router.push({name: 'animals'})">Животные</a>
            <a class="navigation__link" @click="this.$router.push({name: 'adoption'})">Процесс усыновления</a>
            <a class="navigation__link" @click="this.$router.push({name: 'about-us'})">О нас</a>
        </div>
        <div class="social-icons">
            <a href=""><img class="social-icons__link" src="@/assets/vk.svg" alt=""></a>
            <a href=""><img class="social-icons__link" src="@/assets/telegram.svg" alt=""></a>
            <a href=""><img class="social-icons__link" src="@/assets/instagram.svg" alt=""></a>
        </div>
        
    </section>
</template>
<script>2
export default{
    name:'my-menu',
    data(){
        return {
            dialogVisible: false,
            animalId: null,
            information:[],
        }
    },
    methods:{
        showDialog(){
            this.dialogVisible = true;
        },
    },
}
</script>
<style lang="scss" scoped>
button{
    color: var(--white);
        padding: 0.5em 1em;
        background-color: var(--green);
        border-radius: 0.9375em;
        border: none;
        transition: 1s;

        :hover{
        transform: scale(1.05); 
    }
}
.menu{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 70.5em;
    margin-top: 2em;
}
.menu__logo{
    width: 15.125em;
}

.navigation{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3.75em;
}
.navigation__link{
    font-family: Rubik, sans-serif;
    color: var(--white);
    font-size: 1.25em;
    cursor: pointer;
    
}

.material-symbols-outlined{
    color: var(--white);
    cursor: pointer;

}
.social-icons{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.625em;
}
.social-icons__link{
    width: 1.875em;
    width: 1.875em;

}

</style>