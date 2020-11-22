/**
 * Provides an ergonomic api for awaiting promises w/ proper error handling
 *
 * vendored from https://github.com/scopsy/await-to-js/blob/cd88c54b680540c4ca5318667e85d9bb4635591c/src/await-to-js.ts
 */
export function to<T, U = Error>(
  promise: Promise<T>
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => [err, undefined]);
}
