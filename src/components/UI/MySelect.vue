<template> 
<select v-bind="modelValue" @change="changeOption">
    <option  value="">Все животные</option>
    <option 
    v-for="option in options" 
    :key="option.value" 
    :value="option.value"
    >
    {{ option.name }}
</option>
</select>
</template>
<script>
export default{
    name:'my-select',
    props:{
        modelValue:{
            type: String,
        },
        options:{
            type: Array,
            default: () => []
        }
    },
    methods:{
        changeOption(event){
            this.$emit('update:modelValue', event)
        }
    }


}
</script>
<style>
</style>