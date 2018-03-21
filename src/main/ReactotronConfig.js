// Reactotron.config.js
import Reactotron, { asyncStorage, networking } from "reactotron-react-native"
import { reactotronRedux } from "reactotron-redux"

export default Reactotron.configure({
  name: "Udacicards"
})
  .use(asyncStorage())
  .use(networking())
  .use(reactotronRedux())
  // add other devtools here
  .connect()
