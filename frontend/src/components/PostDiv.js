import React from 'react'
import { Typography } from '@material-ui/core'
import Post from './Post'

const PostDiv = ({ postIds }) => (
    postIds.length > 0
        ? <div>{postIds.map(id => (
            <div item key={id} xs={12} md={6}>
                <Post id={id} isDiv={true} />
            </div>
        ))}
        </div>
        : <Typography component="h4" variant="h5" align="center">Nenhuma postagem encontrada</Typography>
)

export default PostDiv