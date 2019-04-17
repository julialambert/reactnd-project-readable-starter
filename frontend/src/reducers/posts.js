import { RECEIVE_POSTS, ADD_POST, UPVOTE_POST, DOWNVOTE_POST, TOGGLE_DELETE_POST, MODIFY_POST } from '../actions/posts'

export default function (state = {}, action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            return action.posts
        case ADD_POST:
            return {
                ...state,
                [action.post.id]: {
                    ...action.post
                }
            }
        case UPVOTE_POST:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    voteScore: state[action.id].voteScore + 1
                }
            }
        case DOWNVOTE_POST:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    voteScore: state[action.id].voteScore - 1
                }
            }
        case TOGGLE_DELETE_POST:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    deleted: !state[action.id].deleted
                }
            }
        case MODIFY_POST:
            return {
                ...state,
                [action.modifiedPost.id]: {
                    ...action.modifiedPost
                }
            }
        default:
            return state
    }
}