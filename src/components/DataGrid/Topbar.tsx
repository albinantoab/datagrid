import { createMessage, Messages } from "../../constants";
import { TopbarProps } from "./types";

import styles from "./styles.module.css";
import { useCallback, useEffect, useRef } from "react";
import { ChangeEvent } from "react";

/**
 * Topbar component
 * 
 * @param {TopbarProps} props
 * 
 * @param {(selectedRows: Set<T>) => React.ReactNode} props.customActions
 * @param {boolean} props.isAllSelected
 * @param {Set<T>} props.selectedRows
 * @param {() => void} props.onAllSelect
 * 
 * @returns {React.ReactNode}
 */
const Topbar = <T extends Record<string, unknown>>({
  customActions,
  onSelectAllChange,
  totalSize,
  selectedRows,
  isSelectable = false,
}: TopbarProps<T>) => {
  const ref = useRef<HTMLInputElement>(null);

  /**
   * Handle the change of the select all checkbox
   * 
   * @param {ChangeEvent<HTMLInputElement>} event
   * @returns {void}
   */
  const onSelectAllChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onSelectAllChange?.(event.target.checked);
  }, [onSelectAllChange]);

  /**
   * Set the indeterminate state of the select all checkbox
   * 
   * This cannot be set directly in the HTML.
   * 
   * @returns {void}
   */
  useEffect(function setIndeterminate() {
    if (totalSize && selectedRows && ref.current) {
      ref.current.indeterminate = selectedRows.size > 0 && selectedRows.size < totalSize;
    } else if (ref.current) {
      ref.current.indeterminate = false;
    }
  }, [totalSize, selectedRows, ref]);

  return (
    <div className={styles.Topbar}>
      {isSelectable && (
        <div>
          <input
            ref={ref}
            type="checkbox"
            onChange={onSelectAllChangeHandler}
            checked={totalSize === selectedRows?.size}
            disabled={totalSize === 0}
          />
          <span>{createMessage(Messages.selected, [selectedRows?.size ?? 0])}</span>
        </div>
      )}
      {customActions && (
        <div>
          {customActions(Array.from(selectedRows ?? []))}
        </div>
      )}
    </div>
  );
};

export { Topbar };
