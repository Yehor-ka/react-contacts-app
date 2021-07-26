import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useCopyToClipboard } from 'react-use';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      cursor: 'pointer',
      textTransform: 'lowercase',
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  }),
);

const STATUS_COPY = {
    COPY: 'copy',
    COPIED: 'copied'
}

const TITLE_BY_STATUS = {
    [STATUS_COPY.COPY]: 'Copy',
    [STATUS_COPY.COPIED]: 'Copied'
}

function CopytoClipboard({ text }) {
  const classes = useStyles();
  const [, copyToClipboard] = useCopyToClipboard();
  const [statusCopy, setStatusCopy] = useState('copy');

  const onClickCopy = useCallback(() => {
    copyToClipboard(text);
    setStatusCopy(STATUS_COPY.COPIED);
  }, [copyToClipboard, text]);
  const onMouseLeaveCopy = useCallback(() => {
      setTimeout(() => {
        setStatusCopy(STATUS_COPY.COPY);
      }, 100)
  }, [setStatusCopy]);
  return (
    <Tooltip title={TITLE_BY_STATUS[statusCopy]} arrow>
      <Button className={classes.root} onClick={onClickCopy} onMouseLeave={onMouseLeaveCopy}>
        <FileCopyOutlinedIcon fontSize="small" className={classes.icon} />
        {text}
      </Button>
    </Tooltip>
  );
}

CopytoClipboard.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CopytoClipboard;
