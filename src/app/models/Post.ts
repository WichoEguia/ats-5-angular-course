import PostCategory from "./PostCategory";

export default interface Post {
    id?: string;
    title: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt?: string;
    category: PostCategory
}