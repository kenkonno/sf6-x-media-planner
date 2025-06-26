/*
 * =================================================================
 * ファイル: src/types/index.ts (新規作成)
 * =================================================================
 * プロジェクト全体で利用する型定義をここにまとめます。
 */

export interface Character {
    name: string;
    iconUrl: string;
}

export interface Author {
    name: string;
    avatarUrl: string;
}

export interface Stats {
    pv: string; // '10.8k' のような文字列を想定
    likes: string; // '1.2k' のような文字列を想定
}

export interface Recipe {
    id: string;
    title: string;
    damage: number;
    driveGauge: number;
    saGaugeCost: number;
    saGaugeGain: number;
    likes: number;
    commands: string; // HTML文字列
    description: string;
    videoUrl?: string; // オプショナル
}

export interface Article {
    id: string;
    character: Character;
    title: string;
    author: Author;
    publishedAt: string;
    stats: Stats;
    tags: string[];
    body: string; // HTML文字列
    recipes: Recipe[];
}

/*
 * =================================================================
 * ファイル: src/types/index.ts (既存のファイルに追記・更新)
 * =================================================================
 * キャラクター詳細ページで使用する型定義を追加します。
 */

export interface Character {
    id: number;
    name: string;
    slug: string;
    iconUrl: string;
    imageUrl?: string; // キャラページ用の大きな画像
}

export interface Author {
    name: string;
    avatarUrl: string;
}

// 汎用的なコンテンツアイテムの型
export interface ContentSummary {
    id: string;
    type: 'article' | 'recipe' | 'strategy_page';
    title: string;
    author: Author;
    stats: {
        likes: number;
        views?: number; // レシピや攻略ページにはPVがない場合を想定
    };
    character?: Character; // レシピなどでキャラ情報を表示するため
    description?: string; // 記事や攻略ページの短い説明
}

export interface ArticleSummary extends ContentSummary {
    type: 'article';
}

export interface RecipeSummary extends ContentSummary {
    type: 'recipe';
    damage?: number; // レシピ特有のデータ
}

export interface StrategyPageSummary extends ContentSummary {
    type: 'strategy_page';
}

/*
 * =================================================================
 * ファイル: src/types/index.ts (TOPページで使用する型定義)
 * =================================================================
 */
export interface Author {
    name: string;
    avatarUrl: string;
}

// タイムラインに表示されるアイテムの型
export interface TimelineItem {
    id: string;
    author: Author;
    actionText: string; // 'さんが新しい記事を投稿しました' など
    postType: 'article' | 'strategy_page';
    title: string;
    description?: string;
    createdAt: string; // '2分前' のような相対時間
}

// 注目コンテンツに表示されるアイテムの型
export interface FeaturedItem {
    id: string;
    rank: number;
    title: string;
    authorName: string;
    characterName?: string;
}

export interface Character {
    id: number;
    name: string;
    slug: string;
    iconUrl: string;
}

export interface NewsItem {
    id: string;
    date: string;
    title: string;
}

/*
 * =================================================================
 * ファイル: src/types/index.ts (既存のファイルに追記・更新)
 * =================================================================
 * 検索ページで使用する型定義を追加します。
 */
export interface Character {
    id: number;
    name: string;
    slug: string;
}

export interface Author {
    name: string;
    avatarUrl: string;
}

export interface ContentSummary {
    id: string;
    type: 'article' | 'recipe' | 'strategy_page';
    title: string;
    author: Author;
    stats: {
        likes: number;
        views?: number;
    };
    description?: string;
}

export interface SearchFilters {
    keyword: string;
    types: ('article' | 'recipe' | 'strategy_page')[];
    characterId: number | 'all';
    tags: string[];
}

export interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalResults: number;
}


/*
 * =================================================================
 * ファイル: src/types/index.ts (既存のファイルに追記・更新)
 * =================================================================
 * マイページで使用する型定義を追加します。
 */
export interface UserProfile {
    id: string;
    name: string;
    avatarUrl: string;
    profile: string;
    followingCount: number;
    followerCount: number;
}

export interface PostedArticleSummary {
    id: string;
    title: string;
    publishedAt: string;
    stats: {
        views: string; // '10.8k'
        likes: string; // '1.2k'
    };
}

export interface FollowUser {
    id: string;
    name: string;
    avatarUrl: string;
    bio: string;
    isFollowing: boolean; // 自分がそのユーザーをフォローしているか
}

/*
 * =================================================================
 * ファイル: src/types/index.ts (既存のファイルに追記・更新)
 * =================================================================
 * 記事エディタで使用する型定義を追加します。
 */
export interface Character {
    id: number;
    name: string;
    slug: string;
}

// 記事フォームのデータを管理する型
export interface ArticleForm {
    title: string;
    characterId: number | 'general' | null;
    tags: string[];
    body: string; // Markdown形式
}

/*
 * =================================================================
 * ファイル: src/types/index.ts (既存のファイルに追記・更新)
 * =================================================================
 * レシピ追加フォームで使用する型定義を追加します。
 */
export interface Character {
    id: number;
    name: string;
    slug: string;
}

// レシピフォームのデータを管理する型
export interface RecipeForm {
    characterId: number | null;
    title: string;
    commands: string;
    damage: number | null;
    videoUrl: string;
    driveGaugeCost: number | null;
    driveGaugeGain: number | null;
    saGaugeCost: number | null;
    saGaugeGain: number | null;
    description: string;
    tags: string[];
}