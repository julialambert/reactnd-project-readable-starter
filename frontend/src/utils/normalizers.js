import { normalize, schema } from 'normalizr'

const post = new schema.Entity("posts")
const postsSchema = { posts: [post] }

export const normalizePosts = (posts) => {
    return normalize({ posts }, postsSchema).entities.posts
}

const comment = new schema.Entity("comments")
const commentsSchema = { comments: [comment] }

export const normalizeComments = (comments) => {
    return normalize({ comments }, commentsSchema).entities.comments
}
