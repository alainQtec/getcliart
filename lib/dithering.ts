export function rgbaOffset(x: number, y: number, width: number) {
  return width * 4 * y + 4 * x;
}

export class KernelDitherer {
  constructor(
    public origin: [number, number],
    public numerators: number[][],
    public denominator: number = 1,
  ) { }

  weights(): [number, number, number][] {
    const weights: [number, number, number][] = [];
    const [originX, originY] = this.origin;

    for (let y = 0; y < this.numerators.length; y++) {
      for (let x = 0; x < this.numerators[y].length; x++) {
        weights.push([
          x - originX,
          y - originY,
          this.numerators[y][x] / this.denominator,
        ]);
      }
    }

    return weights;
  }

  dither(input: ImageData, threshold: number) {
    const output = new ImageData(input.width, input.height);
    const weights = this.weights();

    for (let y = 0; y < input.height; y++) {
      for (let x = 0; x < input.width; x++) {
        const offset = rgbaOffset(x, y, input.width);
        const greyPixel = input.data[offset];
        const value = greyPixel > threshold ? 255 : 0;
        output.data.set([value, value, value, 255], offset);

        // Diffuse error to neighboring pixels
        const error = greyPixel - value;
        for (const [weightX, weightY, weight] of weights) {
          if (weight === 0) continue;
          const offset = rgbaOffset(x + weightX, y + weightY, input.width);
          if (offset >= 0 && offset < input.data.length) {
            const value = input.data[offset];
            input.data[offset] = value + error * weight;
          }
        }
      }
    }

    return output;
  }
}