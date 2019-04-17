import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Button, Toolbar } from '@material-ui/core'

const styles = theme => ({
    toolbarMain: {
        borderBottom: `1px solid ${theme.palette.grey[300]}`
    }
})

const Nav = ({ classes }) => {
    return (
        <Toolbar className={classes.toolbarMain}>
            <Button component={Link} to="/" size="small">Home</Button>
            <Button component={Link} to="/new" size="small">Novo Post</Button>
        </Toolbar>
    )
}

export default withStyles(styles)(withRouter(Nav))