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

	const paste = (e: ClipboardEvent) => {
		const data = e.clipboardData?.getData('text');

		if (!data) return;

		const parsed = safeParseIPv4Address(data);

		// TODO: Add validation here

		if (!parsed) return;

		if (parsed[0] != null) {
			value[0] = parseInt(parsed[0])
		}

		if (parsed[1] != null) {
			value[1] = parseInt(parsed[1])
		}

		if (parsed[2] != null) {
			value[2] = parseInt(parsed[2])
		}

		if (parsed[3] != null) {
			value[3] = parseInt(parsed[3])
		}
	};
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
		onpaste={paste}
	/>
	<span class="font-serif">{separator}</span>
	<Input
		bind:ref={secondInput}
		goNext={() => thirdInput?.focus()}
		goPrevious={() => firstInput?.focus()}
		bind:value={value[1]}
		placeholder={parsedPlaceholder ? parsedPlaceholder[1] : undefined}
		onpaste={paste}
	/>
	<span class="font-serif">{separator}</span>
	<Input
		bind:ref={thirdInput}
		goNext={() => fourthInput?.focus()}
		goPrevious={() => secondInput?.focus()}
		bind:value={value[2]}
		placeholder={parsedPlaceholder ? parsedPlaceholder[2] : undefined}
		onpaste={paste}
	/>
	<span class="font-serif">{separator}</span>
	<Input
		bind:ref={fourthInput}
		goPrevious={() => thirdInput?.focus()}
		bind:value={value[3]}
		placeholder={parsedPlaceholder ? parsedPlaceholder[3] : undefined}
		onpaste={paste}
	/>
</div>
