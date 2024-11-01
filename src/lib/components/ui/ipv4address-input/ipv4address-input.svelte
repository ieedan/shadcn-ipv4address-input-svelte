<script lang="ts">
	import Input from './ipv4address-input-input.svelte';

	type Props = {
		separator?: string;
		value?: [number | null, number | null, number | null, number | null];
		valueString?: string;
		completed?: boolean;
	};

	let {
		separator = '.',
		value = $bindable([0, 0, 0, 0]),
		valueString = $bindable(),
		completed = $bindable(false)
	}: Props = $props();

	$effect(() => {
		valueString = `${value[0] ?? 0}.${value[1] ?? 0}.${value[2] ?? 0}.${value[3] ?? 0}`;
	});

	$effect(() => {
		completed = !value.includes(null);
	});

	let firstInput = $state<HTMLInputElement>();
	let secondInput = $state<HTMLInputElement>();
	let thirdInput = $state<HTMLInputElement>();
	let fourthInput = $state<HTMLInputElement>();
</script>

<div class="flex h-10 place-items-center rounded-md border border-border px-3 font-serif">
	<Input bind:ref={firstInput} goNext={() => secondInput?.focus()} bind:value={value[0]} />
	<span class="font-serif">{separator}</span>
	<Input
		bind:ref={secondInput}
		goNext={() => thirdInput?.focus()}
		goPrevious={() => firstInput?.focus()}
		bind:value={value[1]}
	/>
	<span class="font-serif">{separator}</span>
	<Input
		bind:ref={thirdInput}
		goNext={() => fourthInput?.focus()}
		goPrevious={() => secondInput?.focus()}
		bind:value={value[2]}
	/>
	<span class="font-serif">{separator}</span>
	<Input bind:ref={fourthInput} goPrevious={() => thirdInput?.focus()} bind:value={value[3]} />
</div>
