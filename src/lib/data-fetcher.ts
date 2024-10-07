import { getEnvVar } from "./env";

const cache = new Map();

const baseUrl2023 = "https://data.ny.gov/resource/uhf3-t34z.json";
const baseUrl2024 = "https://data.ny.gov/resource/jsu2-fbtj.json";
const baseUrl = baseUrl2024;

const appToken = getEnvVar('VITE_MTA_APPTOKEN');

const fetchData = async (selectedDay: string, selectedStation: string, selectedDirection: string, selectedMonths: number[], signal?: AbortSignal) => {
  const cacheKey = `${selectedDay}-${selectedStation}-${selectedDirection}-${selectedMonths}`;
  
  if (cache.has(cacheKey)) {
    console.log('Returning cached data');
    return cache.get(cacheKey);
  }

  const complexId = selectedStation;
  const numMonthsToAverageOver = selectedMonths.length;
  const params = {
    $where: `${selectedDirection === 'goingTo'
      ? `origin_station_complex_id=${complexId}`
      : `destination_station_complex_id=${complexId}`
    } AND day_of_week='${selectedDay}' AND month IN (${selectedMonths.map(m => m + 1).join(',')})`,
    $select: selectedDirection === 'goingTo'  
      ? `destination_station_complex_id as station_id, hour_of_day as hour, sum(estimated_average_ridership) / ${numMonthsToAverageOver} as ridership, destination_latitude as lat, destination_longitude as lon`
      : `origin_station_complex_id as station_id, hour_of_day as hour, sum(estimated_average_ridership) / ${numMonthsToAverageOver} as ridership, origin_latitude as lat, origin_longitude as lon`,
    $group: "station_id,hour,lat,lon",
    $limit: "100000",
    $$app_token: appToken
  };
  const queryString = new URLSearchParams(params).toString();
  const url = `${baseUrl}?${queryString}`;

  try {
    const start = Date.now();
    const response = await fetch(url, { signal });
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(`Network response was not ok:\n${JSON.stringify(errorResponse, null, 2)}`);
    }
    console.log(`Successfully fetched origin-destination (${selectedDay}, ${selectedStation}, ${selectedDirection}) data in ${Date.now() - start} ms`);
    const result = await response.json();

    const processedData = result
      .map(item => ({
        ...item,
        ridership: Number(item.ridership),
        lat: Number(item.lat),
        lon: Number(item.lon),
        hour: Number(item.hour),
      }));

    cache.set(cacheKey, processedData);
    console.log('Cache memory usage:', getCacheMemoryUsageInBytes(), cache.size);
    return processedData;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Failed to fetch data:', error);
    }
    throw error;
  }
};

// Get total ridership for a given day, month, and direction, grouped by station and hour
const fetchTotalRidership = async (selectedDay: string, selectedMonths: number[], selectedDirection: string, signal?: AbortSignal) => {
  const cacheKey = `total-${selectedDay}-${selectedDirection}-${selectedMonths}`;
  
  if (cache.has(cacheKey)) {
    console.log('Returning cached total ridership data');
    return cache.get(cacheKey);
  }

  const numMonthsToAverageOver = selectedMonths.length;

  const params = {
    $where: `day_of_week='${selectedDay}' AND month IN (${selectedMonths.map(m => m + 1).join(',')})`,
    $select: selectedDirection === 'goingTo'
      ? `destination_station_complex_id as station_id, hour_of_day as hour, SUM(estimated_average_ridership) / ${numMonthsToAverageOver} as total_ridership`
      : `origin_station_complex_id as station_id, hour_of_day as hour, SUM(estimated_average_ridership) / ${numMonthsToAverageOver} as total_ridership`,
    $group: "station_id, hour",
    $limit: "100000",
    $$app_token: appToken
  };
  
  const queryString = new URLSearchParams(params).toString();
  const url = `${baseUrl}?${queryString}`;

  try {
    const start = Date.now();
    const response = await fetch(url, { signal });
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(`Network response was not ok:\n${JSON.stringify(errorResponse, null, 2)}`);
    }
    console.log(`Successfully fetched total ridership data in ${Date.now() - start} ms`);
    const result = await response.json();

    const stationIdToTotalRidershipByHour = {}
    result.forEach(item => {
      const { station_id, hour, total_ridership } = item;
      if (!stationIdToTotalRidershipByHour[station_id]) {
        stationIdToTotalRidershipByHour[station_id] = {};
      }
      stationIdToTotalRidershipByHour[station_id][hour] = Number(total_ridership);
    });

    cache.set(cacheKey, stationIdToTotalRidershipByHour);
    console.log('Cache memory usage:', getCacheMemoryUsageInBytes(), cache.size);
    return stationIdToTotalRidershipByHour;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Failed to fetch total ridership data:', error);
    }
    throw error;
  }
};

const getCacheMemoryUsageInBytes = () => {
  let total = 0;
  for (const value of cache.values()) {
    total += JSON.stringify(value).length;
  }
  return total;
};

export { fetchData, fetchTotalRidership };