import { Cell } from "./cell";

export type SourceType = "template" | "training";

export interface ICommitNode {
  parent: string;
  hash: string;
  author: string;
  content: {
    data: {
      [key: string]: Cell;
    };
    order: string[];
  };
}

export interface ISource {
  type: SourceType;
  id: string;
  hash: string;
  branch: string;
  author: string;
  commit: ICommitNode[];
}
