import { createStore, applyMiddleware }  from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

//Will use this at entry point of our application.
export default function configureStore(initialState){
    //initialise store with some state;

    return createStore(
      rootReducer,
      initialState,
      applyMiddleware(reduxImmutableStateInvariant(), thunk)
    );

}
