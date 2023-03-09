// function update_alloted(a, b){
// 	set_value(a, b);
// 	available_points.value = parseInt(b.value);
// }

// function set_value(a, b) {
// 	a.value = parseInt(b.value);
// }

const snake_case = (string) => {
	return string.replace(/\d+/g, ' ')
		.split(/ |\B(?=[A-Z])/)
		.map((word) => word.toLowerCase())
		.join('_');
}

function update_point_total() {
	var points_array = document.getElementsByClassName('points');  
	var points = 0;

	for (var i = 0; i < points_array.length; ++i) {
		points += parseInt(points_array[i].value);
	}
	document.getElementById("point_total").value = points + parseInt(document.getElementById("background_cost").value);
}

function update_talent_points(total, base, ranks, points) {
	var rank = parseInt(ranks.value);
	var new_total = rank + parseInt(base.value);
	var new_points = 0;

	total.value = new_total;
	if (rank <= 0) {
		points.value = rank * 5;
	} else {
		while (rank > 0) {
			new_points += new_total * rank;
			new_total--;
			rank--;
		}
		points.value = new_points;
	}
	update_point_total();
}

function update_skill_points(ranks, points, bonus) {
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
	for (var i = 0; i < talents.length; ++i) {
		// TODO set base talents via race selection:
		// TODO <td><output id="${snake_case(talents[i])}_base">5</output> + </td>\n\
		document.getElementById("talent_list").innerHTML += `<tr>\n
				<th>${talents[i]}</th> \n
				<td><output id="${snake_case(talents[i])}_total">5</output> = </td>\n
				<td><input type="number" min="4" max="9" value="5" id="${snake_case(talents[i])}_base" oninput="update_talent_points(${snake_case(talents[i])}_total, ${snake_case(talents[i])}_base, ${snake_case(talents[i])}_ranks, ${snake_case(talents[i])}_points)"/> + </td>\n
				<td><input type="number" min="-3" max="5" value="0" id="${snake_case(talents[i])}_ranks" oninput="update_talent_points(${snake_case(talents[i])}_total, ${snake_case(talents[i])}_base, this, ${snake_case(talents[i])}_points)"/></td>\n
				<td><output class="points" id="${snake_case(talents[i])}_points">0</output></td>\n
				</tr>\n`;
	}
	for (var i = 0; i < skills.length; ++i) {
		document.getElementById("skill_list").innerHTML += `<tr>\n
				<th>${skills[i]}</th>\n
				<td><input type="number" min="0" max="5" value="0" id="${snake_case(skills[i])}_ranks" oninput="update_skill_points(${snake_case(skills[i])}_ranks, ${snake_case(skills[i])}_points, ${snake_case(skills[i])}_bonus)"/></td>\n
				<td><output class="points" id="${snake_case(skills[i])}_points">0</output></td>\n
				<td><input type="number" min="0" value="0" id="${snake_case(skills[i])}_bonus" oninput="update_skill_points(${snake_case(skills[i])}_ranks, ${snake_case(skills[i])}_points, ${snake_case(skills[i])}_bonus)"/></td>\n
				</tr>`
	}
	document.getElementById("char_calc").reset()
}
