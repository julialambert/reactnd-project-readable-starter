import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { DATE } from '../actions/sortedBy'
import PostGrid from './PostGrid'
import SortBy from './SortBy'
import Categories from './Categories'

const Dashboard = ({ postIds }) => (
    <Fragment>
        <Categories />
        <SortBy />
        <main>
            <PostGrid postIds={postIds} />
        </main>
    </Fragment>
)

const mapStateToProps = ({ posts, sortedBy }) => ({
    postIds: Object.keys(posts)
        .filter(key => !posts[key].deleted)
        .sort((a, b) => sortedBy === DATE
            ? posts[b].timestamp - posts[a].timestamp
            : posts[b].voteScore - posts[a].voteScore)
})

export default connect(mapStateToProps)(Dashboard)
