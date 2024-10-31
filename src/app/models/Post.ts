export default interface Post {
    id: string;
    title: string;
    description: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    category: "real" | "fiction" | "meme"
}