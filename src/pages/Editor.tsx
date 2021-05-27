import { useEffect } from "react";
import { shallowEqual } from "react-redux";
import { useParams } from "react-router";
import CellList from "../components/cell-list";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";

type EditorParams = {
  templateId: string;
};

const Editor = () => {
  const { templateId } = useParams<EditorParams>();
  const { loadSource, insertCellAfter, updateCell } = useActions();
  const { loading, source } = useTypedSelector(
    ({ sources: { loading, data } }) => ({
      source: data[templateId],
      loading
    }),
    shallowEqual
  );

  useEffect(() => {
    if (templateId && loading) {
      insertCellAfter(templateId, "code");
    }
    if (templateId && !loading && source) {
      updateCell(templateId, source.content);
    }
  }, [insertCellAfter, loading, source, templateId, updateCell]);

  useEffect(() => {
    loadSource(templateId);
  }, [loadSource, templateId]);

  return <CellList />;
};

export default Editor;
