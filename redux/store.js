import {createStore} from 'redux'
import reviewEditor from './reducers/reviewEditor'

const store = createStore(reviewEditor);

export default store