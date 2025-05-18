/**
 * Maps a value from 0-1 range to a target range
 * @param value Input value (between 0-1)
 * @param start Start value of target range
 * @param end End value of target range
 * @returns Mapped value
 */
export function map(value: number, start: number, end: number): number {
    return start + (end - start) * value;
}