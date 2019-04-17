import { newPost, voteOnPost, deletePost, editPost } from '../services/ReadableAPI'

export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const ADD_POST = "ADD_POST"
export const UPVOTE_POST = "UPVOTE_POST"
export const DOWNVOTE_POST = "DOWNVOTE_POST"
export const TOGGLE_DELETE_POST = "TOGGLE_DELETE_POST"
export const MODIFY_POST = "MODIFY_POST"

export function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}

export function handleAddPost(post) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        post.author = authedUser

        return newPost(post)
            .then(p => dispatch(addPost(p)))
    }
}

export function toggleDeletePost(id) {
    return {
        type: TOGGLE_DELETE_POST,
        id
    }
}

export function handleToggleDeletePost(id) {
    return dispatch => {
        dispatch(toggleDeletePost(id))

        return deletePost(id)
            .catch(e => {
                console.log("Error:", e.response.data)
                dispatch(toggleDeletePost(id))
                alert("Error deleting the post.")
            })
    }
}

export function modifyPost(modifiedPost) {
    return {
        type: MODIFY_POST,
        modifiedPost
    }
}

export function handleEditPost(oldPost, modifiedPost) {
    return dispatch => {
        dispatch(modifyPost(modifiedPost))

        return editPost(modifiedPost)
            .catch(e => {
                console.log("Error:", e.response.data)
                dispatch(modifyPost(oldPost))
                alert("Error editing the post.")
            })
    }
}

export function receivePosts(posts) {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}

export function handleUpvote(id) {
    return dispatch => {
        dispatch(upvotePost(id))

        return voteOnPost(id, { option: "upVote" })
            .catch(e => {
                console.log("Error:", e.response.data)
                dispatch(downvotePost(id))
                alert("Error upvoting the post.")
            })
    }
}

export function handleDownvote(id) {
    return dispatch => {
        dispatch(downvotePost(id))

        return voteOnPost(id, { option: "downVote" })
            .catch(e => {
                console.log("Error:", e.response.data)
                dispatch(upvotePost(id))
                alert("Error down voting the post.")
            })
    }
}

export function upvotePost(id) {
    return {
        type: UPVOTE_POST,
        id
    }
}

export function downvotePost(id) {
    return {
        type: DOWNVOTE_POST,
        id
    }
}