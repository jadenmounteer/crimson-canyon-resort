export interface Post {
  id: string;
  userId: string | undefined;
  fileURLs: string[] | undefined;
  message: string;
  createdDate: number;
  createdByUserName: string | undefined | null;
}
