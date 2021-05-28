import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { ISource } from "../source";
interface SourcesState {
  loading: boolean;
  error: string | null;
  data: {
    [key: string]: ISource;
  };
}

const initialState: SourcesState = {
  loading: false,
  error: null,
  data: {}
};

const reducer = produce(
  (draft: SourcesState = initialState, action: Action): SourcesState => {
    switch (action.type) {
      case ActionType.LOAD_SOURCE_START:
        draft.loading = true;
        return draft;
      case ActionType.LOAD_SOURCE_COMPLETE:
        const { hash, source } = action.payload;
        draft.loading = false;
        draft.data[hash] = source;
        return draft;
      default:
        return draft;
    }
  },
  initialState
);

export default reducer;
