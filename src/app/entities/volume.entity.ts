import Article from "./article.entity";

export default interface Volume {
    id: string,
    volume: string,
    issue: string,
    articles: Article[]
}