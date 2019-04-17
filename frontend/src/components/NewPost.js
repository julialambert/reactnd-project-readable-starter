import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import uuidv4 from 'uuid/v4'
import { handleAddPost, handleEditPost } from '../actions/posts'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, TextField, FormControl, InputLabel, Select, OutlinedInput, MenuItem, Button } from '@material-ui/core'
import Header from './Header'

const styles = theme => ({
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 10,
        marginRight: theme.spacing.unit * 10,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3,
        }
    },
    categoryInput: {
        marginTop: theme.spacing.unit * 2
    },
    sendButton: {
        marginTop: theme.spacing.unit * 3
    }
})

class NewPost extends Component {
    state = {
        title: "",
        body: "",
        category: ""
    }

    componentDidMount() {
        const { post } = this.props

        if (post)
            this.setState({
                title: post.title,
                body: post.body,
                category: post.category
            })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    addPost = () => {
        const { dispatch, authedUser } = this.props

        const newPost = {
            id: uuidv4(),
            timestamp: new Date(),
            title: this.state.title,
            body: this.state.body,
            category: this.state.category,
            author: authedUser
        }

        dispatch(handleAddPost(newPost))
    }

    editPost = () => {
        const { dispatch, post } = this.props

        const modifiedPost = {
            ...post,
            title: this.state.title,
            body: this.state.body,
            category: this.state.category
        }

        dispatch(handleEditPost(post, modifiedPost))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { post, history } = this.props

        if (post)
            this.editPost()
        else
            this.addPost()

        this.setState({
            title: "",
            body: "",
            category: ""
        })

        history.push("/")
    }

    render() {
        const { classes, categories } = this.props

        return (
            <Paper className={classes.paper}>
                <Header text={"Novo post"} />
                <form onSubmit={this.handleSubmit}>
                    <Grid container direction="column" justify="center">
                        <TextField value={this.state.title} onChange={this.handleChange} required id="title" name="title" label="title" fullWidth margin="normal" variant="outlined" />
                        <TextField value={this.state.body} onChange={this.handleChange} required id="body" name="body" label="body" fullWidth margin="normal" variant="outlined" multiline={true} rows={8} />
                        <FormControl className={classes.categoryInput} variant="outlined">
                            <InputLabel htmlFor="category">Categoria</InputLabel>
                            <Select value={this.state.category} onChange={this.handleChange}
                                input={
                                    <OutlinedInput labelWidth={64} name="category" id="category" />
                                }>
                                <MenuItem value=""><em>Nenhum</em></MenuItem>
                                {categories.map(category =>
                                    <MenuItem key={category.path} value={category.path}>{category.name}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <Button className={classes.sendButton} disabled={!this.state.title || !this.state.body || !this.state.category} type="submit" variant="contained" color="primary">Enviar</Button>
                    </Grid>
                </form>
            </Paper>
        )
    }
}

const mapStateToProps = ({ authedUser, categories, posts }, props) => {
    const { id } = props.match.params
    const post = posts[id] ? posts[id] : null

    return {
        authedUser,
        categories,
        post
    }
}

export default withStyles(styles)(withRouter(connect(mapStateToProps)(NewPost)))