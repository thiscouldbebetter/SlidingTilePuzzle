
class Globals
{
	static Instance = new Globals();

	initialize(display, grid)
	{
		this.display = display;
		this.grid = grid;

		this.display.initialize();
		this.grid.drawToDisplay(this.display);

		this.inputHelper = new InputHelper();
		this.inputHelper.initialize();
	}
}