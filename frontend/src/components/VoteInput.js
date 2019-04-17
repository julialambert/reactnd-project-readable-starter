import React from 'react'
import { IconButton, Typography } from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

const VoteInput = ({ voteScore, onHandleUpvote, onHandleDownvote }) => (
    <div>
        <div>
            <IconButton aria-label="Up" onClick={() => onHandleUpvote()}>
                <KeyboardArrowUpIcon />
            </IconButton>
        </div>
        <Typography variant="subtitle2" align="center" gutterBottom>{voteScore}</Typography>
        <div>
            <IconButton aria-label="Down" onClick={() => onHandleDownvote()}>
                <KeyboardArrowDownIcon />
            </IconButton>
        </div>
    </div>
)

export default VoteInput