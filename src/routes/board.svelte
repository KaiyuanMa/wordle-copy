<script lang="ts">
	export let round: number;
	export let board: string[][];
	export let word: string;

	$: if (round > 0) {
		checkCurrentWord();
	}

	function checkCurrentWord() {
		const currRow = document.getElementById(`row-${round - 1}`);
		if (!currRow) return;
		for (let i = 0, j = currRow.children.length - 1; i < currRow.children.length; i++, j--) {
			setTimeout(() => {
				const element = currRow.children[i];
				const currLetter = element.innerHTML;
				if (currLetter === word[i]) {
					element.classList.add('correct');
					changeKeyboardColor(i, j, currLetter, 'correct');
				} else if (word.includes(currLetter)) {
					element.classList.add('include');
					changeKeyboardColor(i, j, currLetter, 'include');
				} else {
					element.classList.add('false');
					changeKeyboardColor(i, j, currLetter, 'false');
				}
				setTimeout(() => {}, i * 250 + j * 520);
			}, i * 250);
		}
	}

	function changeKeyboardColor(i: number, j: number, letter: string, status: string) {
		setTimeout(
			() => {
				const keyboard = document.getElementById(`keyboard-${letter}`);
				if (!keyboard) return;
				if (status === 'correct') {
					keyboard.style.backgroundColor = '#538d4e';
				} else if (status === 'include' && keyboard.style.backgroundColor !== 'rgb(83, 141, 78)') {
					keyboard.style.backgroundColor = '#b59f3b';
				} else if (status === 'false' && keyboard.style.backgroundColor !== 'rgb(83, 141, 78)') {
					keyboard.style.backgroundColor = '#3a3a3c';
				}
			},
			i * 250 + j * 500
		);
	}
</script>

<div class="flex flex-col gap-[0.3rem]">
	{#each board as pass_try, i (i)}
		<div class="flex gap-[0.3rem]" id={`row-${i}`}>
			{#each pass_try as letter, j (j)}
				<div
					class="w-[3.75rem] h-[3.75rem] flex justify-center items-center text-3xl uppercase font-bold border-board-grey border-2"
				>
					{letter}
				</div>
			{/each}
		</div>
	{/each}
</div>
