import { useState, useEffect } from 'react';
import { styled, alpha, AppBar, Box, Toolbar, Typography, InputBase, Badge, MenuItem, Menu, Button } from '@mui/material';
import { IconButton } from '@mui/material';
import { Drafts, Markunread, Notifications, Search as SearchIcon, ShoppingCart } from '@mui/icons-material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import NavbarLogoIcon from '../icons/NavbarLogoIcon'
import { useAppDispatch, useAppSelector } from '../store';
import { logOut } from '../reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<null | HTMLElement>(null);
  const [notification, setNotification] = useState<any | []>([]);
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const { currentUsername, user } = useAppSelector(state => state.user)
  const { cart } = useAppSelector(state => state.cart)

  const newNotification = notification.find((x: any) => (x.reded === false))


  const socket = io("http://localhost:5000");
  useEffect(() => {
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(() => totalQty);
    //@ts-ignore
    socket?.emit("setup", user?._id);


  }, [cart, notification, socket])

  useEffect(() => {
    //@ts-ignore
    socket?.on("getNotification", (data) => {
      setNotification((prv: any) => [...prv, data])
      console.log(data, user?._id)
    })
    console.log(newNotification)
  }, [socket, notification])

  console.log(notification)
  //639c53c98d98d232f0223046
  const isMenuOpen = Boolean(anchorEl);
  const isNotificationOpen = Boolean(notifications);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNotificationCloseOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotifications(event.currentTarget);
  };
  const dispatch = useAppDispatch();
  const history = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut())
    history("/login")
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleNotificationClose = () => {
    setNotifications(null);
    // handleMobileMenuClose();
  };

  const handelSearch = (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    if (search.trim()) {
      history(`/search/${search}`)
    } else {
      history('/products')
    }
  }
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const NotificationID = 'notification';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}><a href='/profile'>Profile</a></MenuItem>
      <MenuItem onClick={handleMenuClose}><a href='/shop'>My shop</a></MenuItem>
      <MenuItem onClick={handleMenuClose}><a href='/orders'>My Orders</a></MenuItem>
      {user?.isAdmin &&
        <MenuItem onClick={handleMenuClose}><a href='/admin'>Admin</a></MenuItem>
      }
      <MenuItem onClick={handleMenuClose}><Button onClick={handleLogOut} >Log out</Button></MenuItem>
    </Menu>
  );
  const renderNotification = (
    <Menu
      anchorEl={notifications}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={NotificationID}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isNotificationOpen}
      onClose={handleNotificationClose}
    >
      {notification.map((x: any, index: number) => (
        <MenuItem key={index} onClick={() => (x.reded = true, history('/shop'))}>{x.message} {x.reded ? <Drafts sx={{ ml: '5px' }} /> : <Markunread sx={{ ml: '5px' }} />}</MenuItem>
      ))
      }
    </Menu >
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          color="inherit"
          href='/cart'
        >
          <Badge badgeContent={cartCount} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color='inherit' position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            href="/"
          >
            <NavbarLogoIcon isActive />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Little Planet
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <form onSubmit={handelSearch}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </form>
          </Search>
          {!currentUsername ? (
            <>
              <Button href='/login'>Log in</Button>
              <Button href='/signup'>Register</Button>
            </>
          ) :
            <>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                  size="large"
                  color="inherit"
                  href='/cart'
                >
                  <Badge badgeContent={cartCount} color="error">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  color="inherit"
                  aria-controls={NotificationID}
                  onClick={handleNotificationCloseOpen}
                >
                  <Badge badgeContent={newNotification && true} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </>

          }
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotification}
    </Box>
  );
}
export default Navbar;
