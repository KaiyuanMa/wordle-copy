<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();
	const firstLine = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
	const secondLine = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
	const thirdLine = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

	function handleLetterClick(letter: string) {
		dispatch('input', letter);
	}

	onMount(() => {
		document.addEventListener('keydown', (e) => {
			const key = e.key.toLowerCase();
			if (firstLine.includes(key) || secondLine.includes(key) || thirdLine.includes(key)) {
				handleLetterClick(key);
			} else if (key === 'enter') {
				dispatch('enter');
			} else if (key === 'backspace') {
				dispatch('delete');
			}
		});
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="flex flex-col items-center gap-[0.32rem]">
	<div class="flex gap-[0.32rem]">
		{#each firstLine as letter}
			<button
				id="keyboard-{letter}"
				class="keys | text-lg font-bold uppercase w-10 h-14 rounded-[0.2rem] bg-btn-grey"
				on:click={() => handleLetterClick(letter)}
			>
				{letter}
			</button>
		{/each}
	</div>
	<div class="flex gap-[0.32rem]">
		{#each secondLine as letter}
			<button
				id="keyboard-{letter}"
				class="text-lg font-bold uppercase w-10 h-14 rounded-[0.2rem] bg-btn-grey"
				on:click={() => handleLetterClick(letter)}
			>
				{letter}
			</button>
		{/each}
	</div>
	<div class="flex gap-[0.32rem]">
		<button
			class="text-xs font-bold uppercase w-16 h-14 rounded-[0.2rem] bg-btn-grey"
			on:click={() => dispatch('enter')}
		>
			enter
		</button>
		{#each thirdLine as letter}
			<button
				id="keyboard-{letter}"
				class="text-lg font-bold uppercase w-10 h-14 rounded-[0.2rem] bg-btn-grey"
				on:click={() => handleLetterClick(letter)}
			>
				{letter}
			</button>
		{/each}
		<button
			class="text-xs font-bold uppercase w-16 h-14 rounded-[0.2rem] bg-btn-grey"
			on:click={() => dispatch('delete')}
		>
			delete
		</button>
	</div>
</div>
