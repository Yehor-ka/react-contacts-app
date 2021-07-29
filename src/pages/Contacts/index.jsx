import React, { useEffect, useState } from 'react';
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
import ContactsFilters from './ContactsFilters';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    headContainer: {
      marginBottom: theme.spacing(3),
    },
    paginationContainer: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
  }),
);

const FiltersDefault = {
  fullname: '',
  gender: 'all',
  nationality: 'all',
};

const filterByFullname = (name, fullname) => {
  return (
    name?.first?.toLowerCase().includes(fullname.toLowerCase()) ||
    name?.last?.toLowerCase().includes(fullname.toLowerCase())
  );
};

const filterByGender = (gender, filterGender) => {
  if (filterGender === 'all') {
    return true;
  }
  return gender === filterGender;
};

const filterByNationality = (nationality, filterNationality) => {
  if (filterNationality === 'all') {
    return true;
  }
  return nationality === filterNationality;
};

const getPaginationData = (currentPage, contactsPerPage, contacts) => {
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);
  let countOfPage = 0;
  if (contacts.length === 0) {
    countOfPage = 0;
  }
  countOfPage = Math.ceil(contacts.length / contactsPerPage);
  return {
    currentContacts,
    countOfPage,
  };
};

function Contacts() {
  const styles = useStyles();
  const contacts = useContacts();
  const [dataViewMode, setDataViewMode] = useDataViewMode();
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage, setContactsPerPage] = useState(10);

  const [filters, setFilters] = useState(FiltersDefault);

  const updateFilter = (name, value) => {
    setFilters((prevFiilters) => ({
      ...prevFiilters,
      [name]: value,
    }));
    setCurrentPage(1)
  };

  const clearFilters = () => {
    setFilters(FiltersDefault);
    setCurrentPage(1)
  };

  const filteredContacts = contacts.data
    .filter((contact) => filterByFullname(contact.name, filters.fullname))
    .filter((contact) => filterByGender(contact.gender, filters.gender))
    .filter((contact) => filterByNationality(contact.nat, filters.nationality));

  const { currentContacts, countOfPage } = getPaginationData(
    currentPage,
    contactsPerPage,
    filteredContacts,
  );

  const pagination = (event, pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className={styles.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={styles.headContainer}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h3" component="h1">
              Contacts
            </Typography>
            <ToggleDataViewMode
              dataViewMode={dataViewMode}
              setDataViewMode={setDataViewMode}
              isLoading={contacts.isLoading}
            />
          </Box>
        </Grid>
        <Grid item xs={12} className={styles.filtersContainer}>
          <ContactsFilters
            filters={filters}
            updateFilter={updateFilter}
            clearFilters={clearFilters}
          />
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
              return (
                <>
                  <ContactsTable data={currentContacts} />
                  <Box
                    display="flex"
                    justifyContent="center"
                    className={styles.paginationContainer}>
                    <Pagination
                      page={currentPage}
                      onChange={pagination}
                      count={countOfPage}
                      size="large"
                    />
                  </Box>
                </>
              );
            }
            if (dataViewMode === DATA_VIEW_MODES.GRID) {
              return (
                <>
                  <ContactsGrid data={currentContacts} />
                  <Box
                    display="flex"
                    justifyContent="center"
                    className={styles.paginationContainer}>
                    <Pagination
                      page={currentPage}
                      onChange={pagination}
                      count={countOfPage}
                      size="large"
                    />
                  </Box>
                </>
              );
            }
            return null;
          })()}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Contacts;
