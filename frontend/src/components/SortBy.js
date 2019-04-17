import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setSortedBy } from '../actions/sortedBy'
import { VOTE_SCORE, DATE } from '../actions/sortedBy'
import { Toolbar, InputLabel, Select, MenuItem, withStyles } from '@material-ui/core'

const styles = theme => ({
    inlineLabel: {
        marginRight: theme.spacing.unit
    }
})

class SortBy extends Component {
    handleSort = (e) => {
        let sortBy = e.target.value
        this.props.dispatch(setSortedBy(sortBy))
    }
    render() {
        const { classes } = this.props
        return (
            <Toolbar>
                <InputLabel htmlFor="sortBy" className={classes.inlineLabel}>Sort by:</InputLabel>
                <Select value={this.props.sortedBy} onChange={this.handleSort}
                    inputProps={{
                        name: 'sortBy',
                        id: 'sortBy'
                    }}>
                    <MenuItem value={VOTE_SCORE}>Pontuação</MenuItem>
                    <MenuItem value={DATE}>Data</MenuItem>
                </Select>
            </Toolbar>
        )
    }
}

const mapStateToProps = ({ sortedBy }) => ({ sortedBy })

export default withStyles(styles)(connect(mapStateToProps)(SortBy))
