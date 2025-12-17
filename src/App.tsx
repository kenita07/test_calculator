import { useState, useEffect } from 'react';
import { Stock, FilterConditions } from './lib/types';
import { filterStocks, defaultFilterConditions } from './lib/filters';
import { FilterPanel } from './components/FilterPanel';
import { StockTable } from './components/StockTable';

function App() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [conditions, setConditions] = useState<FilterConditions>(defaultFilterConditions);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStocks = async () => {
      try {
        const response = await fetch('/data/results.json');
        if (!response.ok) {
          throw new Error('JSONの読み込みに失敗しました');
        }
        const data = await response.json();
        setStocks(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
        setLoading(false);
      }
    };

    loadStocks();
  }, []);

  const filteredStocks = filterStocks(stocks, conditions).filter((stock) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      stock.code.toLowerCase().includes(searchLower) ||
      stock.name.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">株式スクリーニング</h1>
          <p className="text-gray-600 mt-2 text-lg">
            カップウィズハンドル銘柄の一覧表示・フィルター
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">データを読み込み中...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">エラー: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
              <input
                type="text"
                placeholder="銘柄コード または 銘柄名で検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <FilterPanel conditions={conditions} onConditionsChange={setConditions} />

            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  検出件数: <span className="font-semibold text-lg text-gray-900">{filteredStocks.length}</span> <span className="text-gray-400">/ {stocks.length}</span>
                </p>
              </div>
              <StockTable stocks={filteredStocks} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
