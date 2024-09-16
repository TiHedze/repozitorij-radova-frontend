export interface CreateArticleRequest {
    title: string,
    summary: string,
    authorIds: string[],
    url: string,
    year: number
}