import { getInitialData } from '../services/ReadableAPI'
import { receiveCategories } from './categories'
import { receivePosts } from './posts'
import { setAuthedUser } from './authedUser'

const AUTHED_ID = "julia"

export function handleInitialData() {
    return dispatch => {
        getInitialData()
            .then(({ categories, posts }) => {
                dispatch(receiveCategories(categories))
                dispatch(receivePosts(posts))
                dispatch(setAuthedUser(AUTHED_ID))
            })
    }
}