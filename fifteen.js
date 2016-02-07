/* Scott Kinder, Section AG, Manvir Singh, 5/24/14
	This is the page that defines the javascript for the fifteen puzzle page
	It allows for animations to game to be played, and used on the said page. For more
	information on how it works, see the comments below
*/

"use strict";

//This contains all of the script for the page.
(function() {
	window.addEventListener("load", loadfunction);
	var emptySpot = [300, 300]; //initial empty space

	//Contains all of the clickable buttons for shuffle and the
	//puzzle buttons.
	function loadfunction() {
		document.getElementById("shufflebutton").onclick = shuffle;
		drawBoxes();
		var pieces = document.querySelectorAll(".box");
		for (var x = 0; x < pieces.length; x++) {
			pieces[x].addEventListener("click", movePieces);
			pieces[x].addEventListener("mouseover", highlight);
			pieces[x].addEventListener("mouseout", dehighlight);
		}
	}

	//Sets the game board to a new game position, which is completely random. The game
	//is always meant to be able to win eventually.
	//Disclaimer: I am not sure that mine is always winnable.
	function shuffle() {
		for (var i = 0; i < 1000; i++) {
			var neighbors = document.querySelectorAll(".box");
			for (var x = 0; x < neighbors.length; x++) {
				var random = parseInt(Math.random() * neighbors.length - 1);
				if (neighbors[random] !== null) {
					var top = parseInt(window.getComputedStyle(neighbors[random]).top);
					var left = parseInt(window.getComputedStyle(neighbors[random]).left);
					if (nextTo(top, left)) {
						var temp = [top, left];
						neighbors[random].style.top = "" + emptySpot[0] + "px";
						neighbors[random].style.left = "" + emptySpot[1] + "px";
						emptySpot = temp;
					}
				}
			}
		}
	}

	//Draws the initial board. It is initially in the end game position. The end
	//game position is all the numbers in order, row to row.
	function drawBoxes() {
		var x = 0;
		var y = 0;
		var times = 0;
		//draws fifteen boxes, 1-16.
		for (var i = 0; i < 15; i++) {
			if (i % 4 == 0) {
				x = 0;
				y = (100 * times);
				times++;
			}

			var box = document.createElement("div");
			box.innerHTML = "" + (i + 1);
			box.className = "box";
			box.id = "box_" + x / 100 + "_" + y / 100;
			box.style.backgroundPosition = "" + -x + "px " + -y + "px";
			box.style.top = "" + y + "px";
			box.style.left = "" + x + "px";
			document.getElementById("puzzlearea").appendChild(box);
			x = x + 100;
		}
	}

	//Moves the given game square to the empty space. This makes the new empty
	//space then the original squares position
	function movePieces(click) {
		var top = parseInt(window.getComputedStyle(this).top);
		var left = parseInt(window.getComputedStyle(this).left);
		if (nextTo(top, left)) {
			var temp = [top, left];
			this.style.top = "" + emptySpot[0] + "px";
			this.style.left = "" + emptySpot[1] + "px";
			emptySpot = temp;
		}
	}

	//Defines the board squares that are to be highlighted.
	function highlight(mouseover) {
		var top = parseInt(window.getComputedStyle(this).top);
		var left = parseInt(window.getComputedStyle(this).left);
		if (nextTo(top, left)) {
			this.className = "neighbor";
		}
	}

	//Defines the board squares that are no longer to be highlighted.
	function dehighlight(mouseout) {
		this.className = "box";
	}

	//param. top -- the height position of sqaure.
	//param. left -- the 
	//Determines if the given position is next to the current empty square.
	function nextTo(top, left) {
		return top == emptySpot[0] && (left == emptySpot[1] - 100 || left == emptySpot[1] + 100) ||
				left == emptySpot[1] && (top == emptySpot[0] + 100 || top == emptySpot[0] - 100);
	}


})();