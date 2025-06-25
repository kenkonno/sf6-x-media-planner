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