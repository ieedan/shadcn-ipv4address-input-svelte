<script lang="ts">
	import { cn } from '$lib/utils';
	import { safeParseIPv4Address } from '.';
	import Input from './ipv4address-input-input.svelte';

	type Props = {
		separator?: string;
		/** An IP Address placeholder `0.0.0.0` or `0_0_0_0` or `0 0 0 0` */
		placeholder?: string;
		value?: [number | null, number | null, number | null, number | null];
		class?: string;
	};

	let {
		separator = '.',
		value = $bindable([null, null, null, null]),
		placeholder,
		class: className
	}: Props = $props();

	let parsedPlaceholder = safeParseIPv4Address(placeholder);

	let firstInput = $state<HTMLInputElement>();
	let secondInput = $state<HTMLInputElement>();
	let thirdInput = $state<HTMLInputElement>();
	let fourthInput = $state<HTMLInputElement>();
</script>

<div
	class={cn(
		'flex h-10 place-items-center rounded-md border border-border px-3 font-serif',
		className
	)}
>
	<Input
		bind:ref={firstInput}
		goNext={() => secondInput?.focus()}
		bind:value={value[0]}
		placeholder={parsedPlaceholder ? parsedPlaceholder[0] : undefined}
	/>
	<span class="font-serif">{separator}</span>
	<Input
		bind:ref={secondInput}
		goNext={() => thirdInput?.focus()}
		goPrevious={() => firstInput?.focus()}
		bind:value={value[1]}
		placeholder={parsedPlaceholder ? parsedPlaceholder[1] : undefined}
	/>
	<span class="font-serif">{separator}</span>
	<Input
		bind:ref={thirdInput}
		goNext={() => fourthInput?.focus()}
		goPrevious={() => secondInput?.focus()}
		bind:value={value[2]}
		placeholder={parsedPlaceholder ? parsedPlaceholder[2] : undefined}
	/>
	<span class="font-serif">{separator}</span>
	<Input
		bind:ref={fourthInput}
		goPrevious={() => thirdInput?.focus()}
		bind:value={value[3]}
		placeholder={parsedPlaceholder ? parsedPlaceholder[3] : undefined}
	/>
</div>
