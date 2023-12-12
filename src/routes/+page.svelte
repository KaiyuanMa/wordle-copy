<script lang="ts">
	import '$lib/index.css';
	import Keyboard from './keyboard.svelte';
	import Board from './board.svelte';
	import Modal from './modal.svelte';
	import { bank } from './wordBank';
	import { common } from './common';
	import { fade } from 'svelte/transition';

	let word = getRandomItem();
	$: round = 0;
	let index = 0;

	export let showModal = false;
	export let win = true;
	let board = [
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', ''],
		['', '', '', '', '']
	];
	let showWarning = false;

	function handleInput(e: { detail: any }) {
		if (index < 5) {
			board[round][index] = e.detail;
			index++;
		}
	}

	function handleDelete() {
		if (index > 0) {
			index--;
			board[round][index] = '';
		}
	}

	function handelEnter() {
		if (index == 5) {
			let letter = board[round].join('');
			if (!bank.has(letter)) {
				toggleWarning();
				return;
			}
			if (letter == word) {
				round = round + 1;
				setTimeout(() => {
					showModal = true;
					win = true;
				}, 2000);
			} else if (round >= 5) {
				setTimeout(() => {
					showModal = true;
					win = false;
				}, 2000);
				round = round + 1;
			} else {
				round = round + 1;
				index = 0;
			}
		}
	}

	function getRandomItem() {
		let items = Array.from(common);
		return items[Math.floor(Math.random() * items.length)].toLowerCase();
	}

	function toggleWarning() {
		showWarning = !showWarning;
		setTimeout(() => {
			showWarning = !showWarning;
		}, 2000);
	}
</script>

{#if showWarning}
	<div
		transition:fade={{ duration: 200 }}
		class="absolute p-2 rounded-lg top-10 w-fit mx-auto right-0 left-0 text-sm font-bold bg-board-grey text-white"
		class:hidden={!showWarning}
	>
		Word does not exist in list
	</div>
{/if}

<Modal {showModal} {win} {word} />
<div class="flex flex-col justify-center items-center w-[100vw] h-[100vh] gap-7">
	<Board bind:round bind:board bind:word />
	<Keyboard on:input={handleInput} on:delete={handleDelete} on:enter={handelEnter} />
</div>
