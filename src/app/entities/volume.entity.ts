import Article from "./article.entity";

export default interface Volume {
    volume: string,
    issue: string,
    articles: Article[]
}