// function update_alloted(a, b){
// 	set_value(a, b);
// 	available_points.value = parseInt(b.value);
// }

// function set_value(a, b) {
// 	a.value = parseInt(b.value);
// }

function update_point_total() {
	var points_array = document.getElementsByClassName('points');  
	var points = 0;

	for (var i = 0; i < points_array.length; ++i) {
		points += parseInt(points_array[i].value);
	}
	document.getElementById("point_total").value = points;
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
	update_point_total();
}
