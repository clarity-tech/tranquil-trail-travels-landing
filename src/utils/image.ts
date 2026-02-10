export function unsplashSrcset(baseUrl: string, widths: number[]): string {
  return widths
    .map((w) => {
      const url = baseUrl.replace(/w=\d+/, `w=${w}`);
      return `${url} ${w}w`;
    })
    .join(', ');
}
