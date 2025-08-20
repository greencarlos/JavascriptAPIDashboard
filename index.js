async function getDogImage() {
	const img = document.createElement("img");
	const output = document.querySelector("#dog-output");
	output.innerHTML = "";

	await fetch("https://dog.ceo/api/breeds/image/random")
		.then((res) => res.json())
		.then((res) => {
			img.src = res.message;
		});
	output.appendChild(img);
}

async function getCatImage() {
	const img = document.createElement("img");
	const output = document.querySelector("#cat-output");
	output.innerHTML = "";
	await fetch("https://cataas.com/cat").then((res) => {
		img.src = res.url;
	});
	output.appendChild(img);
}
