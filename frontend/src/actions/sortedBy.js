export const VOTE_SCORE = "VOTE_SCORE"
export const DATE = "DATE"

export const SORT_BY = "SORT_BY"

export function setSortedBy(sortBy) {
    return {
        type: SORT_BY,
        sortBy
    }
}