
class Grid
{
	constructor(sizeInCells)
	{
		this.sizeInCells = sizeInCells;

		this.cells = [];

		this.cursorPos = new Coords(0, 0);
		this.isCellUnderCursorSelected = false;
	}

	cellAtPosInCellsGetSourcePosInCells(cellPosInCells)
	{
		var cellIndex = this.indexOfCellAtPosInCells(cellPosInCells);
		var cellValue = this.cells[cellIndex];
		return cellValue;
	}

	cellAtPosInCellsSetSourcePosInCells(cellPosInCells, sourcePosInCells)
	{
		var cellIndex = this.indexOfCellAtPos(cellPosInCells);
		this.cells[cellIndex] = sourcePosInCells;
	}

	cellUnderCursorToggleSelect()
	{
		this.isCellUnderCursorSelected =
			(this.isCellUnderCursorSelected == false);
	}

	cursorMove(direction)
	{
		var cursorPosNext =
			this.cursorPos.clone().add(direction);

		var canCursorBeMoved = cursorPosNext.isInRangeMaxExclusive
		(
			this.sizeInCells
		);

		if (canCursorBeMoved)
		{
			if (this.isCellUnderCursorSelected)
			{
				this.swapCellsAtPositions(this.cursorPos, cursorPosNext);
			}

			this.cursorPos.overwriteWith(cursorPosNext);
		}
	}

	indexOfCellAtPosInCells(cellPosInCells)
	{
		return cellPosInCells.y * this.sizeInCells.x + cellPosInCells.x;
	}

	randomize()
	{
		var cellPositionsToPlaceRandomly = [];

		var cellPosInCells = new Coords();

		var sizeInCells = this.sizeInCells;

		for (var y = 0; y < sizeInCells.y; y++)
		{
			cellPosInCells.y = y;

			for (var x = 0; x < sizeInCells.x; x++)
			{
				cellPosInCells.x = x;

				cellPositionsToPlaceRandomly.push(cellPosInCells.clone() );
			}
		}

		var cellCount = sizeInCells.x * sizeInCells.y;

		for (var i = 0; i < cellCount; i++)
		{
			var cellPositionRandomIndex = Math.floor
			(
				Math.random() * cellPositionsToPlaceRandomly.length
			);
			var cellPositionRandom =
				cellPositionsToPlaceRandomly[cellPositionRandomIndex];

			this.cells[i] = cellPositionRandom;

			cellPositionsToPlaceRandomly.splice(cellPositionRandomIndex, 1);
		}

		return this;
	}

	swapCellsAtPositions(posInCells0, posInCells1)
	{
		var cell0Index = this.indexOfCellAtPosInCells(posInCells0);
		var cell1Index = this.indexOfCellAtPosInCells(posInCells1);

		var temp = this.cells[cell0Index];
		this.cells[cell0Index] = this.cells[cell1Index];
		this.cells[cell1Index] = temp;
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

		var cellPosInCells = new Coords();
		var sourcePosInPixels = new Coords();
		var drawPos = new Coords();
		var cellIndex;
		var cellValue;
		var imageFull = Globals.Instance.imageLoaded;

		for (var y = 0; y < this.sizeInCells.y; y++)
		{
			cellPosInCells.y = y;

			for (var x = 0; x < this.sizeInCells.x; x++)
			{
				cellPosInCells.x = x;

				var sourcePosInCells =
					this.cellAtPosInCellsGetSourcePosInCells(cellPosInCells);

				if (cellValue == null)
				{
					cellValue = "";
				}

				sourcePosInPixels.overwriteWith
				(
					sourcePosInCells
				).multiply
				(
					cellSizeInPixels
				);

				drawPos.overwriteWith
				(
					cellPosInCells
				).multiply
				(
					cellSizeInPixels
				);

				display.drawImagePartOfSizeAtPosToPos
				(
					imageFull,
					cellSizeInPixels, // size
					sourcePosInPixels,
					drawPos,
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
			null, // fill
			display.colorBack // border
		);
	}
}
