<?php 
	file_put_contents("../../res/maps/" . $_POST["fileName"], $_POST["data"]);
	$maplist = file_get_contents("../../res/maps/maplist.json");
	$result = 0;
	$mapListArray = explode(",", $maplist);
	foreach($mapListArray as $item) {
		if(strcmp($item, $_POST["fileName"]) == 0) {
			$result = 1;
		}
	}
	print $_POST["fileName"];
	print $result;
	if($result == 0) {
		file_put_contents("../../res/maps/maplist.json", "," . $_POST["fileName"], FILE_APPEND);
	}
?>