import React, { Fragment } from 'react'
import Comment from './Comment'

const CommentList = ({ commentIds, parentId }) => (
    <Fragment>
        {commentIds.map(id =>
            <Comment key={id} id={id} parentId={parentId} />)}
    </Fragment>
)

export default CommentList