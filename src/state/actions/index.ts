import { ActionType } from "../action-types";
import { CellTypes } from "../cell";
import { ISource } from "../reducers/sourcesReducer";

export type Direction = "up" | "down";
export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}

export interface insertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export interface LoadSourceStartAction {
  type: ActionType.LOAD_SOURCE_START;
}

export interface LoadSourceCompleteAction {
  type: ActionType.LOAD_SOURCE_COMPLETE;
  payload: {
    sourceId: string;
    source: ISource;
  };
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | insertCellAfterAction
  | UpdateCellAction
  | BundleStartAction
  | BundleCompleteAction
  | LoadSourceStartAction
  | LoadSourceCompleteAction;
