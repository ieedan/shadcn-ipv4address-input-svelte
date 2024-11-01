<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props {
		class?: string | undefined | null;
		title?: string | undefined;
		children?: Snippet;
	}

	let {
		class: className = null,
		title = undefined,
		children,
		...rest
	}: Props & HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class="flex w-full flex-col gap-3">
	{#if title}
		<h3 class="w-full text-start text-lg font-semibold">{title}</h3>
	{/if}
	<div
		class={cn(
			'flex w-full flex-col place-items-center justify-center gap-5 rounded-lg border border-border',
			className
		)}
		{...rest}
	>
		{@render children?.()}
	</div>
</div>
