

export type BlogPost = {
  id: string;
  title: string;
  author: string;
  content: string;
  createdAt: string;
  comments?: BlogComment[];
};


export type BlogComment = {
  id: string;
  author?: string;
  content: string;
  createdAt?: string;
};