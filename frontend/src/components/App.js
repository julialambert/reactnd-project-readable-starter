import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Nav from './Nav'
import Dashboard from './Dashboard'
import NewPost from './NewPost'
import PostPage from './PostPage'
import CategoryView from './CategoryView'

const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    }
})

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        const { classes } = this.props

        return (
            <Router>
                <Fragment>
                    <CssBaseline />
                    <div className={classes.layout}>
                        <Nav />
                        {this.props.loading === true
                            ? null
                            : <Fragment>
                                <Route path="/" exact component={Dashboard} />
                                <Route path="/new/:id?" exact component={NewPost} />
                                <Route path="/:category/:id" exact component={PostPage} />
                                <Route path="/:categoryPath" exact component={CategoryView} />
                            </Fragment>
                        }
                    </div>
                </Fragment>
            </Router>
        )
    }
}

const mapStateToProps = ({ authedUser }) => ({
    loading: authedUser === null
})

export default withStyles(styles)((connect(mapStateToProps)(App)))