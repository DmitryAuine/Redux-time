import ImmutableStateTree from './ImmutableStateTree'

const backActionType = '@@reduxTime/BACK'
const forwardActionType = '@@reduxTime/FORWARD'

export default function reduxTime() {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    let immutableStateTree = new ImmutableStateTree()

    const reduxTimeReducer = (state, action) => {
      let newState;

      switch (action.type) {
        case backActionType:
          newState = immutableStateTree.movePointerBack().getState();
          break
        case forwardActionType:
          newState = immutableStateTree.movePointerForward().getState();
          break
        default:
          newState = reducer(state, action)

          if (newState !== state) {
            immutableStateTree.add(newState)
          }
      }

      return newState
    }

    const store = createStore(reduxTimeReducer, preloadedState, enhancer)

    const back = () => {
      store.dispatch({
        type: backActionType
      });
    }

    const forward = () => {
      store.dispatch({
        type: forwardActionType
      });
    }

    return {
      ...store,

      // Extend store
      back,
      forward
    }
  }
}
