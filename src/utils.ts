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

import { withBaseUrl } from './utils/baseUrl';

export function publicImage(imagePath: string): string {
  return withBaseUrl(imagePath);
}

export function openTab(url: string): void {
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('target', '_blank');
  link.click();
}
