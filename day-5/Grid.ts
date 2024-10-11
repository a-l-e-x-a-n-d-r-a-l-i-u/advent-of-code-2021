import { Point, PointAsKey, getAsKey } from './Point.js'
import { Vector, allPointsBetween, vectorToString } from './Vector.js'

interface PointData {
  countOfOverlaps: number
}

type GridMap = Map<PointAsKey, PointData>

const createGridMap = (): GridMap => new Map<PointAsKey, PointData>();

// Create data to count overlaps for each point in the grid
const getPointData = (gridMap: GridMap, point: Point): [GridMap, PointData] => {
  const key = getAsKey(point);
  let pointData = gridMap.get(key);

  if (!pointData) {
    pointData = { countOfOverlaps: 0 };
    return [new Map(gridMap).set(key, pointData), pointData];
  }
  return [gridMap, pointData];
};

// Function to set point data in the grid
const setPointData = (gridMap: GridMap, point: Point, data: PointData): GridMap => {
  const key = getAsKey(point);
  return new Map(gridMap).set(key, data);
};

// Function to add vector points to the grid
const addVectorPoints = (gridMap: GridMap, vector: Vector): GridMap => {
  console.log('Calculating path of vector', vectorToString(vector));
  
  let updatedGridMap = gridMap;
  for (const point of allPointsBetween(vector)) {

    // Get the point data or initialize if not present
    const [newGridMap, data] = getPointData(updatedGridMap, point);
    
    // Increment the overlap count for the current point
    const updatedData = { ...data, countOfOverlaps: data.countOfOverlaps + 1 };
    
    // Update the grid map with the new point data
    updatedGridMap = setPointData(newGridMap, point, updatedData);
  }

  return updatedGridMap;
};

// Function to count overlaps
const countOfOverlaps = (gridMap: GridMap): number => {
  let totalOverlaps = 0;
  for (const data of gridMap.values()) {
    if (data.countOfOverlaps > 1) {
      totalOverlaps += 1;
    }
  }
  return totalOverlaps;
};

// Process vectors
export const processVectors = (vectors: Vector[]) => countOfOverlaps(
  vectors.reduce(addVectorPoints, createGridMap())
);