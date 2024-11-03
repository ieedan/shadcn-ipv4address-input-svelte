<script lang="ts" module>
	import { z } from 'zod';

	export const formSchema = z.object({
		ipAddress: z.string().min(7).max(15)
	});
	export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { IPv4AddressInput, type IPv4Address } from '$lib/components/ui/ipv4address-input';
	import { Separator } from '$lib/components/ui/separator';
	import ExampleContainer from './example-container.svelte';
	import { Label } from '$lib/components/ui/label';
	import Link from '$lib/components/ui/link';
	import * as Snippet from '$lib/components/ui/snippet';
	import * as Tabs from '$lib/components/ui/tabs';
	import IPv4AddressInputRaw from '$lib/components/ui/ipv4address-input/ipv4address-input.svelte?raw';
	import IPv4AddressInputInputRaw from '$lib/components/ui/ipv4address-input/ipv4address-input-input.svelte?raw';
	import IndexRaw from '$lib/components/ui/ipv4address-input/index.ts?raw';
	import { superForm } from 'sveltekit-superforms/client';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import SuperDebug from 'sveltekit-superforms';
	import { browser } from '$app/environment';

	let { data } = $props();

	let value = $state<IPv4Address>([null, null, null, null]);
	let formValue = $state<IPv4Address>([null, null, null, null]);

	const {
		form: formData,
		message,
		enhance
	} = superForm(data.form, {
		validators: zodClient(formSchema)
	});

	$effect(() => {
		$formData.ipAddress = `${formValue[0]}.${formValue[1]}.${formValue[2]}.${formValue[3]}`;
	});

	message.subscribe((message) => {
		if (message) {
			toast.success(message.text, {
				description: 'Your ip address has been submitted.'
			});
		}
	});
</script>

<svelte:head>
	<title>Shadcn IPv4Address Input</title>
</svelte:head>

<main class="flex w-full place-items-center px-6 py-20">
	<div class="flex w-full flex-grow flex-col place-items-center justify-center gap-10">
		<div class="flex w-full max-w-4xl flex-col place-items-center justify-center gap-10">
			<section class="flex max-w-[450px] flex-col place-items-center justify-center gap-5">
				<h1 class="text-center text-4xl font-bold">Shadcn IPv4Address Input Svelte</h1>
				<p class="text-center text-muted-foreground">
					An implementation of a IPv4Address Input component built with all the wonderful keyboard
					behaviors you would expect.
				</p>
				<div class="flex place-items-center gap-2">
					<Button href="#try-it-out">Try it out</Button>
					<Button
						variant="secondary"
						href={'https://github.com/ieedan/shadcn-ipv4address-input-svelte'}
					>
						GitHub
					</Button>
				</div>
			</section>
			<ExampleContainer id="try-it-out" class="min-h-[400px]">
				<form
					method="POST"
					use:enhance
					class="flex w-full flex-col place-items-center justify-center gap-5"
				>
					<div class="flex flex-col gap-2">
						<Label>IP Address</Label>
						<IPv4AddressInput bind:value={formValue} />
						<input type="text" bind:value={$formData.ipAddress} name="ipAddress" class="hidden" />
					</div>
					<div class="flex w-full max-w-[350px] flex-col justify-start gap-5">
						{#if browser}
							<SuperDebug data={$formData} />
						{/if}
						<Button type="submit" class="w-fit">Submit</Button>
					</div>
				</form>
			</ExampleContainer>
			<div class="flex w-full flex-col gap-5">
				<div>
					<h2 class="w-full py-2 text-start text-2xl font-semibold">Setup</h2>
					<Separator />
				</div>
				<div class="flex flex-col gap-2">
					<h3 class="w-full text-start text-lg font-semibold">Install shadcn-svelte via CLI</h3>
					<p>
						Run the <code class="rounded-md bg-accent px-1 py-[2px]">shadcn-svelte</code> init command
						to setup your project:
					</p>
					<Snippet.Root code={'npx shadcn-svelte@latest init'}>
						<Snippet.CopyButton
							code={[
								{ name: 'npm', code: 'npx shadcn-svelte@latest init' },
								{ name: 'pnpm', code: 'pnpm dlx shadcn-svelte@latest init' },
								{ name: 'bun', code: 'bunx shadcn-svelte@latest init' },
								{ name: 'yarn', code: 'yarn dlx shadcn-svelte@latest init' }
							]}
						/>
					</Snippet.Root>
				</div>
				<div class="flex flex-col gap-2">
					<h3 class="w-full text-start text-lg font-semibold">Copy the code</h3>
					<p>
						You can find the code <Link
							href="https://github.com/ieedan/shadcn-ipv4address-input-svelte/tree/main/src/lib/components/ui/ipv4address-input"
							>here</Link
						>. Or copy it below.
					</p>
					<code>`src/lib/components/ui/ipv4address-input`</code>
					<Tabs.Root value="ipv4address-input">
						<Tabs.List>
							<Tabs.Trigger value="ipv4address-input" class="font-serif text-xs">
								ipv4address-input.svelte
							</Tabs.Trigger>
							<Tabs.Trigger value="ipv4address-input-input" class="font-serif text-xs">
								ipv4address-input-input.svelte
							</Tabs.Trigger>
							<Tabs.Trigger value="index" class="font-serif text-xs">index.ts</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content value="ipv4address-input">
							<Snippet.Root code={IPv4AddressInputRaw} class="h-[400px]" />
						</Tabs.Content>
						<Tabs.Content value="ipv4address-input-input">
							<Snippet.Root code={IPv4AddressInputInputRaw} class="h-[400px]" />
						</Tabs.Content>
						<Tabs.Content value="index">
							<Snippet.Root code={IndexRaw} class="h-[400px]" />
						</Tabs.Content>
					</Tabs.Root>
				</div>
			</div>
			<div class="flex w-full flex-col gap-5">
				<div>
					<h2 class="w-full py-2 text-start text-2xl font-semibold">Examples</h2>
					<Separator />
				</div>
				<ExampleContainer class="min-h-[200px]" title="Basic">
					<IPv4AddressInput bind:value />
				</ExampleContainer>
				<p>
					All the keyboard actions you'd expect just work. Try using <code class="font-serif"
						>Tab</code
					>,
					<code class="font-serif">ArrowRight</code>, <code>ArrowLeft</code>. It even supports
					<code>Space</code>, and <code>`.`</code>.
				</p>
				<ExampleContainer class="min-h-[200px]" title="Placeholder">
					<IPv4AddressInput bind:value placeholder="0_0_0_0" />
				</ExampleContainer>
				<ExampleContainer class="min-h-[200px]" title="Custom Separator">
					<IPv4AddressInput bind:value placeholder="0_0_0_0" separator="" />
				</ExampleContainer>
			</div>
		</div>
	</div>
</main>
