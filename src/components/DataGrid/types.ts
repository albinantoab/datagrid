interface DataGridColumn<T = unknown> {
  id: string;
  label: string;
  /**
   * The accessor for the column
   */
  accessor: string;
  /**
   * The custom render function for the column
   */
  customRender?: (value: T) => React.ReactNode;
}

interface SelectableProps<T>     {
  /**
   * The total number of rows
   */
  totalSize?: number;
  /**
   * The callback function to handle the change of the select all checkbox
   */
  onSelectAllChange?: (value: boolean) => void;
  /**
   * The number of selected rows
   */
  selectedRows?: Set<T>;
  /**
   * Whether the grid is selectable
   * 
   * @default false
   */
  isSelectable?: boolean;
}

interface TopbarProps<T> extends SelectableProps<T> {
  customActions?: (selectedRows: T[]) => React.ReactNode;
}

interface DataGridProps<T extends Record<string, unknown>> extends Pick<SelectableProps<T>, 'isSelectable'> {
  data: T[];
  columns: DataGridColumn<T>[];
  topbarProps?: TopbarProps<T>;
  uniqueKey: string;
  /**
   * The callback function to determine if a row is selectable
   */
  isRowSelectable?: (row: T) => boolean;
}

export type { DataGridProps, TopbarProps, DataGridColumn };