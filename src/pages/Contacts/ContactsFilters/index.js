import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Box, TextField } from '@material-ui/core';
import { NATIONALITIES_NUMAN_NAME } from '../../../constants/nationality';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) =>
  createStyles({
    filtersContainer: {
      "& > *:not(:last-child)": {
        marginRight: theme.spacing(2)
      }
    },
    fieldGender: {
      minWidth: 120,
    },
    fieldNationality: {
      minWidth: 140,
    },
  }),
);

function ContactsFilters({ filters, updateFilter, clearFilters }) {
  const styles = useStyles();

  const handleChangeFilter = (event) => {
    updateFilter(event.target.name, event.target.value);
  };
  return (
    <Box display="flex" justifyContent="space-between">
      <Box display="flex" className={styles.filtersContainer}>
        <TextField
          label="Fullname"
          name="fullname"
          variant="outlined"
          size="small"
          value={filters.fullname}
          onChange={handleChangeFilter}
        />
        <FormControl variant="outlined" className={styles.fieldGender} size="small">
          <InputLabel id="gender">Gender</InputLabel>
          <Select
            labelId="gender"
            value={filters.gender}
            onChange={handleChangeFilter}
            label="Gender"
            name="gender">
            <MenuItem value="all">
              <em>All</em>
            </MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={styles.fieldNationality} size="small">
          <InputLabel id="nationality">Nationality</InputLabel>
          <Select
            labelId="nationality"
            value={filters.nationality}
            onChange={handleChangeFilter}
            label="Nationality"
            name="nationality">
            <MenuItem value="all">
              <em>All</em>
            </MenuItem>
            {Object.entries(NATIONALITIES_NUMAN_NAME).map(([key, name]) => (
              <MenuItem key={key} value={key}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button size="small" startIcon={<ClearIcon />} onClick={clearFilters}>
        Clear
      </Button>
    </Box>
  );
}

ContactsFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
};

export default ContactsFilters;
