export interface PostData {
  title: string;
  author: string;
  trip: string;
  location: string;
  content: string;
  status: string;
  tags: string[];
  readTime: string;
  featured: boolean;
  coverImage: File | null;
  createdDate: string;
}

export interface IUserAvatar {
  _id: string;
  url: string;
}

export interface IUser {
  _id: string;
  userId: string;
  fullName: string;
  dob: string;
  phone: string;
  address: string;
  avatar: IUserAvatar;
  lastLoginAt: string | null;
  flaggedCount: number;
  banReason: string | null;
  bannedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IBlogPost {
  _id: string;
  title: string;
  createdBy: IUser;
  avatarUser: string;
  summary: string;
  destination: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  status: "APPROVED" | "PENDING" | "REJECTED";
  flags: number;
  createdAt: string;
  updatedAt: string;
}

export interface IBlogQuery {
  title: string;
  slug: string;
  content: string;
  summary: string;
  tags: string[];
  tripId: string;
  file: File | null;
  userId: string;
}

export interface IBlogRes {
  _id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  tags: string[];
  coverImage: string;
  tripId: string;
  createdBy: string;
  updatedBy: string;
  likes: string[];
  status: "APPROVED" | "PENDING" | "REJECTED";
  flags: string[];
  metrics: {
    viewCount: number;
    likeCount: number;
    commentCount: number;
  };
  comments: any[];
  createdAt: string;
  updatedAt: string;
}

export interface IFlag {
  reason: string;
  date: string;
}

export interface IBlogDetail {
  title: string;
  content: string;
  createdBy: IUser;
  summary: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  coverImage: string;
  tripId: string | null;
  flags: IFlag[];
}
