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

function update_float_max() {
	const float_array = document.getElementsByClassName('float');  
	let float_total = 0;

	for (const float of float_array) {
		float_total += parseInt(float.value);
	}
	for (const float of float_array) {
		float.setAttribute("max", races[race_list.value].float - float_total + parseInt(float.value));
	}
}

function update_floating_points(talent) {
	const float_array = document.getElementsByClassName('float');  

	update_float_max();
	update_talent_points(talent);
}

function update_race() {
	const float_max = races[race_list.value].float;
	let float_total = 0;

	if (float_max == 0) {
		float_col.style.visibility = "collapse";
	} else {
		float_col.style.visibility = "visible";
	}
	for (const [talent, base] of Object.entries(races[race_list.value].talents)) {
		const float_input = document.getElementById(`${talent}_float`);
		document.getElementById(`${talent}_base`).value = base;
		float_total += parseInt(float_input.value);
		if (float_total > float_max) {
			float_input.value -= float_total - float_max;
			float_total -= float_total - float_max;
		}
		update_talent(talent);
	}
	update_float_max();
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
	const race_options = document.getElementById("race_options");
	const variant_options = document.getElementById("variant_options");
	const talent_list = document.getElementById("talent_list");
	const skill_list = document.getElementById("skill_list");

	for (const [race] of Object.entries(races)) {
		race_options.innerHTML += `<option value="${race}">${race}</option>`;
	}
	for (const [variant] of Object.entries(variants)) {
		variant_options.innerHTML += `<option value="${variant}">${variant}</option>`;
	}
	races = Object.assign(variants, races);
	console.log(races)
	for (const talent of talents) {
		talent_list.innerHTML += `<tr>\n
				<th>${talent}</th> \n
				<td><output id="${snake_case(talent)}_total">5</output> = </td>\n
				<td><output id="${snake_case(talent)}_base">5</output> + </td>\n\
				<td><input class="float" type="number" min="0" max="2" value="0" id="${snake_case(talent)}_float" oninput="update_floating_points('${snake_case(talent)}')"/> + </td>\n
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
				</tr>\n`;
	}
	load();
}

function del_save() {
	window.localStorage.clear();
}
