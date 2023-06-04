
class Image2
{
	constructor(name, systemImage)
	{
		this.name = name;
		this.systemImage = systemImage;
	}

	sizeInPixels()
	{
		return new Coords
		(
			this.systemImage.width,
			this.systemImage.height
		);
	}
}