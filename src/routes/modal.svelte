<script lang="ts">
	export let showModal: boolean = true;
	export let win: boolean;
	export let word: string;
</script>

<div class:hidden={!showModal} class="z-20">
	<div class="w-[100vw] h-[100vh] opacity-50 absolute bg-base-black z-20"></div>
	<div
		class="absolute w-[20rem] h-[12rem] my-auto top-0 bottom-0 mx-auto left-0 right-0 bg-board-grey rounded-3xl flex justify-center items-center flex-col gap-4 z-30"
	>
		{#if win}
			<h1 class="text-4xl">🎉</h1>
		{:else}
			<h1 class="text-4xl">🤡</h1>
		{/if}
		<p class="uppercase font-bold">{word}</p>
		<button
			class="w-32 h-10 rounded-3xl bg-white text-base-black uppercase font-bold"
			on:click={() => {
				window.location.reload();
			}}>Play Again</button
		>
	</div>
</div>
