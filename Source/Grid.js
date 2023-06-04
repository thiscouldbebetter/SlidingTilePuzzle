
class Grid
{
	constructor(sizeInCells)
	{
		this.sizeInCells = sizeInCells;

		this.cells = [];

		this.cursorPos = new Coords(0, 0);
	}

	cellAtPosGet(cellPos)
	{
		var cellIndex = this.indexOfCellAtPos(cellPos);
		var cellValue = this.cells[cellIndex];
		return cellValue;
	}

	cellAtPosSet(cellPos, valueToSet)
	{
		var cellIndex = this.indexOfCellAtPos(cellPos);
		this.cells[cellIndex] = valueToSet;
	}

	cursorMove(direction)
	{
		this.cursorPos.add
		(
			direction
		).trimToRangeMax
		(
			this.sizeInCells
		);
	}

	indexOfCellAtPos(cellPos)
	{
		return cellPos.y * this.sizeInCells.x + cellPos.x;
	}

	openCellPos()
	{
		var cellPos = new Coords();

		for (var y = 0; y < this.sizeInCells.y; y++)
		{
			cellPos.y = y;
			 
			var cellValue = null;
			 
			for (var x = 0; x < this.sizeInCells.x; x++)
			{
				cellPos.x = x;
				 
				cellValue = this.cellAtPosGet(cellPos);
				 
				if (cellValue == null)
				{
					break;
				}
			}
			 
			if (cellValue == null)
			{
				break;
			}
		}
		 
		return cellPos;
	}

	randomize()
	{
		var numberOfCells = this.sizeInCells.x * this.sizeInCells.y;

		for (var i = 0; i < numberOfCells; i++)
		{
			this.cells[i] = null;
		}

		for (var i = 0; i < numberOfCells - 1; i++)
		{
			var cellIndex = Math.floor
			(
				Math.random() * numberOfCells
			);

			while (this.cells[cellIndex] != null)
			{
				cellIndex++;
				if (cellIndex >= numberOfCells)
				{
					cellIndex = 0;
				}
			}

			this.cells[cellIndex] = i;

		}

		return this;
	}

	slideAtCursorIfPossible()
	{
		var openCellPos = this.openCellPos();
		var displacement = openCellPos.clone().subtract
		(
			this.cursorPos
		);
		var distance = displacement.magnitude();
		if (distance == 1)
		{
			var cellValueToSlide = this.cellAtPosGet(this.cursorPos);
			this.cellAtPosSet(this.cursorPos, null);
			this.cellAtPosSet(openCellPos, cellValueToSlide);
		}
	}
	 
	// drawable
	 
	drawToDisplay(display)
	{
		var cellSizeInPixels =
		display.sizeInPixels.clone().divide
		(
			this.sizeInCells
		);

		var cellSizeInPixelsHalf =
		cellSizeInPixels.clone().divideScalar(2);

		var cellPos = new Coords();
		var drawPos = new Coords();
		var cellInde;
		var cellValue;

		for (var y = 0; y < this.sizeInCells.y; y++)
		{
			cellPos.y = y;

			for (var x = 0; x < this.sizeInCells.x; x++)
			{
				cellPos.x = x;

				cellValue = this.cellAtPosGet(cellPos);
				if (cellValue == null)
				{
					cellValue = "";
				}

				drawPos.overwriteWith
				(
					cellPos
				).multiply
				(
					cellSizeInPixels
				);
				 
				display.drawRectangle
				(
					drawPos,
					cellSizeInPixels,
					display.colorBack, // fill
					display.colorFore // border
				);
				 
				drawPos.add
				(
					cellSizeInPixelsHalf
				);
				 
				display.drawText
				(
					"" + cellValue,
					drawPos,
					display.colorFore
				);
			}
		}

		drawPos.overwriteWith
		(
			this.cursorPos
		).multiply
		(
			cellSizeInPixels
		);

		display.drawRectangle
		(
			drawPos,
			cellSizeInPixels,
			display.colorFore, // fill
			display.colorBack // border
		);

		drawPos.add
		(
			cellSizeInPixelsHalf
		);

		cellValue = this.cellAtPosGet(this.cursorPos);
		if (cellValue == null)
		{
			cellValue = "";
		}

		display.drawText
		(
			"" + cellValue,
			drawPos,
			display.colorBack
		);
	}
}
