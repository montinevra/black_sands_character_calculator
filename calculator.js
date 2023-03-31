const snake_case = (string) => {
	return string.replace(/\d+/g, ' ')
		.split(/ |\B(?=[A-Z])/)
		.map((word) => word.toLowerCase())
		.join('_');
}

function save() {
	window.localStorage.setItem("race_list", race_list.value);
	const inputs = document.getElementsByTagName("input")
	for (const input of inputs) {
		window.localStorage.setItem(input.id, input.value);
	}
}

function load() {
	for (const [id, value] of  Object.entries(window.localStorage))	{
		document.getElementById(id).value = value;
	}
	for (const skill of skills) {
		update_skill(snake_case(skill));
	}
	update_race();
}

function update_point_total() {
	const points_array = document.getElementsByClassName('points');  
	let point_total = 0;

	for (const points of points_array) {
		point_total += parseInt(points.value);
	}
	document.getElementById("point_total").value = point_total + parseInt(document.getElementById("background_cost").value);
	save();
}

function update_talent(talent) {
	let rank = parseInt(document.getElementById(`${talent}_ranks`).value);
	let new_total = rank + parseInt(document.getElementById(`${talent}_base`).value) + parseInt(document.getElementById(`${talent}_float`).value);
	let new_points = 0;

	document.getElementById(`${talent}_total`).value = new_total;
	if (rank <= 0) {
		document.getElementById(`${talent}_points`).value = rank * 5;
	} else {
		while (rank > 0) {
			new_points += new_total * rank;
			new_total--;
			rank--;
		}
		document.getElementById(`${talent}_points`).value = new_points;
	}
}

function update_talent_points(talent) {
	update_talent(talent);
	update_point_total();
}

function update_race() {
	for (const [talent, base] of Object.entries(races[race_list.value].talents)) {
		document.getElementById(`${talent}_base`).value = base;
		update_talent(talent);
	}
	update_point_total();
}

function update_skill(skill) {
	const points = document.getElementById(`${skill}_points`);
	const ranks = document.getElementById(`${skill}_ranks`);
	const bonus = document.getElementById(`${skill}_bonus`);

	points.value = parseInt(ranks.value) + parseInt(ranks.value) ** 2 - parseInt(bonus.value);
	if (points.value < 0) {
		points.value = 0;
		points.setAttribute('style', 'color: green');
	} else {
		points.setAttribute('style', '');
	}
	update_point_total();
}

function on_load() {
	const race_list = document.getElementById("race_list");
	const talent_list = document.getElementById("talent_list");
	const skill_list = document.getElementById("skill_list");

	for (const [race] of Object.entries(races)) {
		race_list.innerHTML += `<option value="${race}">${race}</option>`

	}
	for (const talent of talents) {
		talent_list.innerHTML += `<tr>\n
				<th>${talent}</th> \n
				<td><output id="${snake_case(talent)}_total">5</output> = </td>\n
				<td><output id="${snake_case(talent)}_base">5</output> + </td>\n\
				<td><input type="number" min="0" max="2" value="0" id="${snake_case(talent)}_float" oninput="update_talent_points('${snake_case(talent)}')"/> + </td>\n
				<td><input type="number" min="-3" max="5" value="0" id="${snake_case(talent)}_ranks" oninput="update_talent_points('${snake_case(talent)}')"/></td>\n
				<td><output class="points" id="${snake_case(talent)}_points">0</output></td>\n
				</tr>\n`;
	}
	for (const skill of skills) {
		skill_list.innerHTML += `<tr>\n
				<th>${skill}</th>\n
				<td><input type="number" min="0" max="5" value="0" id="${snake_case(skill)}_ranks" oninput="update_skill('${snake_case(skill)}')"/></td>\n
				<td><output class="points" id="${snake_case(skill)}_points">0</output></td>\n
				<td><input type="number" min="0" value="0" id="${snake_case(skill)}_bonus" oninput="update_skill('${snake_case(skill)}')"/></td>\n
				</tr>`
	}
	load();
}

function del_save() {
	localStorage.clear();
}
