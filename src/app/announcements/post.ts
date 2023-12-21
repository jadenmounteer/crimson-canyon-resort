export interface Post {
  id: string;
  userId: string | undefined;
  title: string;
  fileURLs: String[] | undefined;
  videoURLs: String[] | undefined;
  message: string;
  createdDate: number;
  createdByUserName: string | undefined | null;
}
