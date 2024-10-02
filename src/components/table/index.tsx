import React from 'react';

export interface TableCell {
    content: (string|React.ReactNode);
    width?: number|string;
}

export interface TableRow {
    cells: TableCell[];
}

export interface TableProps {
    headerRow: TableRow;
    rows: TableRow[];
}

const DataTable: React.FC<TableProps> = ({headerRow, rows}) => {
    const defaultWidth = 100 / headerRow.cells.length;
    return (
        <table>
            <thead>
            <tr>
                {
                    headerRow.cells.map((cell, index) => (
                        <th style={{width: cell.width || defaultWidth}} key={`table-header-${index}`}>
                            {cell.content}
                        </th>
                    ))
                }
            </tr>
            </thead>
            <tbody>
            {
                rows.map((row: TableRow, rowIndex) => (
                    <tr key={`table-row-${rowIndex}`}>
                        {
                            row.cells.map((cell, cellIndex) => (
                                <td style={{width: cell.width || defaultWidth}} key={`table-cell-${rowIndex}-${cellIndex}`}>
                                    {cell.content}
                                </td>
                            ))
                        }
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}

export default DataTable;