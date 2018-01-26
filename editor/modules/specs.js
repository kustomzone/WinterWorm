import { view, lensPath, over } from 'ramda';
import { createSelector } from 'reselect';

import { symbols } from '../constants';

const ADD_SPEC = 'specs/ADD_SPEC';

// Action Creators
export const setSpec = spec => dispatch => dispatch({
  type: ADD_SPEC,
  payload: spec,
});

const scenePath = [symbols.SCENES];
const typePathMap = {
  [symbols.SCENES]: scenePath,
};

const getSpecs = state => state.specs;
const getPropSpecType = (_, ownProps) => ownProps.specType;

export const getSpecsOfType = createSelector(
  [getSpecs, getPropSpecType],
  (allSpecs, type) => view(lensPath(typePathMap[type]), allSpecs)
);

const conjoin = obj2 => obj1 => Object.assign({}, obj1, obj2);
const setSpecInState = (state, spec) => over(
  lensPath(typePathMap[spec.type]),
  conjoin({ [spec.options.id]: spec.options }),
  state
);

// const INITIAL_STATE = [
//   { type: symbols.SCENES, options: scenes.levelOne },
//   { type: symbols.SCENES, options: scenes.levelOneLoader },
//   { type: symbols.CURRENT_SCENE, options: scenes.levelOneLoader.id },
//   { type: symbols.SCRIPTS,
//     options: scripts.setSceneSystemSpecs(scenes.levelOneLoader.id, {
//       [scenes.loader.id]: scenes.loader,
//     }) },
// ];

const INITIAL_STATE = {
  [symbols.CURRENT_SCENE]: null,
  [symbols.SCENES]: {},
};

export default function specs(state = INITIAL_STATE, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case ADD_SPEC: return setSpecInState(state, payload);
    default: return state;
  }
}
