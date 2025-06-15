# Bellamy

## プロジェクト構成

このプロジェクトはBellamyという名称のモノレポ構成です。主に以下の要素で構成されています。

*   `apps/native`: Expo (React Native) を使用したネイティブアプリケーションです。
*   `packages/`: 共通のUIコンポーネントやTypeScriptの設定などが含まれています。
*   `turbo.json`: Turborepoの設定ファイルです。
*   `pnpm-workspace.yaml`: pnpm workspacesの設定ファイルです。

## セットアップ

プロジェクトの依存関係をインストールするには、リポジトリのルートディレクトリで以下のコマンドを実行してください。

```bash
pnpm install
```

## 起動方法

### 開発サーバーの起動

すべてのワークスペースで開発サーバーを起動するには、ルートディレクトリで以下のコマンドを実行します。

```bash
pnpm dev
```

### ネイティブアプリケーション (`apps/native`) の起動

特定のプラットフォームでネイティブアプリケーションを起動するには、以下のいずれかのコマンドを使用します。

*   **Expo開発サーバーの起動 (プラットフォーム選択プロンプト表示):**
    ```bash
    pnpm --filter native dev
    ```
    または
    ```bash
    cd apps/native
    pnpm dev
    ```
*   **Android:**
    ```bash
    pnpm --filter native android
    ```
    または
    ```bash
    cd apps/native
    pnpm android
    ```
*   **iOS:**
    ```bash
    pnpm --filter native ios
    ```
    または
    ```bash
    cd apps/native
    pnpm ios
    ```
*   **Web:**
    ```bash
    pnpm --filter native web
    ```
    または
    ```bash
    cd apps/native
    pnpm web
    ```

## ビルド

プロジェクト全体をビルドするには、ルートディレクトリで以下のコマンドを実行します。

```bash
pnpm build
```

## リンティングとフォーマット

コードの品質を維持するために、以下のコマンドを使用できます。

*   **リンティング:**
    ```bash
    pnpm lint
    ```
*   **フォーマット:**
    ```bash
    pnpm format
    ```
*   **チェック (リンティングと型チェックなど):**
    ```bash
    pnpm check
# bellamy
