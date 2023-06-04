
function main()
{
	var display = new Display
	(
		new Coords(100, 100), // sizeInPixels
		10, // fontHeightInPixels
		"White", // colorBack
		"Gray" // colorFore
	);

	var grid = new Grid
	(
		new Coords(4, 4)
	).randomize();

	Globals.Instance.initialize
	(
		display, grid
	);
}