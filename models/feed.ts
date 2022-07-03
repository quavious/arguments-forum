import { Feed, SubFeed } from '@prisma/client';

export interface FeedCreateForm {
  content: string;
  newsTitle: string;
  newsLink: string;
}

export interface FeedUpdateForm {
  content: string;
}

export interface FeedModel extends Omit<Omit<Feed, 'createdAt'>, 'updatedAt'> {
  createdAt: string;
  updatedAt?: string;
  subFeed: number;
  userId: '';
}

export interface SubFeedModel
  extends Omit<Omit<SubFeed, 'createdAt'>, 'updatedAt'> {
  createdAt: string;
  updatedAt?: string;
  userId: '';
}

export interface SubFeedCreateForm {
  content: string;
  feedId: string;
}
