// Define a type for the Point
export type Point = {
  x: number;
  y: number;
};

// Define the PointAsKey type as a template literal type
export type PointAsKey = `${number},${number}`;

// Function to create a new Point
export const createPoint = (x: number, y: number): Point => ({
  x,
  y,
});

// Function to get the key representation of a Point, ensuring it matches PointAsKey type
export const getAsKey = (point: Point): PointAsKey => {
  return `${point.x},${point.y}` as PointAsKey;
};