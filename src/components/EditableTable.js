import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@material-ui/core';
import { Delete } from "@material-ui/icons"

const EditableTable = ({ rows, columns, onDeleteRow }) => {
  return (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell key="_first"/>
                {
                    columns.map(col => (
                        <TableCell key={col.key}>
                            <span>{col.label}</span>
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
        <TableBody>
            {
                rows.map(row => (
                    <TableRow key={row.key}>
                        <TableCell>
                            <IconButton onClick={() => onDeleteRow && onDeleteRow(row)}><Delete /></IconButton>
                        </TableCell>
                        {
                            columns.map(col => (
                                <TableCell key={col.key}>
                                    <span>{makeCell(row[col.key])}</span>
                                </TableCell>
                            ))
                        }
                    </TableRow>
                ))
            }
        </TableBody>
    </Table>
  );
};

const makeCell = (x) => {
    if (x.element) return x.element;
    else return x.text || '';
}

export default EditableTable;