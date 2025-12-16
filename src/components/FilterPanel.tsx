import { FilterConditions } from '../lib/types';

interface FilterPanelProps {
  conditions: FilterConditions;
  onConditionsChange: (conditions: FilterConditions) => void;
}

export const FilterPanel = ({ conditions, onConditionsChange }: FilterPanelProps) => {
  const handleChange = (field: keyof FilterConditions, value: number) => {
    onConditionsChange({
      ...conditions,
      [field]: value,
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">フィルター条件</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            カップ深さ (%)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={conditions.minCupDepth}
              onChange={(e) => handleChange('minCupDepth', parseFloat(e.target.value))}
              placeholder="最小"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={conditions.maxCupDepth}
              onChange={(e) => handleChange('maxCupDepth', parseFloat(e.target.value))}
              placeholder="最大"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ハンドル日数
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              value={conditions.minHandleDays}
              onChange={(e) => handleChange('minHandleDays', parseInt(e.target.value))}
              placeholder="最小"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              value={conditions.maxHandleDays}
              onChange={(e) => handleChange('maxHandleDays', parseInt(e.target.value))}
              placeholder="最大"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            出来高倍率
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={conditions.minVolumeRatio}
              onChange={(e) => handleChange('minVolumeRatio', parseFloat(e.target.value))}
              placeholder="最小"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={conditions.maxVolumeRatio}
              onChange={(e) => handleChange('maxVolumeRatio', parseFloat(e.target.value))}
              placeholder="最大"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
