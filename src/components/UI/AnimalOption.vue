<template>
	<select
	class="option-general"
	:value="modelValue" 
	@change="changeOption">
		<option selected disabled value="">{{ defaultOption.name }}</option>
		<option v-for="option in options" :key="option.value" :value="option.value">{{ option.name }}</option>
	</select>
</template>

<script>
	export default {
		name: 'AnimalOption',
		props:{
			modelValue: {
				type: String,
				required: true
			},
			defaultOption: {
				type: Object,
				required: true,
			},
			options: {
				type: Array,
				required: true,
				default: () => [],
			}
		},
		methods:{
			changeOption(event){
				this.$emit('update:modelValue', event.target.value);
			}
		}
	}
</script>

<style lang="scss" scoped>
.option-general{
		display: flex;
		align-items: center;
		width: 65%;
		height: 3em;
		padding: 0 1.5em;
		padding-left: 1.5em;
		background-color: transparent;
		border-radius: 0.5em;
		border: 0.15em solid var(--green);
		cursor: pointer;
		font-family: Inter, sans-serif;
		font-size: 1em;
		color: var(--black);
}
</style>