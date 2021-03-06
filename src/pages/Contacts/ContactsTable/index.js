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
import { Avatar, Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import CopytoClipboard from '../../../components/CopyToClipboard';
import { NATIONALITIES_NUMAN_NAME, NATIONALITIES_COLOR } from '../../../constants/nationality';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  country: {
    padding: '5px',
    borderRadius: '5px',
    fontWeight: 500,
    color: 'white',
    display: 'inline-block',
    textAlign: 'center',
  },
});

function ContactsTable({ data }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} data-testid="contacts-table-container">
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
          {data.map((contact) => (
            <TableRow key={contact.registered.date}>
              <TableCell component="th" scope="row">
                <Avatar
                  alt={`${contact.name.first} ${contact.name.last}`}
                  src={contact.picture.thumbnail}
                />
              </TableCell>
              <TableCell>
                {contact.name.title}. {contact.name.first} {contact.name.last}
              </TableCell>
              <TableCell>
                <Typography>{format(new Date(contact.dob.date), 'yyyy-MM-dd')}</Typography>
                <Typography>{contact.dob.age} years</Typography>
              </TableCell>
              <TableCell>
                <CopytoClipboard text={contact.email} />
              </TableCell>
              <TableCell>
                <CopytoClipboard text={contact.phone} />
              </TableCell>
              <TableCell>
                <Typography>{contact.location.country}</Typography>
                <Typography>
                  {contact.location.city}, {contact.location.street.name}{' '}
                  {contact.location.street.number}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  className={classes.country}
                  style={{
                    backgroundColor: `rgba(${NATIONALITIES_COLOR[contact.nat]}, 0.3)`,
                    color: `rgba(${NATIONALITIES_COLOR[contact.nat]}, 1)`,
                    border: `1px solid rgba(${NATIONALITIES_COLOR[contact.nat]}, 1)`,
                  }}>
                  {NATIONALITIES_NUMAN_NAME[contact.nat]}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ContactsTable;
