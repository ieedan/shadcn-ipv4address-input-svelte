<script lang="ts">
	import { isNumber } from '.';

	type Props = {
		value?: number | null;
		goNext?: () => void;
		goPrevious?: () => void;
		ref?: HTMLInputElement
	};

	let { value = $bindable(null), goPrevious, goNext, ref = $bindable() }: Props = $props();

	const onInput = (e: KeyboardEvent) => {
		// just continue as normal
		if (e.key == 'Tab' || e.key == 'Delete') return;

		// for backspace we goPrevious if the value is empty
		if (e.key == 'Backspace') {
			if (value == null || value.toString().length == 0) {
				// after update
				setTimeout(() => goPrevious?.());
			}
			return;
		}

		// we want to go forward for `.` or ` `
		if (['.', ' '].includes(e.key) && !e.ctrlKey && !e.metaKey) {
			e.preventDefault();
			goNext?.();
			return;
		}

		// disallow any non numbers
		if (!isNumber(e.key)) {
			e.preventDefault();
			return;
		}

		const newValue = (e.target as HTMLInputElement).value + e.key;

		// first check valid

		if (newValue.length > 3) {
			e.preventDefault();
			goNext?.();
			return;
		}

		const integerValue = parseInt(newValue);

		// we will try to advance if its greater
		if (integerValue > 255) {
			e.preventDefault();
			setTimeout(() => goNext?.());
			return;
		}

		// this should be impossible but in any case
		if (integerValue < 0) {
			e.preventDefault();
			return;
		}

		// check should advance
		if (newValue.length == 3) {
			// after update
			setTimeout(() => goNext?.());
			return;
		}
	};
</script>

<input
	bind:this={ref}
	min={0}
	max={255}
	maxlength={3}
	bind:value
	onkeydown={onInput}
	type="number"
	class="hide-ramp h-full w-9 border-0 bg-transparent text-center outline-none focus:outline-none"
/>

<style lang="postcss">
	.hide-ramp::-webkit-inner-spin-button,
	.hide-ramp::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
