<script lang="ts">
	import { isNumber } from '.';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		value?: number | null;
		goNext?: () => void;
		goPrevious?: () => void;
		ref?: HTMLInputElement;
	};

	let {
		value = $bindable(null),
		goPrevious,
		goNext,
		ref = $bindable(),
		...rest
	}: Props & HTMLAttributes<HTMLInputElement> = $props();

	const onKeydown = (e: KeyboardEvent) => {
		if (e.ctrlKey || e.metaKey) return;

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

		const target = e.target as HTMLInputElement;

		if (e.key == 'ArrowRight') {
			// only go to next box if at end
			if (target.selectionStart == target.value.length) {
				e.preventDefault();
				goNext?.();
			}
			return;
		}

		if (e.key == 'ArrowLeft') {
			// only go to previous box if at start
			if (target.selectionStart == 0) {
				e.preventDefault();
				goPrevious?.();
			}
			return;
		}

		// disallow any non numbers
		// By default this prevents any undefined behavior
		// so make sure anything that can happen is defined.
		if (!isNumber(e.key)) {
			e.preventDefault();
			return;
		}

		const newValue = (e.target as HTMLInputElement).value + e.key;

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
	};

	const onInput = () => {
		// check should advance
		// we do this here because firefox/safari and chrome behave differently with the `setTimeout` function.
		// this ensures the value still enters if valid and we navigate after
		if (value && value.toString().length == 3) {
			goNext?.();
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
	oninput={onInput}
	onkeydown={onKeydown}
	type="text"
	class="hide-ramp h-full w-9 border-0 bg-transparent text-center outline-none placeholder:text-muted-foreground focus:outline-none"
	{...rest}
/>

<style lang="postcss">
	.hide-ramp::-webkit-inner-spin-button,
	.hide-ramp::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
