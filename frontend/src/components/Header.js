import React from 'react'
import { Typography, withStyles } from '@material-ui/core'


const Header = ({ text }) => (
    <Typography variant="h6" gutterBottom>{text}</Typography>
)

export default withStyles(Header)