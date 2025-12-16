import { useState } from 'react';
import { Stock } from '../lib/types';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StockTableProps {
  stocks: Stock[];
}

type SortField = 'code' | 'name' | 'detectionDate' | 'cupDepth' | 'handleDays' | 'volumeRatio';
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
      className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold cursor-pointer hover:bg-gray-200 transition-colors"
    >
      <div className="flex items-center">
        {label}
        <SortIcon field={field} />
      </div>
    </th>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <HeaderCell field="code" label="銘柄コード" />
            <HeaderCell field="name" label="銘柄名" />
            <HeaderCell field="detectionDate" label="検出日" />
            <th className="border border-gray-300 px-4 py-2 text-right text-sm font-semibold cursor-pointer hover:bg-gray-200 transition-colors" onClick={() => handleSort('cupDepth')}>
              <div className="flex items-center justify-end">
                カップ深さ (%)
                <SortIcon field="cupDepth" />
              </div>
            </th>
            <th className="border border-gray-300 px-4 py-2 text-right text-sm font-semibold cursor-pointer hover:bg-gray-200 transition-colors" onClick={() => handleSort('handleDays')}>
              <div className="flex items-center justify-end">
                ハンドル日数
                <SortIcon field="handleDays" />
              </div>
            </th>
            <th className="border border-gray-300 px-4 py-2 text-right text-sm font-semibold cursor-pointer hover:bg-gray-200 transition-colors" onClick={() => handleSort('volumeRatio')}>
              <div className="flex items-center justify-end">
                出来高倍率
                <SortIcon field="volumeRatio" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedStocks.map((stock) => (
            <tr key={stock.code} className="hover:bg-gray-50 transition-colors">
              <td className="border border-gray-300 px-4 py-2 text-sm font-medium">
                {stock.code}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm">{stock.name}</td>
              <td className="border border-gray-300 px-4 py-2 text-sm">{stock.detectionDate}</td>
              <td className="border border-gray-300 px-4 py-2 text-right text-sm">
                {stock.cupDepth.toFixed(1)}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right text-sm">
                {stock.handleDays}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right text-sm">
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
