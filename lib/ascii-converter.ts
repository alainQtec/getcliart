import { KernelDitherer, rgbaOffset } from './dithering'

const asciiXDots = 2
const asciiYDots = 4

export async function convertImageToAscii(
  file: File,
  options: {
    ditherer: KernelDitherer
    threshold: number
    asciiWidth: number
    invert: boolean
  }
): Promise<string> {
  const { ditherer, threshold, asciiWidth, invert } = options

  const image = await loadImage(file)
  const { canvas, context } = createCanvas(image, asciiWidth)
  const pixels = processImage(canvas, context, image, ditherer, threshold)

  return convertToAscii(pixels, canvas.width, canvas.height, invert)
}

async function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new Image()
    image.src = URL.createObjectURL(file)
    image.onload = () => resolve(image)
  })
}

function createCanvas(image: HTMLImageElement, asciiWidth: number) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!

  const asciiHeight = Math.ceil(asciiWidth * asciiXDots * (image.height / image.width) / asciiYDots)

  canvas.width = asciiWidth * asciiXDots
  canvas.height = asciiHeight * asciiYDots

  return { canvas, context }
}

function processImage(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  ditherer: KernelDitherer,
  threshold: number
): ImageData {
  // Fill canvas with white
  context.globalCompositeOperation = 'source-over'
  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height)

  // Draw image as greyscale
  context.globalCompositeOperation = 'luminosity'
  context.drawImage(image, 0, 0, canvas.width, canvas.height)

  const greyPixels = context.getImageData(0, 0, canvas.width, canvas.height)
  return ditherer.dither(greyPixels, threshold)
}

function convertToAscii(
  pixels: ImageData,
  width: number,
  height: number,
  invert: boolean
): string {
  const targetValue = invert ? 255 : 0
  const lines: string[] = []

  for (let y = 0; y < height; y += asciiYDots) {
    const line: number[] = []
    for (let x = 0; x < width; x += asciiXDots) {
      line.push(
        10240
        + (+(pixels.data[rgbaOffset(x + 1, y + 3, width)] === targetValue) << 7)
        + (+(pixels.data[rgbaOffset(x + 0, y + 3, width)] === targetValue) << 6)
        + (+(pixels.data[rgbaOffset(x + 1, y + 2, width)] === targetValue) << 5)
        + (+(pixels.data[rgbaOffset(x + 1, y + 1, width)] === targetValue) << 4)
        + (+(pixels.data[rgbaOffset(x + 1, y + 0, width)] === targetValue) << 3)
        + (+(pixels.data[rgbaOffset(x + 0, y + 2, width)] === targetValue) << 2)
        + (+(pixels.data[rgbaOffset(x + 0, y + 1, width)] === targetValue) << 1)
        + (+(pixels.data[rgbaOffset(x + 0, y + 0, width)] === targetValue) << 0)
      )
    }
    lines.push(String.fromCharCode(...line))
  }

  return lines.join('\n')
}