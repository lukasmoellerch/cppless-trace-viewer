export function nanosecondsToString(nanoseconds: number): string {
  if (nanoseconds < 1000) {
    return `${nanoseconds} ns`;
  }
  if (nanoseconds < 1000000) {
    if (nanoseconds / 1000 > 100) {
      return `${(nanoseconds / 1000).toFixed(0)} μs`;
    } else {
      return `${(nanoseconds / 1000).toFixed(1)} μs`;
    }
  }
  if (nanoseconds < 1000000000) {
    if (nanoseconds / 1000000 > 100) {
      return `${(nanoseconds / 1000000).toFixed(0)} ms`;
    } else {
      return `${(nanoseconds / 1000000).toFixed(1)} ms`;
    }
  }

  if (nanoseconds / 1000000000 > 100) {
    return `${(nanoseconds / 1000000000).toFixed(0)} s`;
  }
  return `${(nanoseconds / 1000000000).toFixed(1)} s`;
}
