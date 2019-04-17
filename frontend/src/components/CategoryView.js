import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { DATE } from '../actions/sortedBy'
import SortBy from './SortBy'
import PostGrid from './PostGrid'
import { Typography } from '@material-ui/core'

const CategoryView = ({ category, postIds }) => {
    if (category === null)
        return <p>Não existe essa categoria.</p>

    return (
        <Fragment>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom> {category.name}</Typography>
            <SortBy />
            <main>
                <PostGrid postIds={postIds} />
            </main>
        </Fragment>
    )
}

const mapStateToProps = ({ posts, sortedBy, categories }, props) => {
    const { categoryPath } = props.match.params
    const category = categories.find(category => category.path === categoryPath)

    return {
        category: category ? category : null,
        postIds: Object.keys(posts)
            .filter(key => posts[key].category === categoryPath && !posts[key].deleted)
            .sort((a, b) => sortedBy === DATE
                ? posts[b].timestamp - posts[a].timestamp
                : posts[b].voteScore - posts[a].voteScore)
    }
}

export default connect(mapStateToProps)(CategoryView)