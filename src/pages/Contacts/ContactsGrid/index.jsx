import React from 'react';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Avatar, Box, Typography } from '@material-ui/core';
import CopytoClipboard from '../../../components/CopyToClipboard';
import { NATIONALITIES_NUMAN_NAME, NATIONALITIES_COLOR } from '../../../constants/nationality';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  name: {
    paddingLeft: theme.spacing(3),
  },
  country: {
    padding: '5px',
    borderRadius: '5px',
    fontWeight: 500,
    color: 'white'
  },
}));

function ContactsGrid({ data }) {
  const classes = useStyles();
  return (
    <div className={classes.root} data-testid="contacts-grid-container">
      <Grid container spacing={6}>
        {data.map((contact) => {
          return (
            <Grid item xs={6} key={contact.registered.date}>
              <Paper className={classes.paper}>
                <Box display="flex" alignItems="center" marginBottom="15px">
                  <Avatar
                    alt={`${contact.name.first} ${contact.name.last}`}
                    src={contact.picture.thumbnail}
                  />
                  <Typography variant="h6" component="h6" className={classes.name}>
                    {contact.name.title}. {contact.name.first} {contact.name.last}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" marginBottom="10px">
                  <Typography>{format(new Date(contact.dob.date), 'yyyy-MM-dd')}</Typography>
                  <Typography>{contact.dob.age} years</Typography>
                </Box>
                <Box display="flex" alignItems="center" flexWrap="wrap" marginBottom="10px">
                  <CopytoClipboard text={contact.email} />
                  <CopytoClipboard text={contact.phone} />
                </Box>
                <Box>
                  <Typography>{contact.location.country}</Typography>
                  <Typography>
                    {contact.location.city}, {contact.location.street.name}{' '}
                    {contact.location.street.number}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography
                    className={classes.country}
                    style={{
                      backgroundColor: NATIONALITIES_COLOR[contact.nat],
                    }}>
                    {NATIONALITIES_NUMAN_NAME[contact.nat]}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default ContactsGrid;
