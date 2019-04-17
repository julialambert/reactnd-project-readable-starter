import { SORT_BY, VOTE_SCORE } from '../actions/sortedBy'

export default function sortedBy(state = VOTE_SCORE, action) {
    switch (action.type) {
        case SORT_BY:
            return action.sortBy
        default:
            return state
    }
}