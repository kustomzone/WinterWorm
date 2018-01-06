// @flow
import { assocPath } from 'ramda';

import { queuePath } from '../events';

import type { GameState, Script } from '../types';

const initEvents: Script = (state: GameState): GameState =>
  assocPath(queuePath, {}, state);

export default initEvents;
