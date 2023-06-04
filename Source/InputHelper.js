
class InputHelper
{
	initialize()
	{
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
	}

	// events

	handleEventKeyDown(event)
	{
		var keyPressed = event.key;

		var grid = Globals.Instance.grid;

		if (keyPressed == "ArrowDown")
		{
			grid.cursorMove(new Coords(0, 1));
		}
		else if (keyPressed == "ArrowLeft")
		{
			grid.cursorMove(new Coords(-1, 0));
		}
		else if (keyPressed == "ArrowRight")
		{
			grid.cursorMove(new Coords(1, 0));
		}
		else if (keyPressed == "ArrowUp")
		{
			grid.cursorMove(new Coords(0, -1));
		}
		else if (keyPressed == "Enter")
		{
			grid.cellUnderCursorToggleSelect();
		}

		grid.drawToDisplay(Globals.Instance.display);

	}
}
