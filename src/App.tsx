import { useState, useEffect } from 'react';
import { Stock, FilterConditions } from './lib/types';
import { filterStocks, defaultFilterConditions } from './lib/filters';
import { FilterPanel } from './components/FilterPanel';
import { StockTable } from './components/StockTable';

function App() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [conditions, setConditions] = useState<FilterConditions>(defaultFilterConditions);
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

  const filteredStocks = filterStocks(stocks, conditions);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">株式スクリーニング</h1>
          <p className="text-gray-600 mt-2">
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
            <FilterPanel conditions={conditions} onConditionsChange={setConditions} />

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  検出件数: <span className="font-semibold text-gray-900">{filteredStocks.length}</span> / {stocks.length}
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
