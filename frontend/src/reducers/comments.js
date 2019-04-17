import { RECEIVE_COMMENTS, ADD_COMMENT, MODIFY_COMMENT, UPVOTE_COMMENT, DOWNVOTE_COMMENT, TOGGLE_DELETE_COMMENT } from "../actions/comments"

export default function comments(state = {}, action) {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return {
                ...state,
                [action.parentId]: {
                    ...action.comments
                }
            }
        case ADD_COMMENT:
            const { comment } = action
            return {
                ...state,
                [comment.parentId]: {
                    ...state[comment.parentId],
                    [comment.id]: {
                        ...comment
                    }
                }
            }
        case MODIFY_COMMENT:
            const { modifiedComment } = action
            return {
                ...state,
                [modifiedComment.parentId]: {
                    ...state[modifiedComment.parentId],
                    [modifiedComment.id]: {
                        ...modifiedComment
                    }
                }
            }
        case TOGGLE_DELETE_COMMENT:
            return {
                ...state,
                [action.parentId]: {
                    ...state[action.parentId],
                    [action.id]: {
                        ...state[action.parentId][action.id],
                        deleted: !state[action.parentId][action.id].deleted
                    }
                }
            }
        case UPVOTE_COMMENT:
            return {
                ...state,
                [action.parentId]: {
                    ...state[action.parentId],
                    [action.id]: {
                        ...state[action.parentId][action.id],
                        voteScore: state[action.parentId][action.id].voteScore + 1
                    }
                }
            }
        case DOWNVOTE_COMMENT:
            return {
                ...state,
                [action.parentId]: {
                    ...state[action.parentId],
                    [action.id]: {
                        ...state[action.parentId][action.id],
                        voteScore: state[action.parentId][action.id].voteScore - 1
                    }
                }
            }
        default:
            return state
    }
}
