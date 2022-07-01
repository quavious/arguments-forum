import { Feed } from '@prisma/client';

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
  subFeed: number;
}
