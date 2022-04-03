/*
 * Copyright 2019 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createIdMapFromList, mapDomainObjectToView } from 'util/ImmutableCollectionOperations';
import DomainObjectView from 'domain/DomainObjectView';
import { Spot } from 'domain/Spot';
import { Map } from 'immutable';
import { ActionType, SpotList, SpotAction } from './types';

export const initialState: SpotList = {
  isLoading: true,
  spotMapById: Map<number, DomainObjectView<Spot>>(),
};

const spotReducer = (state = initialState, action: SpotAction): SpotList => {
  switch (action.type) {
    case ActionType.SET_SPOT_LIST_LOADING: {
      return { ...state, isLoading: action.isLoading };
    }
    case ActionType.ADD_SPOT:
    case ActionType.UPDATE_SPOT: {
      return { ...state,
        spotMapById: state.spotMapById.set(action.spot.id as number,
          mapDomainObjectToView(action.spot)) };
    }
    case ActionType.REMOVE_SPOT: {
      return { ...state, spotMapById: state.spotMapById.remove(action.spot.id as number) };
    }
    case ActionType.REFRESH_SPOT_LIST: {
      return { ...state, spotMapById: createIdMapFromList(action.spotList) };
    }
    default:
      return state;
  }
};

export default spotReducer;
