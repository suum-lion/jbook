import "./index.css";
import { useActions } from "../../hooks/use-actions";
import { FC, useEffect } from "react";
import { useTypedSelector } from "../../hooks/use-typed-selector";

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: FC<AddCellProps> = ({ previousCellId, forceVisible }) => {
  const { insertCellAfter, loadSource } = useActions();
  const { loading, source } = useTypedSelector(
    ({ sources: { loading, data } }) => ({
      source: data["2eec3696-34ed-4557-877a-603a77811470"],
      loading
    })
  );

  useEffect(() => {
    if (!loading && source) {
      console.log(source);
    }
  }, [loading, source]);

  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons">
        <button
          type="button"
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previousCellId, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span className="mr-1">Code</span>
        </button>
        <button
          type="button"
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previousCellId, "text")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span className="mr-1">Text</span>
        </button>
        <button
          type="button"
          className="button is-rounded is-primary is-small"
          onClick={() => loadSource("2eec3696-34ed-4557-877a-603a77811470")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span className="mr-1">Source</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
