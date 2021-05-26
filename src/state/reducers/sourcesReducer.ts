import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";

export enum SourceType {
  TEMPLATE = "template",
  OWNER = "owner",
  CONTRIBUTE = "contribute"
}

export interface ISource {
  type: SourceType;
  lang: string;
  id: string;
  content: string;
}

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
        const { sourceId, source } = action.payload;
        draft.loading = false;
        draft.data[sourceId] = source;
        return draft;
      default:
        return draft;
    }
  },
  initialState
);

export default reducer;
