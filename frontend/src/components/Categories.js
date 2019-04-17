import React from 'react'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Toolbar, Link, withStyles } from '@material-ui/core'

const styles = () => ({
    toolbarSecondary: {
        justifyContent: 'space-between'
    }
})

const Categories = ({ classes, categories }) => (
    <Toolbar variant="dense" className={classes.toolbarSecondary}>
        {categories.map(category => (
            <Link key={category.name} color="inherit" component={RouterLink} to={`/${category.path}`} variant="body2">{category.name}</Link>
        ))}
    </Toolbar>
)

const mapStateToProps = ({ categories }) => ({
    categories
})

export default withStyles(styles)(connect(mapStateToProps)(Categories))