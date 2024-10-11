import { Point, createPoint, getAsKey } from './Point.js'

// A vector is now just a plain object with start and end points
export type Vector = {
  start: Point;
  end: Point;
};

// Create a vector from two points
export const createVector = (start: Point, end: Point): Vector => ({
  start,
  end,
});

// Move towards a target value functionally
const moveTowards = (current: number, end: number): number => {
  if (current < end) {
    return current + 1;
  }
  if (current > end) {
    return current - 1;
  }
  return current;
};

// Convert vector to string
export const vectorToString = (vector: Vector): string => {
  return `${getAsKey(vector.start)} -> ${getAsKey(vector.end)}`;
};

// Generate all points between the start and end of the vector (functional version)
export const allPointsBetween = function* (vector: Vector): Generator<Point, void> {
  let { x, y } = vector.start;
  let hitEndPoint = false;

  while (!hitEndPoint) {
    yield createPoint(x, y);
    hitEndPoint = true;

    if (x !== vector.end.x) {
      hitEndPoint = false;
      x = moveTowards(x, vector.end.x);
    }

    if (y !== vector.end.y) {
      hitEndPoint = false;
      y = moveTowards(y, vector.end.y);
    }
  }
};