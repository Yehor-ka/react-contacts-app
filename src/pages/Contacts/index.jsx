import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useContacts } from './useContacts';
import ContactsTable from './ContactsTable';
import { CircularProgress } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import ToggleDataViewMode from './ToggleDataViewMode';
import { DATA_VIEW_MODES } from './ToggleDataViewMode/constants';
import { useDataViewMode } from './useDataViewMode';
import ContactsGrid from './ContactsGrid';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    headContainer: {
      marginBottom: theme.spacing(3),
    },
  }),
);

function Contacts() {
  const styles = useStyles();
  const contacts = useContacts();
  const [dataViewMode, setDataViewMode] = useDataViewMode();

  return (
    <Container className={styles.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={styles.headContainer}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h3" component="h1">
              Contacts
            </Typography>
            <ToggleDataViewMode dataViewMode={dataViewMode} setDataViewMode={setDataViewMode} isLoading={contacts.isLoading} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          {(() => {
            if (contacts.isLoading) {
              return <CircularProgress data-testid="contacts-loader" />;
            }
            if (contacts.isError) {
              return <div data-testid="contacts-error">ERROR</div>;
            }
            if (dataViewMode === DATA_VIEW_MODES.TABLE) {
              return <ContactsTable data={contacts.data} />;
            }
            if (dataViewMode === DATA_VIEW_MODES.GRID) {
              return <ContactsGrid data={contacts.data} />
            }
            return null;
          })()}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Contacts;
