export function shuffleAssets(images: string[]): string[] {
  return images
    .concat(images)
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export function takeSome(images: string[], n: number) {
  return images.slice(0, n)
}

export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function preventDefault(e: React.DragEvent<HTMLDivElement>): boolean {
  e.preventDefault()
  return false
}
