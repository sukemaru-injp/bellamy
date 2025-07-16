# 技術仕様書

## アーキテクチャ概要

### フロントエンド
- **React Native (Expo)**: クロスプラットフォーム対応のモバイルアプリ
- **TypeScript**: 型安全性とコード品質の向上
- **Expo Camera**: カメラ機能の実装
- **React Navigation**: 画面遷移管理

### バックエンド・データベース
- **Convex**: リアルタイムデータベース・バックエンドサービス
  - サーバーレスアーキテクチャ
  - リアルタイムデータ同期
  - 型安全なAPI
  - 自動スケーリング

### 認証
- **Clerk**: ユーザー認証・管理サービス
  - ソーシャルログイン対応
  - セキュアな認証フロー
  - ユーザー管理機能
  - React Native SDK

### AI・機械学習
- **Google Gemini 2.5**: 画像解析・自然言語処理
  - 高精度な画像認識
  - 多言語対応
  - コンテキスト理解
  - API経由での利用

## データベース設計

### テーブル構成

#### users
```typescript
{
  _id: Id<"users">,
  clerkId: string,
  email: string,
  name: string,
  createdAt: number,
  updatedAt: number
}
```

#### meals
```typescript
{
  _id: Id<"meals">,
  userId: Id<"users">,
  imageUrl: string,
  menuItems: string[],
  ingredients: string[],
  cuisine: string,
  date: number,
  aiAnalysis: {
    confidence: number,
    rawResponse: string
  },
  createdAt: number,
  updatedAt: number
}
```

#### recommendations_settings
```typescript
{
  _id: Id<"recommendations_settings">,
  userId: Id<"users">,
  preferences: {
    sameIngredients: boolean,
    differentIngredients: boolean,
    flavorVariations: boolean,
    frequency: "daily" | "weekly" | "monthly"
  },
  excludedIngredients: string[],
  preferredCuisines: string[],
  updatedAt: number
}
```

## API設計

### Convex関数

#### Mutations
- `createMeal`: 新しい食事記録の作成
- `updateMeal`: 食事記録の更新
- `deleteMeal`: 食事記録の削除
- `updateRecommendationSettings`: 推薦設定の更新

#### Queries
- `getMeals`: ユーザーの食事履歴取得
- `getMealsByDateRange`: 期間指定での食事履歴取得
- `getRecommendations`: おすすめメニューの取得
- `getRecommendationSettings`: 推薦設定の取得

#### Actions
- `analyzeMealImage`: Gemini APIを使用した画像解析
- `generateRecommendations`: AI推薦の生成

## 外部API統合

### Gemini API
```typescript
interface GeminiAnalysisRequest {
  image: string; // base64
  prompt: string;
}

interface GeminiAnalysisResponse {
  menuItems: string[];
  ingredients: string[];
  cuisine: string;
  confidence: number;
}
```

### Clerk API
- ユーザー認証状態の管理
- プロフィール情報の取得
- セッション管理

## セキュリティ

### 認証・認可
- Clerk JWTトークンによる認証
- Convex関数レベルでの認可チェック
- ユーザーデータの分離

### データ保護
- 画像データの暗号化保存
- 個人情報の適切な管理
- GDPR準拠のデータ処理

## パフォーマンス最適化

### 画像処理
- 画像圧縮・最適化
- 非同期処理による応答性向上
- キャッシュ戦略

### データベース
- インデックス最適化
- クエリ効率化
- リアルタイム更新の最適化

## 開発環境

### 必要なツール
- Node.js (v18+)
- pnpm (パッケージマネージャー)
- Expo CLI
- TypeScript
- Biome (リンター・フォーマッター)

### 環境変数
```env
# Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Gemini AI
GEMINI_API_KEY=
```

## デプロイ戦略

### モバイルアプリ
- Expo Application Services (EAS)
- App Store / Google Play Store配布

### バックエンド
- Convex自動デプロイ
- 環境別設定管理

## 監視・ログ

### エラー追跡
- Convex組み込みログ
- Clerk認証ログ
- アプリケーションエラー監視

### パフォーマンス監視
- API応答時間
- 画像解析処理時間
- ユーザー行動分析

## 今後の拡張性

### 機能拡張
- 栄養情報の追加
- ソーシャル機能
- レシピ提案機能

### 技術的拡張
- Web版の開発
- オフライン対応
- プッシュ通知機能