
class Display
{
	constructor
	(
		sizeInPixels,
		fontHeightInPixels,
		colorBack,
		colorFore
	)
	{
		this.sizeInPixels = sizeInPixels;
		this.fontHeightInPixels = fontHeightInPixels;
		this.colorBack = colorBack;
		this.colorFore = colorFore;
	}

	initialize()
	{
		var canvas = document.createElement("canvas");
		canvas.width = this.sizeInPixels.x;
		canvas.height = this.sizeInPixels.y;

		this.graphics = canvas.getContext("2d");
		this.graphics.font =
			this.fontHeightInPixels + "px sans-serif";

		document.body.appendChild(canvas);
	}

	// drawing

	clear()
	{
		this.drawRectangle
		(
			new Coords(0, 0),
			this.sizeInPixels,
			this.colorBack,
			this.colorFore
		);
	}

	drawImageAtPos(imageToDraw, pos)
	{
		var systemImage = imageToDraw.systemImage;
		this.graphics.drawImage
		(
			systemImage,
			pos.x, pos.y
		);
	}

	drawRectangle(pos, size, colorFill, colorBorder)
	{
		var g = this.graphics;

		if (colorFill != null)
		{
			g.fillStyle = colorFill;
			g.fillRect
			(
				pos.x, pos.y,
				size.x, size.y
			);
		}

		if (colorBorder != null)
		{
			g.strokeStyle = colorBorder;
			g.strokeRect
			(
				pos.x, pos.y,
				size.x, size.y
			);
		}
	}

	drawText(text, pos, color)
	{
		var g = this.graphics;
		g.fillStyle = color;
		g.fillText
		(
			text,
			pos.x, pos.y + this.fontHeightInPixels
		);
	}
 
}
