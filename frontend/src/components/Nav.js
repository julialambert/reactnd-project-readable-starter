import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Button, Toolbar } from '@material-ui/core'

const styles = {
    toolbarMain: {
        backgroundColor: '#e6ecf0',
        paddingLeft: 600
    }
}

const Nav = ({ classes }) => {
    return (
        <Toolbar className={classes.toolbarMain}>
            <Button component={Link} to="/" size="small">Home</Button>
            <Button component={Link} to="/new" size="small">What's happening?</Button>
        </Toolbar>
    )
}

export default withStyles(styles)(withRouter(Nav))