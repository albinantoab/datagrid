import { useCallback, useMemo, useState } from "react";

import { Topbar } from "./Topbar";
import { DataGridColumn, DataGridProps } from "./types";

import styles from "./styles.module.css";

/**
 * DataGrid component
 * 
 * @param {DataGridProps} props
 * 
 * @param {Array<T>} props.data
 * @param {Array<DataGridColumn>} props.columns
 * @param {string} props.uniqueKey
 * @param {boolean} props.isSelectable
 * @param {(row: T) => boolean} props.isRowSelectable
 * @param {TopbarProps<T>} props.topbarProps
 * 
 * @returns {React.ReactNode}
 */
const DataGrid = <T extends Record<string, unknown>>({ 
    data,
    columns,
    uniqueKey,
    isSelectable = false,
    isRowSelectable,
    topbarProps,
}: DataGridProps<T>) => {

  const [selectedRows, setSelectedRows] = useState<Set<T>>(new Set());

  /**
   * Add a select column to the data if isSelectable is true
   * 
   * @returns {T[]}
   */
  const dataWithSelectable = useMemo(() => isSelectable ? data.map((row: T) => ({ select: false, ...row })) : data, [data, isSelectable]);

  /**
   * Select all rows
   * 
   * @param {boolean} value
   * 
   * @returns {void}
   */
  const onSelectAllChange = useCallback((value: boolean) => {
    if (value) {
      setSelectedRows(new Set(dataWithSelectable.filter((row: T) => isRowSelectable?.(row))));
    } else {
      setSelectedRows(new Set());
    }
  }, [dataWithSelectable, isRowSelectable]);

  /**
   * Select a row
   * 
   * @param {boolean} selected
   * @param {T} row
   * 
   * @returns {void}
   */
  const onRowSelectChange = useCallback((selected: boolean, row: T) => {
    if (selected) {
      setSelectedRows(new Set([...selectedRows, row]));
    } else {
      setSelectedRows(new Set([...selectedRows].filter((r: T) => r !== row)));
    }
  }, [selectedRows]);

  /**
   * Render the table header
   * 
   * @param {DataGridColumn[]} columns
   * 
   * @returns {React.ReactNode}
   */
  const renderTh = useCallback((columns: DataGridColumn[]) => {
    return columns.map((column: DataGridColumn) => (
      <th key={column.id}>{column.label}</th>
    ))
  }, [])

  /**
   * Add a select column to the columns if isSelectable is true
   * 
   * @param {DataGridColumn[]} columns
   * 
   * @returns {DataGridColumn[]}
   */
  const columnsWithSelectable = useMemo(() => isSelectable ? [
    { 
      id: 'select', 
      label: '', 
      accessor: 'select', 
      customRender: (row: T) => <input type="checkbox" checked={selectedRows.has(row)} onChange={(event) => onRowSelectChange(event.target.checked, row)} disabled={!isRowSelectable?.(row)} />
    },
    ...columns, 
  ] : columns, [columns, isSelectable, isRowSelectable, onRowSelectChange, selectedRows]);

  /**
   * Render the table body
   * 
   * @param {DataGridColumn[]} columns
   * @param {T} row
   * 
   * @returns {React.ReactNode}
   */
  const renderTd = useCallback((columns: DataGridColumn[], row: T) => {
    return columns.map((column: DataGridColumn) => (
      <td key={column.id}>{column.customRender ? column.customRender(row) : String(row[column.accessor])}</td>
    ))
  }, [])

  return (
    <div>
      <Topbar 
        isSelectable={isSelectable} 
        onSelectAllChange={onSelectAllChange} 
        totalSize={dataWithSelectable.length} 
        selectedRows={selectedRows} 
        customActions={topbarProps?.customActions}
      />
      <div>
        <table className={styles.Table}>
          <thead>
            <tr>
              {renderTh(columnsWithSelectable as DataGridColumn[])}
            </tr>
          </thead>
          <tbody>
            {dataWithSelectable.map((row: T) => (
              <tr key={String(row[uniqueKey])}>
                {renderTd(columnsWithSelectable as DataGridColumn[], row)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { DataGrid };