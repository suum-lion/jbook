import { Dispatch } from "react";
import bundle from "../../bundler";
import { ActionType } from "../action-types";
import {
  Action,
  DeleteCellAction,
  Direction,
  insertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
  UpdateCellsAction
} from "../actions";
import { requestLoadSource } from "../apis";
import { Cell, CellTypes } from "../cell";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content
    }
  };
};

export const updateCells = (
  data: {
    [key: string]: Cell;
  },
  order: string[]
): UpdateCellsAction => {
  return {
    type: ActionType.UPDATE_CELLS,
    payload: {
      data,
      order
    }
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction
    }
  };
};

export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes
): insertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType
    }
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId
      }
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result
      }
    });
  };
};

export const loadSource = (hash: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOAD_SOURCE_START
    });

    const result = await requestLoadSource(hash);

    dispatch({
      type: ActionType.LOAD_SOURCE_COMPLETE,
      payload: {
        hash,
        source: result
      }
    });
  };
};
