import * as actions from '../constants/actions'

const availableColors = ['aquamarine', 'hotpink', 'lightgreen', 'palevioletred', 'bisque']

export const initialState = { oddAnimated: true, cubes: [] }

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case actions.ADD_CUBE:
            return { cubes: [...state.cubes, { id: state.cubes.length, animated: true, color: availableColors[Math.floor(Math.random() * availableColors.length)] } ] }
            break;

        case actions.SHUFFLE:
            return { cubes: state.cubes.sort(() => (0.5 - Math.random()) ) }
            break;

        case actions.STOP_ODD:
            return { cubes: state.cubes.map(circle => circle.id % 2 === 0 ? circle : {...circle, animated: false} ) }
            break;

        case actions.CHANGE_ODD:
            return { cubes: state.cubes.map(circle => { return {...circle, animated: true}} ) }
            break;
        
        case actions.BALL:
            console.log('ypepa');
            const cubes = [...state.cubes]
            cubes[state.cubes.length - 1].ball = true
            return { cubes }
            break;
    
        default:
            return state;
    }
}