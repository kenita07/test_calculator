# 開発ツール・ルール

## 使用技術
- React
- TypeScript
- Vite
- デプロイ：Vercel

## データ方針
- data/results.json を静的に読み込む
- API通信は行わない

## TypeScript方針
- anyは禁止
- データ構造は必ず type 定義する
- フィルタ条件は lib/ に集約する

## コーディング方針
- ロジックとUIは分離する
- コンポーネントは最小粒度
- stateはApp.tsxに集約

## デプロイ方針
- mainブランチ = 常にデプロイ可能
