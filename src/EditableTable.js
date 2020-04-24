import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

const EditableTable = (props) => {
  const { data, setData, columns } = props;
  const [ value, setValue ] = React.useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = event => {
    // if (value) {
    //   setList(list.concat(value));
    // }

    // setValue('');

    event.preventDefault();
  };

  return (
    <Table>
        <TableHead>
            {
                columns.map(col => (
                    <TableCell key={col.key}>
                        <span>{col.label}</span>
                    </TableCell>
                ))
            }
        </TableHead>
        <TableBody>
            {
                data.map(drow => (
                    <TableRow key={drow.key}>
                        {
                            columns.map(col => (
                                <TableCell key={col.key}>
                                    <span>{drow[col.key]}</span>
                                </TableCell>
                            ))
                        }
                    </TableRow>
                ))
            }
            <TableRow>
                <TableCell>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={value} onChange={handleChange} />
                    <button type="submit">Add Item</button>
                </form>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    // <div>
    //   <ul>
    //     {list.map(item => (
    //       <li key={item}>{item}</li>
    //     ))}
    //   </ul>

    //   <form onSubmit={handleSubmit}>
    //     <input type="text" value={value} onChange={handleChange} />
    //     <button type="submit">Add Item</button>
    //   </form>
    // </div>
  );
};

export default EditableTable;