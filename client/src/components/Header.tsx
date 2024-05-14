import { pad } from '@labrute/core';
import { Box, BoxProps, Link, useTheme } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import Text from './Text';

export interface HeaderProps extends BoxProps {
  url?: string;
}

const Header = ({
  url,
  ...rest
}: HeaderProps) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const theme = useTheme();

  const [time, setTime] = useState(moment.utc());

  // Randomized left art
  const leftArt = useMemo(() => Math.floor(Math.random() * (11 - 1 + 1) + 1), []);
  // Randomized right art (must be different from left art)
  const rightArt = useMemo(() => {
    let art = Math.floor(Math.random() * (11 - 1 + 1) + 1);
    while (art === leftArt) {
      art = Math.floor(Math.random() * (11 - 1 + 1) + 1);
    }
    return art;
  }, [leftArt]);

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment.utc());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        zIndex: 2,
      }}
      {...rest}
    >
      <Box
        component="img"
        src={`/images/header/left/${pad(leftArt, 2)}.png`}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          width: '23.118279569%',
        }}
      />
      <Link component={RouterLink} to={url || '/'}>
        <Box
          component="img"
          src={`/images/${language}/header/head${theme.palette.mode === 'dark' ? '-dark' : ''}.webp`}
          sx={{
            width: 1,
            filter: `drop-shadow(3px 3px ${theme.palette.border.shadow})`,
          }}
        />
      </Link>
      <Box
        component="img"
        src={`/images/header/right/1${pad(rightArt, 2)}.png`}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 1,
          width: '23.118279569%',
        }}
      />
      <Text center bold color="secondary">
        {t('serverTime')}: {time.format('HH:mm')}
      </Text>
    </Box>
  );
};

export default Header;
