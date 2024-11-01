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
	import IndexRaw from '$lib/components/ui/ipv4address-input/index.ts?raw';

	let value = $state<IPv4Address>([null, null, null, null]);
	let completed = $state(false)
	let valueString: string | undefined = $state()
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
					An implementation of a IPv4Address Input component built on top of Shadcn UI's input-otp
					component.
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
			<ExampleContainer id="try-it-out" class="min-h-[350px]">
				<div class="flex w-full flex-col place-items-center justify-center gap-5">
					<div class="flex flex-col gap-2">
						<Label>IP Address</Label>
						<IPv4AddressInput bind:value bind:valueString bind:completed />
					</div>
					<div>
						<ul>
							<li>
								Valid: {completed}
							</li>
							<li>
								Value: {valueString}
							</li>
						</ul>
					</div>
					<div class="flex w-full max-w-[300px] flex-col justify-start gap-5">
						<Button type="submit" class="w-fit">Submit</Button>
					</div>
				</div>
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
					<h3 class="w-full text-start text-lg font-semibold">Install necessary components</h3>
					<p>
						Run the <code class="rounded-md bg-accent px-1 py-[2px]">shadcn-svelte</code> add command
						to add the necessary components to your project:
					</p>
					<Snippet.Root code={`npx shadcn-svelte@next add pin-input`}>
						<Snippet.CopyButton
							code={[
								{
									name: 'npm',
									code: 'npx shadcn-svelte@next add pin-input'
								},
								{
									name: 'pnpm',
									code: 'pnpm dlx shadcn-svelte@next add pin-input'
								},
								{
									name: 'bun',
									code: 'bunx shadcn-svelte@next add pin-input'
								},
								{
									name: 'yarn',
									code: 'yarn shadcn-svelte@next add pin-input'
								}
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
							<Tabs.Trigger value="index" class="font-serif text-xs">index.ts</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content value="ipv4address-input">
							<Snippet.Root code={IPv4AddressInputRaw} class="h-[400px]" />
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
				<!-- <ExampleContainer class="min-h-[200px]" title="Basic">
					<PhoneInput bind:value placeholder="Enter a phone number" />
				</ExampleContainer> -->
			</div>
		</div>
	</div>
</main>
