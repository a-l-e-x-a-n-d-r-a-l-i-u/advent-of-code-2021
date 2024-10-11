import { Point, PointAsKey, getAsKey } from './Point.js'
import { Vector, allPointsBetween, vectorToString } from './Vector.js'

interface PointData {
  countOfOverlaps: number
}

// The grid map is now passed explicitly as a parameter
type GridMap = Map<PointAsKey, PointData>

// Create a new grid map (initially empty)
export const createGridMap = (): GridMap => new Map<PointAsKey, PointData>();

// Function to get or create PointData in the grid
const getPointData = (gridMap: GridMap, point: Point): [GridMap, PointData] => {
  const key = getAsKey(point); // Use functional getAsKey to get the key
  let pointData = gridMap.get(key);

  if (!pointData) {
    pointData = { countOfOverlaps: 0 };
    // Return the updated gridMap with the new point data
    return [new Map(gridMap).set(key, pointData), pointData];
  }

  return [gridMap, pointData];
};

// Function to set PointData in the grid
const setPointData = (gridMap: GridMap, point: Point, data: PointData): GridMap => {
  const key = getAsKey(point);
  // Return a new grid map with the updated data
  return new Map(gridMap).set(key, data);
};

// Function to get all PointData from the grid
const allPointDatas = (gridMap: GridMap): IterableIterator<PointData> => {
  return gridMap.values();
};

// Function to add vector points to the grid
export const addVectorPoints = (gridMap: GridMap, vector: Vector): GridMap => {
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
export const countOfOverlaps = (gridMap: GridMap): number => {
  let totalOverlaps = 0;
  for (const data of gridMap.values()) {
    if (data.countOfOverlaps > 1) {
      totalOverlaps += 1;
    }
  }
  return totalOverlaps;
};