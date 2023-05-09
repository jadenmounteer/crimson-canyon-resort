export interface Post {
  id: string;
  userId: string | undefined;
  fileURLs: string[] | undefined;
  title: string;
  message: string;
  createdDate: Number;
}
