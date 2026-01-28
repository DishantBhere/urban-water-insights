export interface Region {
  id: string;
  name: string;
  population: number; // in millions
  capacity: number; // ML/day
  industrialLoad: number; // index 0-2
  defaultParams: {
    avg_temp: number;
    rainfall: number;
    population_index: number;
    industrial_index: number;
  };
}

export const regions: Region[] = [
  {
    id: 'mumbai',
    name: 'Mumbai',
    population: 20.7,
    capacity: 3850,
    industrialLoad: 1.8,
    defaultParams: {
      avg_temp: 28,
      rainfall: 15,
      population_index: 1.5,
      industrial_index: 1.8,
    },
  },
  {
    id: 'delhi',
    name: 'Delhi',
    population: 32.9,
    capacity: 5500,
    industrialLoad: 1.4,
    defaultParams: {
      avg_temp: 32,
      rainfall: 5,
      population_index: 2.0,
      industrial_index: 1.4,
    },
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    population: 13.6,
    capacity: 2100,
    industrialLoad: 1.6,
    defaultParams: {
      avg_temp: 26,
      rainfall: 10,
      population_index: 1.2,
      industrial_index: 1.6,
    },
  },
  {
    id: 'chennai',
    name: 'Chennai',
    population: 11.5,
    capacity: 1800,
    industrialLoad: 1.5,
    defaultParams: {
      avg_temp: 30,
      rainfall: 8,
      population_index: 1.1,
      industrial_index: 1.5,
    },
  },
];
