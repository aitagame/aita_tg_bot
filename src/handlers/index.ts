import getInfo from './commands/characterInfo/getInfo'
import getResources from './commands/items/getItems'
import registerUser from './commands/register/registerUser'
import actions from './commands/actions/listActions'
import goToCaves from '@handlers/inline_query/action_caves'
import goToForest from '@handlers/inline_query/action_forest'
import getActions from '@handlers/inline_query/get_actions'
import getCharacter from '@handlers/inline_query/get_character'
import getItems from '@handlers/inline_query/get_items'
import actionList from '@handlers/inline_query/getActions'


const commands = {
    getInfo,
    getResources,
    registerUser,
    actions
}

const querys = {
    goToCaves,
    goToForest,
    getActions,
    getCharacter,
    getItems,
    actionList,

}

const handlers = {
    commands,
    querys
}

export default handlers