// Reactotron.config.js
import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

export default Reactotron
  .configure({
    name: 'MyAwesomeApp'
  })
  .use(reactotronRedux())
  // add other devtools here
  .connect()