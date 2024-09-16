export interface SearchArticlesRequest {
    publicationName?: string | undefined,
    summaryText?: string | undefined,
    volumeName?: string | undefined,
    authorName?: string | undefined,
    articleName?: string | undefined,
    year?: number | undefined
}