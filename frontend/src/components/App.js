import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Nav from './Nav'
import Dashboard from './Dashboard'
import NewPost from './NewPost'
import PostPage from './PostPage'
import CategoryView from './CategoryView'

const styles = {
    home: {
        backgroundColor: '#e6ecf0',
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 350
    }
}

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        const { classes } = this.props

        return (
            <Router>
                <Fragment>
                    <Nav />
                    <div className={classes.home}>
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