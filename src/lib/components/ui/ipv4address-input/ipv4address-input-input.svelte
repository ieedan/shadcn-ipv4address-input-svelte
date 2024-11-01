<script lang="ts">
	type Props = {
		value?: number;
	};

	let { value = $bindable(0) }: Props = $props();

	const onInput = (e: Event) => {
		const target = e.target as HTMLInputElement;

		const valStr = target.value.replaceAll(/[^\d]/g, '');

		if (valStr.length == 0) {
			target.value = '';
			return;
		}

		value = parseInt(valStr);

		if (value > 255) {
			value = 255;
		} else if (value < 0) {
			value = 0;
		}
	};
</script>

<input
	min={0}
	max={255}
	maxlength={3}
	bind:value
	oninput={onInput}
	type="number"
	class="hide-ramp h-full w-10 border-0 bg-transparent outline-none focus:outline-none text-center"
/>

<style lang="postcss">
	.hide-ramp::-webkit-inner-spin-button,
	.hide-ramp::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
