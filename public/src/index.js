import store from "./store";
import { bugAdded, bugRemoved, bugResolved} from "./actions";

// let unsubscribe = store.subscribe(()=>console.log("changed"))
store.dispatch(bugAdded("bug1"))
store.dispatch(bugAdded("bug2"))
store.dispatch(bugResolved(2))
// unsubscribe()
// store.dispatch(bugRemoved(2))

console.log(store.getState());
