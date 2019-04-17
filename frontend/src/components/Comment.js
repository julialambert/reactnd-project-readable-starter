import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Typography, CardContent, withStyles } from '@material-ui/core'
import { formatDate } from '../utils/helpers'
import { handleUpvoteComment, handleDownvoteComment, handleToggleDeleteComment } from '../actions/comments'
import VoteInput from './VoteInput'
import EditDeleteButtons from './EditDeleteButtons'
import NewComment from './NewComment'

const styles = theme => ({
    card: {
        display: 'flex',
        marginBottom: 2 * theme.spacing.unit
    },
    cardDetails: {
        flex: 1
    }
})

class Comment extends Component {
    state = {
        editing: false
    }

    handleUpvote = () => {
        const { dispatch, comment } = this.props

        dispatch(handleUpvoteComment(comment.parentId, comment.id))
    }

    handleDownvote = () => {
        const { dispatch, comment } = this.props

        dispatch(handleDownvoteComment(comment.parentId, comment.id))
    }

    handleDelete = () => {
        const { dispatch, comment } = this.props

        dispatch(handleToggleDeleteComment(comment.parentId, comment.id))
    }

    handleToggleEdit = () => {
        this.setState((prevstate) => ({ editing: !prevstate.editing }))
    }

    render() {
        const { comment, classes, authedUser } = this.props

        return (
            <Card className={classes.card}>
                <VoteInput voteScore={comment.voteScore} onHandleUpvote={this.handleUpvote} onHandleDownvote={this.handleDownvote} />
                <div className={classes.cardDetails}>
                    <CardContent>
                        <Typography variant="caption" color="textSecondary">
                            {`Posted by ${comment.author} ${formatDate(comment.timestamp)}`}
                            {authedUser === comment.author
                                && !this.state.editing
                                && <EditDeleteButtons
                                    onHandleDelete={this.handleDelete}
                                    onHandleEdit={this.handleToggleEdit} />}
                        </Typography>
                        {
                            this.state.editing
                                ? <NewComment id={comment.id} parentId={comment.parentId} onHandleToggleEdit={this.handleToggleEdit} />
                                : <Typography variant="subtitle2" paragraph> {comment.body}</Typography>
                        }
                    </CardContent>
                </div>
            </Card>
        )
    }
}

const mapStateToProps = ({ authedUser, comments }, { id, parentId }) => ({
    authedUser,
    comment: comments[parentId][id]
})

export default withStyles(styles)(connect(mapStateToProps)(Comment))