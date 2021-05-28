import { useCallback, useEffect } from "react";
import { shallowEqual } from "react-redux";
import { useParams } from "react-router";
import CellList from "../components/cell-list";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";

type EditorParams = {
  hash: string;
};

const Editor = () => {
  const { hash } = useParams<EditorParams>();
  const { loadSource, updateCells } = useActions();
  const { loading, source } = useTypedSelector(
    ({ sources: { loading, data } }) => ({
      source: data[hash],
      loading
    }),
    shallowEqual
  );

  const handleRenderCells = useCallback(() => {
    const s = source.commit[source.commit.length - 1];
    updateCells(s.content.data, s.content.order);
  }, [source, updateCells]);

  useEffect(() => {
    if (hash && !loading && source) {
      handleRenderCells();
    }
  }, [handleRenderCells, hash, loading, source]);

  useEffect(() => {
    loadSource(hash);
  }, [hash, loadSource]);

  return <CellList />;
};

export default Editor;
