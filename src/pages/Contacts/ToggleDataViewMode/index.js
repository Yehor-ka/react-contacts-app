import React, { useCallback } from 'react';
import PropTypes from 'prop-types'
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { DATA_VIEW_MODES } from './constants';


function ToggleDataViewMode({ setDataViewMode, dataViewMode, isLoading }) {
  const handleChangeViewMode = useCallback((_, nextView) => {
    if(nextView) {
      setDataViewMode(nextView);
    }
  }, [setDataViewMode])

  return (
    <ToggleButtonGroup value={dataViewMode} exclusive onChange={handleChangeViewMode}>
      <ToggleButton value={DATA_VIEW_MODES.GRID} aria-label={DATA_VIEW_MODES.GRID}
      data-testid="toggle-data-view-mode-grid"
      disabled={isLoading}>
        <ViewModuleIcon />
      </ToggleButton>
      <ToggleButton value={DATA_VIEW_MODES.TABLE} aria-label={DATA_VIEW_MODES.TABLE}
      data-testid="toggle-data-view-mode-table"
      disabled={isLoading}>
        <ViewListIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

ToggleDataViewMode.propTypes = {
    setDataViewMode: PropTypes.func.isRequired,
    dataViewMode: PropTypes.oneOf([DATA_VIEW_MODES.GRID, DATA_VIEW_MODES.TABLE]).isRequired
}

export default ToggleDataViewMode;
