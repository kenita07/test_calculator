import { Stock } from '../lib/types';

interface StockTableProps {
  stocks: Stock[];
}

export const StockTable = ({ stocks }: StockTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
              銘柄コード
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
              銘柄名
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
              検出日
            </th>
            <th className="border border-gray-300 px-4 py-2 text-right text-sm font-semibold">
              カップ深さ (%)
            </th>
            <th className="border border-gray-300 px-4 py-2 text-right text-sm font-semibold">
              ハンドル日数
            </th>
            <th className="border border-gray-300 px-4 py-2 text-right text-sm font-semibold">
              出来高倍率
            </th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.code} className="hover:bg-gray-50">
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
      {stocks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          条件に合致する銘柄がありません
        </div>
      )}
    </div>
  );
};
