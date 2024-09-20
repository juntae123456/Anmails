import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white', // 백그라운드를 하얀색으로 설정
  border: `1px solid ${theme.palette.common.black}`, // 검정색 선 추가
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.9), // 호버 시 배경색 약간 변경
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function ButtonAppBar() {
  const [selectedIcon, setSelectedIcon] = useState('home'); // 초기 아이콘은 홈 아이콘

  const handleIconClick = (icon) => {
    setSelectedIcon(icon); // 클릭한 아이콘을 상태로 설정
  };

  const getIconStyles = (icon) => {
    return selectedIcon === icon
      ? { color: 'black', stroke: 'black', strokeWidth: 1 }
      : { color: 'white', stroke: 'black', strokeWidth: 1 };
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit" sx={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            𝒜𝓃𝒾𝓂𝒶𝒾𝓁𝓈
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box>
          <IconButton
            size="large"
            aria-label="home"
            onClick={() => handleIconClick('home')}
          >
            <HomeIcon sx={getIconStyles('home')} />
          </IconButton>
          <IconButton
            size="large"
            aria-label="send"
            onClick={() => handleIconClick('send')}
          >
            <SendIcon sx={getIconStyles('send')} />
          </IconButton>
          <IconButton
            size="large"
            aria-label="explore"
            onClick={() => handleIconClick('explore')}
          >
            <ExploreIcon sx={getIconStyles('explore')} />
          </IconButton>
          <IconButton
            size="large"
            aria-label="favorite"
            onClick={() => handleIconClick('favorite')}
          >
            <FavoriteIcon sx={getIconStyles('favorite')} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
