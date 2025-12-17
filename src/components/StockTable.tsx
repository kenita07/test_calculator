import { useState } from 'react';
import { Stock } from '../lib/types';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StockTableProps {
  stocks: Stock[];
}

type SortField = 'code' | 'name' | 'price' | 'detectionDate' | 'cupDepth' | 'handleDays' | 'volumeRatio';
type SortOrder = 'asc' | 'desc' | null;

export const StockTable = ({ stocks }: StockTableProps) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        setSortField(null);
        setSortOrder(null);
      }
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedStocks = [...stocks].sort((a, b) => {
    if (!sortField || !sortOrder) return 0;

    const aVal = a[sortField];
    const bVal = b[sortField];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortOrder === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <span className="text-gray-300 ml-1">⇅</span>;
    }
    return sortOrder === 'asc'
      ? <ArrowUp className="inline ml-1" size={16} />
      : <ArrowDown className="inline ml-1" size={16} />;
  };

  const HeaderCell = ({ field, label }: { field: SortField; label: string }) => (
    <th
      onClick={() => handleSort(field)}
      className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-gray-50 transition-colors bg-gray-50"
    >
      <div className="flex items-center">
        {label}
        <SortIcon field={field} />
      </div>
    </th>
  );

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <HeaderCell field="code" label="銘柄コード" />
            <th className="border-b border-gray-300 px-4 py-3 text-left text-sm font-semibold cursor-pointer hover:bg-gray-50 transition-colors bg-gray-50">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <button onClick={() => handleSort('name')} className="hover:text-blue-600">
                    銘柄名 <SortIcon field="name" />
                  </button>
                </div>
                <div className="text-right whitespace-nowrap">
                  <button onClick={() => handleSort('price')} className="hover:text-blue-600">
                    株価 <SortIcon field="price" />
                  </button>
                </div>
              </div>
            </th>
            <HeaderCell field="detectionDate" label="検出日" />
            <th className="border-b border-gray-300 px-4 py-3 text-right text-sm font-semibold cursor-pointer hover:bg-gray-50 transition-colors bg-gray-50" onClick={() => handleSort('cupDepth')}>
              <div className="flex items-center justify-end">
                カップ深さ (%)
                <SortIcon field="cupDepth" />
              </div>
            </th>
            <th className="border-b border-gray-300 px-4 py-3 text-right text-sm font-semibold cursor-pointer hover:bg-gray-50 transition-colors bg-gray-50" onClick={() => handleSort('handleDays')}>
              <div className="flex items-center justify-end">
                ハンドル日数
                <SortIcon field="handleDays" />
              </div>
            </th>
            <th className="border-b border-gray-300 px-4 py-3 text-right text-sm font-semibold cursor-pointer hover:bg-gray-50 transition-colors bg-gray-50" onClick={() => handleSort('volumeRatio')}>
              <div className="flex items-center justify-end">
                出来高倍率
                <SortIcon field="volumeRatio" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedStocks.map((stock) => (
            <tr key={stock.code} className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                {stock.code}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{stock.name}</span>
                  <span className="text-sm font-semibold text-blue-600 ml-4 whitespace-nowrap">
                    {stock.price.toLocaleString()}円
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{stock.detectionDate}</td>
              <td className="px-4 py-3 text-right text-sm text-gray-700">
                {stock.cupDepth.toFixed(1)}
              </td>
              <td className="px-4 py-3 text-right text-sm text-gray-700">
                {stock.handleDays}
              </td>
              <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                {stock.volumeRatio.toFixed(2)}x
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {sortedStocks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          条件に合致する銘柄がありません
        </div>
      )}
    </div>
  );
};
