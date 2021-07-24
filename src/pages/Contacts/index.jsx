import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useContacts } from './useContacts';
import ContactsTable from './ContactsTable';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    headContainer: {
        marginBottom: theme.spacing(3)
    }
  }),
);

function Contacts() {
  const styles = useStyles();
  const contacts = useContacts();

  console.log(contacts.data);

  return (
    <Container className={styles.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={styles.headContainer}>
          <Typography variant="h3" component="h1">
          Contacts
          </Typography>
        </Grid>
         <Grid item xs={12}>
            {contacts.isLoading ? 
            <div>...Loading</div> 
            :
            contacts.isError ?
            <div>ERROR</div> 
            :
            <ContactsTable data={contacts.data}/>}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Contacts;
