<template>
    <a @click="this.$router.push({name: 'animal', params:{id:animal.id}})"> 
    <div class="animal-card"> 
        <img :src="animal.img" alt="" class="img">
        <div class="info"> 
            <div class="text">
                <p class="name">{{ animal.name }}</p>
            <p class="age">{{ getYear(animal.birthday) }} г {{ getMonth(animal.birthday)}} м</p>
            </div>
            <img src="@/assets/boy_heart.svg" class="icon" v-if="animal.sex_id === 1">
            <img src="@/assets/girl_heart.svg" v-else class="icon">
        </div>
    </div>
</a>

    
</template>
<script>


export default{
    name: 'animal-item',
    props: {
        animal: {
            type: Object,
            required: true,
        },
    },
    methods:{
    

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
    }
}
</script>
<style lang="scss" scoped>
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
            background-color: var(--light-green);
            object-fit:cover;        
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