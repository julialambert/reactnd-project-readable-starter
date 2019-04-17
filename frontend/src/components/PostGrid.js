import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import Post from './Post'

const PostGrid = ({ postIds }) => (
    postIds.length > 0
        ? <Grid container spacing={40}>{postIds.map(id => (
            <Grid item key={id} xs={12} md={6}>
                <Post id={id} isGrid={true} />
            </Grid>
        ))}
        </Grid>
        : <Typography component="h4" variant="h5" align="center">Nenhuma postagem encontrada</Typography>
)

export default PostGrid