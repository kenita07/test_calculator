import { Stock, FilterConditions } from './types';

export const defaultFilterConditions: FilterConditions = {
  minCupDepth: 0,
  maxCupDepth: 100,
  minHandleDays: 0,
  maxHandleDays: 100,
  minVolumeRatio: 0,
  maxVolumeRatio: 100,
};

export const filterStocks = (stocks: Stock[], conditions: FilterConditions): Stock[] => {
  return stocks.filter((stock) => {
    return (
      stock.cupDepth >= conditions.minCupDepth &&
      stock.cupDepth <= conditions.maxCupDepth &&
      stock.handleDays >= conditions.minHandleDays &&
      stock.handleDays <= conditions.maxHandleDays &&
      stock.volumeRatio >= conditions.minVolumeRatio &&
      stock.volumeRatio <= conditions.maxVolumeRatio
    );
  });
};
