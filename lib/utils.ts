import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createSquares = (x: number, y: number, width: number, height: number) => {
  const squares = []
  let counter = 0
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      squares.push({
        id: counter,
        xLabel: String.fromCharCode(65 + i),
        yLabel: j + 1,
        top: ((height / x) * i).toString() + "px",
        left: ((width / y) * j).toString() + "px",
        width: (width / x).toString() + "px",
        height: (height / y).toString() + "px",
        border: "0.01em solid black"
      })
      counter++
    }
  }
  return squares;
}