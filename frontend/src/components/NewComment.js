import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import uuidv4 from 'uuid/v4'
import { TextField, Button, withStyles } from '@material-ui/core'
import { handleAddComment, handleModifyComment } from '../actions/comments'

const styles = theme => ({
    commentForm: {
        marginBottom: 2 * theme.spacing.unit
    },
    cancelButton: {
        marginLeft: theme.spacing.unit
    }
})

class NewComment extends Component {
    state = {
        body: ""
    }

    componentDidMount() {
        const { comment } = this.props

        if (comment)
            this.setState({
                body: comment.body
            })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    addComment = () => {
        const { authedUser, dispatch, parentId } = this.props

        const newComment = {
            id: uuidv4(),
            timestamp: new Date(),
            author: authedUser,
            parentId,
            body: this.state.body
        }

        dispatch(handleAddComment(newComment))
    }

    editComment = () => {
        const { dispatch, comment, onHandleToggleEdit } = this.props

        const modifiedComment = {
            ...comment,
            body: this.state.body
        }

        dispatch(handleModifyComment(comment, modifiedComment))

        onHandleToggleEdit()
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { comment } = this.props

        if (comment)
            this.editComment()
        else
            this.addComment()

        this.setState({ body: "" })
    }

    render() {
        const { classes, comment, onHandleToggleEdit } = this.props
        return (
            <div className={classes.commentForm}>
                <form onSubmit={this.handleSubmit}>
                    <TextField value={this.state.body} onChange={this.handleChange} required id="body" name="body" label={`${comment ? "edit" : "post"} a comment...`} fullWidth margin="normal" variant="outlined" multiline={true} rows={3} />
                    {
                        comment
                            ? (
                                <Fragment>
                                    <Button disabled={!this.state.body} type="submit" variant="contained" color="primary">Salvar</Button>
                                    <Button onClick={() => onHandleToggleEdit()} className={classes.cancelButton} variant="contained">Cancelar</Button>
                                </Fragment>
                            )
                            : (
                                <Button disabled={!this.state.body} type="submit" variant="contained" color="primary">Comentar</Button>
                            )
                    }
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({ authedUser, comments }, { parentId, id }) => ({
    authedUser,
    comment: comments[parentId] && comments[parentId][id]
        ? comments[parentId][id] : null
})

export default withStyles(styles)(connect(mapStateToProps)(NewComment))