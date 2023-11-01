<template>
    <modal>
        <p>Создание волонтёра</p>
        <form action="">
                <input 
                type="text" 
                class="input" 
                placeholder="Фамилия Имя Отчество"
                maxlength="255"
                v-model="this.userData.FIO">
                <input 
                type="text" 
                class="input" 
                placeholder=""
                maxlength="255"
                v-model="this.userData.FIO">
                
            </form>
    </modal>
</template>
<script>
</script>
<style>
</style>