// is really just responsible for deciding whether or not a user is currently logged in
// 
import { FETCH_USER } from '../actions/types';
export default function(state = null, action ) {
    // console.log(action);   // test if current_user was returned
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}
