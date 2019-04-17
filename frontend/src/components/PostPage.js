import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import Post from './Post'
import Header from './Header'
import NewComment from './NewComment'
import CommentList from './CommentList'
import { handleReceiveComments } from '../actions/comments'

const styles = theme => ({
    commentSection: {
        marginTop: 2 * theme.spacing.unit
    }
})

class PostPage extends Component {
    componentDidMount() {
        const { commentIds, dispatch } = this.props
        const { id } = this.props.match.params

        if (commentIds == null)
            dispatch(handleReceiveComments(id))
    }

    render() {
        const { classes, commentIds, postExists } = this.props
        const { id } = this.props.match.params

        if (!postExists)
            return <p>Postagem não existe.</p>

        return (
            <div>
                <Post id={id} />
                <div className={classes.commentSection}>
                    <Header text={"Sessão de comentarios"} />
                    <NewComment parentId={id} />
                    {commentIds !== null && <CommentList commentIds={commentIds} parentId={id} />}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ comments, posts }, props) => {
    const { id, category } = props.match.params
    const postComments = comments[id]

    return {
        postExists: posts[id]
            && !posts[id].deleted
            && posts[id].category === category,
        commentIds: postComments ?
            Object.keys(comments[id])
                .filter(commentId => !comments[id][commentId].deleted)
                .sort((a, b) => comments[id][b].timestamp - comments[id][a].timestamp)
            : null
    }
}

export default withStyles(styles)(connect(mapStateToProps)(PostPage))