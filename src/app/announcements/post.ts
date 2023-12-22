export interface Post {
  id: string;
  userId: string | undefined;
  title: string;
  fileURLs: String[] | undefined;
  videoURLs: String[] | undefined;
  message: string;
  createdDate: number;
  createdByUserName: string | undefined | null;
  createdByUserEmail: string | undefined | null;
  emailsToNotify: string[] | undefined;
  comments: Comment[] | undefined;
}

export interface Comment {
  id: string;
  userId: string | undefined;
  message: string;
  createdDate: number;
  createdByUserName: string | undefined | null;
}
