interface RepeatSetting {
	type: 'daily' | 'weekly' | 'monthly' | 'custom';
	interval: number;
	endDate?: Date;
}

interface NotificationSetting {
	enabled: boolean;
	timeBefore: number; // 分単位
}

export interface Schedule {
	id: string;
	title: string;
	oshiId: string;
	startDateTime: Date;
	endDateTime?: Date;
	fullDay?: boolean; // 全日イベントかどうか
	location?: string;
	memo?: string;
	category: 'live' | 'stream' | 'event' | 'release' | 'other';
	notification?: NotificationSetting;
	repeatSetting?: RepeatSetting;
}
