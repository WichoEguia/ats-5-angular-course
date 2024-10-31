export default interface Post {
    id: string;
    title: string;
    description: string;
    image: string;
    date: Date;
    category: "real" | "fiction" | "meme"
}