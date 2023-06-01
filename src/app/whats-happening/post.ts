export interface Post {
  id: string;
  userId: string | undefined;
  fileURLs: String[] | undefined;
  message: string;
  createdDate: number;
  createdByUserName: string | undefined | null;
}
