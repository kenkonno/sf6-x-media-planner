/*
 * =================================================================
 * ファイル: src/composables/useMyPage.ts (新規作成)
 * =================================================================
 * マイページの表示に必要なデータを取得・管理するComposableです。
 */
import {ref, readonly} from 'vue';
import type {UserProfile, PostedArticleSummary, FollowUser} from '../types';

// --- モックデータ ---
const mockUserProfile: UserProfile = {
    id: 'user01',
    name: 'ExampleUser',
    avatarUrl: 'https://placehold.co/128x128/3b82f6/FFFFFF?text=U',
    profile: 'リュウをメインに使っています。主に画面端のセットプレイや確定反撃に関する記事を投稿しています。気軽にフォローしてください。',
    followingCount: 125,
    followerCount: 88,
};

const mockPostedArticles: PostedArticleSummary[] = [
    {
        id: 'art01',
        title: 'リュウの基本：ドライブインパクト後の最大ダメージコンボまとめ',
        publishedAt: '2025/06/26',
        stats: {views: '10.8k', likes: '1.2k'}
    },
    {
        id: 'art02',
        title: '画面端の起き攻め連携パターン',
        publishedAt: '2025/06/20',
        stats: {views: '8.2k', likes: '950'}
    },
];

const mockFollowingList: FollowUser[] = [
    {
        id: 'user02',
        name: 'AuthorA',
        avatarUrl: 'https://placehold.co/48x48/a855f7/FFFFFF?text=A',
        bio: 'JP使い。大会での立ち回りを分析するのが好きです。',
        isFollowing: true
    },
    {
        id: 'user03',
        name: 'CuratorB',
        avatarUrl: 'https://placehold.co/48x48/ef4444/FFFFFF?text=B',
        bio: '初心者向けの攻略ページをまとめています。',
        isFollowing: true
    },
];

const mockFollowerList: FollowUser[] = [
    {
        id: 'user04',
        name: 'ProPlayerX',
        avatarUrl: 'https://placehold.co/48x48/10b981/FFFFFF?text=P',
        bio: 'プロゲーマー。主に大会レポートなどを投稿。',
        isFollowing: false
    },
    {
        id: 'user05',
        name: 'GamerZ',
        avatarUrl: 'https://placehold.co/48x48/facc15/FFFFFF?text=G',
        bio: 'モダン操作での攻略を発信中！',
        isFollowing: true
    },
];

// --- モックデータ終 ---

export function useMyPage() {
    const userProfile = ref<UserProfile | null>(null);
    const postedArticles = ref<PostedArticleSummary[]>([]);
    const followingList = ref<FollowUser[]>([]);
    const followerList = ref<FollowUser[]>([]);
    const loading = ref(false);

    const fetchData = async () => {
        loading.value = true;
        await new Promise(resolve => setTimeout(resolve, 500)); // API通信をシミュレート
        userProfile.value = mockUserProfile;
        postedArticles.value = mockPostedArticles;
        followingList.value = mockFollowingList;
        followerList.value = mockFollowerList;
        loading.value = false;
    };

    return {userProfile, postedArticles, followingList, followerList, loading, fetchData};
}