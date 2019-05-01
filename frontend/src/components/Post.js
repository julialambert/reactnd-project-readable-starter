import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleUpvote, handleDownvote, handleToggleDeletePost } from '../actions/posts'
import { Link as RouterLink, withRouter } from 'react-router-dom'
import { formatDate } from '../utils/helpers'
import { Card, Typography, CardContent, withStyles } from '@material-ui/core'
import VoteInput from './VoteInput'
import EditDeleteButtons from './EditDeleteButtons'

const styles = () => ({
    card: {
        display: 'flex',
        align: 'center',
        marginLeft: 50,
        marginRight: 50,
    },
    cardDetails: {
        flex: 1
    }
})

class Post extends Component {
    handleUpvote = () => {
        const { dispatch, post } = this.props

        dispatch(handleUpvote(post.id))
    }

    handleDownvote = () => {
        const { dispatch, post } = this.props

        dispatch(handleDownvote(post.id))
    }

    handleDelete = () => {
        const { dispatch, post, history } = this.props
        dispatch(handleToggleDeletePost(post.id))
        history.push("/")
    }

    handleEdit = () => {
        const { post, history } = this.props
        history.push(`/new/${post.id}`)
    }

    render() {
        const { classes, post, isDiv, authedUser, numOfComments } = this.props

        return (
            <Card className={classes.card}>
                <VoteInput voteScore={post.voteScore} onHandleUpvote={this.handleUpvote} onHandleDownvote={this.handleDownvote} />
                <div className={classes.cardDetails}>
                    <CardContent>
                        <Typography component="h2" variant="h4">{post.title}{!isDiv && post.author === authedUser && (<EditDeleteButtons onHandleDelete={this.handleDelete} onHandleEdit={this.handleEdit} />)}</Typography>
                        <Typography variant="subtitle1" color="textSecondary">{`Categoria: ${post.category}`}</Typography>
                        <Typography variant="subtitle1" color="textSecondary">{`Postado por ${post.author} ` + `${formatDate(post.timestamp)}`}</Typography>
                        {!isDiv && <Typography variant="subtitle1" color="textSecondary">{`${numOfComments} Comentários`}</Typography>}
                        <Typography variant="subtitle1" paragraph>{isDiv ? `${post.body.substring(0, 51)}...` : post.body}</Typography>
                        {isDiv ? <Typography variant="subtitle1" color="primary" component={RouterLink} to={`/${post.category}/${post.id}`}>Continua...</Typography> : null}
                    </CardContent>
                </div>
            </Card>
        )
    }
}

const mapStateToProps = ({ posts, comments, authedUser }, { id }) => {
    const post = posts[id]
    const postComments = comments[id]
    return {
        post: post ? post : null,
        numOfComments: postComments ?
            Object.keys(comments[id])
                .filter(commentId => !comments[id][commentId].deleted)
                .length
            : 0,
        authedUser
    }
}

export default withStyles(styles)(withRouter(connect(mapStateToProps)(Post)))