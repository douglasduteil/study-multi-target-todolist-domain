//

export async function polyfill(): Promise<void> {
  //
  await import("reflect-metadata");
}
