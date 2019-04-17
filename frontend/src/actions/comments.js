import { newComment, editComment, deleteComment, getPostComments, voteOnComment } from '../services/ReadableAPI'

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS"
export const ADD_COMMENT = "ADD_COMMENT"
export const MODIFY_COMMENT = "MODIFY_COMMENT"
export const TOGGLE_DELETE_COMMENT = "TOGGLE_DELETE_COMMENT"
export const UPVOTE_COMMENT = "UPVOTE_COMMENT"
export const DOWNVOTE_COMMENT = "DOWNVOTE_COMMENT"

export function receiveComments(parentId, comments) {
    return {
        type: RECEIVE_COMMENTS,
        parentId,
        comments
    }
}

export function handleReceiveComments(parentId) {
    return dispatch => {
        return getPostComments(parentId)
            .then(comments => dispatch(
                receiveComments(parentId, comments)))
    }
}

export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export function handleAddComment(comment) {
    return dispatch => {
        return newComment(comment)
            .then(c => dispatch(addComment(c)))
    }
}

export function modifyComment(modifiedComment) {
    return {
        type: MODIFY_COMMENT,
        modifiedComment
    }
}

export function handleModifyComment(oldComment, modifiedComment) {
    return dispatch => {
        dispatch(modifyComment(modifiedComment))
        return editComment(modifiedComment)
            .catch(e => {
                console.log("Erro:", e.response.data)
                dispatch(modifyComment(oldComment))
                alert("Erro ao editar o comentário.")
            })
    }
}

export function toggleDeleteComment(parentId, id) {
    return {
        type: TOGGLE_DELETE_COMMENT,
        parentId,
        id
    }
}

export function handleToggleDeleteComment(parentId, id) {
    return dispatch => {
        dispatch(toggleDeleteComment(parentId, id))
        return deleteComment(id)
            .catch(e => {
                console.log("Erro:", e.response.data)
                dispatch(toggleDeleteComment(parentId, id))
                alert("Erro ao deletar o comentário.")
            })
    }
}

export function upvoteComment(parentId, id) {
    return {
        type: UPVOTE_COMMENT,
        parentId,
        id
    }
}

export function handleUpvoteComment(parentId, id) {
    return dispatch => {
        dispatch(upvoteComment(parentId, id))
        return voteOnComment(id, { option: "upVote" })
            .catch(e => {
                console.log("Erro:", e.response.data)
                dispatch(downvoteComment(parentId, id))
                alert("Erro upvoting o comentário.")
            })
    }
}

export function downvoteComment(parentId, id) {
    return {
        type: DOWNVOTE_COMMENT,
        parentId,
        id
    }
}

export function handleDownvoteComment(parentId, id) {
    return dispatch => {
        dispatch(downvoteComment(parentId, id))
        return voteOnComment(id, { option: "downVote" })
            .catch(e => {
                console.log("Erro:", e.response.data)
                dispatch(upvoteComment(parentId, id))
                alert("Erro downvoting o comentário.")
            })
    }
}