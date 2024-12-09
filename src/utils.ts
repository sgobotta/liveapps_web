export function shuffleArray(array: any[]): string[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function takeSome(images: string[], n: number) {
  return images.slice(0, n);
}

export function preventDefault(e: React.DragEvent<HTMLDivElement>): boolean {
  e.preventDefault();
  return false;
}
