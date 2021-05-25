import { useParams } from "react-router";
import CellList from "../components/cell-list";

type EditorParams = {
  templateId: string;
};

const Editor = () => {
  const { templateId } = useParams<EditorParams>();
  console.log(templateId)
  return <CellList />;
};

export default Editor;
