import React from 'react'
import { Typography, withStyles } from '@material-ui/core'

const styles = () => ({
    formHeader: {
        borderBottom: `1px solid #000`
    }
})

const Header = ({ text, classes }) => (
    <Typography className={classes.formHeader} variant="h6" gutterBottom>{text}</Typography>
)

export default withStyles(styles)(Header)