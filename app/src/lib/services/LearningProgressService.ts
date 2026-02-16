import { PublicKey } from '@solana/web3.js';

export interface Progress {
    courseId: string;
    completedLessons: number[];
    isCompleted: boolean;
    lastAccessed: number;
}

export interface StreakData {
    currentStreak: number;
    lastActivity: number;
    history: string[]; // Dates of activity
}

export interface LeaderboardEntry {
    rank: number;
    username: string;
    avatar: string;
    xp: number;
    level: number;
    streak: number;
}

export interface Credential {
    id: string;
    trackId: string;
    level: number;
    mintAddress: string;
    image: string;
    verified: boolean;
}

export interface LearningProgressService {
    getProgress(userId: string, courseId: string): Promise<Progress>;
    completeLesson(userId: string, courseId: string, lessonIndex: number): Promise<void>;
    getXP(userId: string): Promise<number>;
    getStreak(userId: string): Promise<StreakData>;
    getLeaderboard(timeframe: 'weekly' | 'monthly' | 'alltime'): Promise<LeaderboardEntry[]>;
    getCredentials(wallet: PublicKey): Promise<Credential[]>;
}

/**
 * Mock implementation of the LearningProgressService.
 * This will be replaced by on-chain calls in the future.
 */
export class MockLearningService implements LearningProgressService {
    private storageKey = 'superteam_academy_progress';

    private getStorage() {
        if (typeof window === 'undefined') return {};
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : {};
    }

    private saveStorage(data: any) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    async getProgress(userId: string, courseId: string): Promise<Progress> {
        const storage = this.getStorage();
        return storage[`progress_${courseId}`] || {
            courseId,
            completedLessons: [],
            isCompleted: false,
            lastAccessed: Date.now()
        };
    }

    async completeLesson(userId: string, courseId: string, lessonIndex: number): Promise<void> {
        const storage = this.getStorage();
        const progress = await this.getProgress(userId, courseId);

        if (!progress.completedLessons.includes(lessonIndex)) {
            progress.completedLessons.push(lessonIndex);
            storage[`progress_${courseId}`] = progress;
            this.saveStorage(storage);
        }
    }

    async getXP(userId: string): Promise<number> {
        const storage = this.getStorage();
        return storage.xp || 0;
    }

    async getStreak(userId: string): Promise<StreakData> {
        const storage = this.getStorage();
        return storage.streak || { currentStreak: 0, lastActivity: 0, history: [] };
    }

    async getLeaderboard(timeframe: 'weekly' | 'monthly' | 'alltime'): Promise<LeaderboardEntry[]> {
        // Return mock leaderboard data
        return [
            { rank: 1, username: 'SolanaKing', avatar: '', xp: 12500, level: 12, streak: 45 },
            { rank: 2, username: 'RustWizard', avatar: '', xp: 10200, level: 11, streak: 30 },
            { rank: 3, username: 'CryZenXs', avatar: '', xp: 4500, level: 7, streak: 7 },
        ];
    }

    async getCredentials(wallet: PublicKey): Promise<Credential[]> {
        const storage = this.getStorage();
        return storage.credentials || [];
    }
}

export const learningService = new MockLearningService();
