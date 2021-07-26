import React from 'react';
import { compareAsc, format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Avatar } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import CopytoClipboard from '../../../components/CopyToClipboard';
import { NATIONALITIES_NUMAN_NAME } from '../../../constants/nationality';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ContactsTable({ data }) {
  const classes = useStyles();
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="contacts table">
          <caption>A basic table example with a caption</caption>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Full name</TableCell>
              <TableCell>Birthday</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Nationality</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.registered.date}>
                <TableCell component="th" scope="row">
                  <Avatar
                    alt={`${item.name.first} ${item.name.last}`}
                    src={item.picture.thumbnail}
                  />
                </TableCell>
                <TableCell>
                  {item.name.title}. {item.name.first} {item.name.last}
                </TableCell>
                <TableCell>
                  <Typography>{format(new Date(item.dob.date), 'yyyy-MM-dd')}</Typography>
                  <Typography>{item.dob.age} years</Typography>
                </TableCell>
                <TableCell>
                  <CopytoClipboard text={item.email} />
                </TableCell>
                <TableCell>
                  <CopytoClipboard text={item.phone} />
                </TableCell>
                <TableCell>
                  <Typography>{item.location.country}</Typography>
                  <Typography>{item.location.city}, {item.location.street.name}{" "}{item.location.street.number}</Typography>
                </TableCell>
                <TableCell>{NATIONALITIES_NUMAN_NAME[item.nat]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ContactsTable;
