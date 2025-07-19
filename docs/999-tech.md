# 技術仕様書

## アーキテクチャ概要

### フロントエンド
- **React Native (Expo)**: クロスプラットフォーム対応のモバイルアプリ
- **TypeScript**: 型安全性とコード品質の向上
- **Expo Camera**: カメラ機能の実装
- **React Navigation**: 画面遷移管理

### バックエンド・データベース
- **Supabase**: PostgreSQLベースのBaaS
  - リアルタイムデータベース
  - RESTful API自動生成
  - Row Level Security (RLS)
  - リアルタイム購読機能
  - ストレージ機能

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
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### meals
```sql
CREATE TABLE meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  image_url TEXT,
  menu_items TEXT[],
  ingredients TEXT[],
  cuisine TEXT,
  meal_date DATE NOT NULL,
  ai_analysis JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### recommendation_settings
```sql
CREATE TABLE recommendation_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  preferences JSONB DEFAULT '{}',
  excluded_ingredients TEXT[],
  preferred_cuisines TEXT[],
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## API設計

### Supabase API

#### REST API エンドポイント
- `POST /meals`: 新しい食事記録の作成
- `GET /meals`: ユーザーの食事履歴取得
- `PUT /meals/:id`: 食事記録の更新
- `DELETE /meals/:id`: 食事記録の削除
- `GET /recommendation_settings`: 推薦設定の取得
- `PUT /recommendation_settings`: 推薦設定の更新

#### Edge Functions
- `analyze-meal-image`: Gemini APIを使用した画像解析
- `generate-recommendations`: AI推薦の生成

#### RLS ポリシー
```sql
-- ユーザーは自分のデータのみアクセス可能
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access their own meals" ON meals
  FOR ALL USING (auth.uid()::text = (SELECT clerk_id FROM users WHERE id = user_id));
```

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
- Supabase RLS (Row Level Security) による認可
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
- PostgreSQLインデックス最適化
- クエリ効率化
- リアルタイム購読の最適化
- コネクションプーリング

## 開発環境

### 必要なツール
- Node.js (v18+)
- pnpm (パッケージマネージャー)
- Expo CLI
- TypeScript
- Biome (リンター・フォーマッター)

### 環境変数
```env
# Supabase
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Clerk
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Gemini AI
GEMINI_API_KEY=
```

## デプロイ戦略

### モバイルアプリ
- Expo Application Services (EAS)
- App Store / Google Play Store配布

### バックエンド
- Supabase自動デプロイ
- Edge Functions デプロイ
- 環境別設定管理

## 監視・ログ

### エラー追跡
- Supabase ログ監視
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