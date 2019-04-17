import { combineReducers } from 'redux'
import authedUser from './authedUser'
import categories from './categories'
import posts from './posts'
import comments from './comments'
import sortedBy from './sortedBy'

export default combineReducers({
    authedUser,
    categories,
    posts,
    comments,
    sortedBy
})