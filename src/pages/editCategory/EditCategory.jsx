import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Topber from '../../components/topbar/Topber'
import './editCategory.scss'
import AlertDialogSlide from '../../components/Dialogue'
import {
  Autocomplete,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  TextField,
} from '@mui/material'
import { BsListCheck } from 'react-icons/bs'

const EditCategory = () => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
  ]

  // LIST TOGGLE FUNCTIONALITY
  const [openListItem, setOpenListItem] = React.useState(true)

  const handleClick = () => {
    setOpenListItem(!openListItem)
  }
  // END OF LIST TOGGLE FUNCTIONALITY
  return (
    <div className='addClientWrapper'>
      <AlertDialogSlide
        open={open}
        handleClose={handleClose}
        title='Cancel'
        link='/manageClients'
        message='Warning!! Your changes have not been saved. Are you sure you want to leave this page? Any unsaved changes will be lost.'
      />
      <Sidebar />
      <div className='addClientRight'>
        <Topber />
        <div className='addClientMainWrapper'>
          <div className='formWrapper'>
            <div className='testCategoryWrapper'>
              <div className='testCategoryTop'>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                  }}
                  component='nav'
                  aria-labelledby='nested-list-subheader'
                  subheader={
                    <ListSubheader
                      component='div'
                      id='nested-list-subheader'
                      sx={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: 'black',
                      }}
                    >
                      Test Categories
                    </ListSubheader>
                  }
                >
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                      <BsListCheck />
                    </ListItemIcon>
                    <ListItemText primary='Inbox' />
                  </ListItemButton>
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                      <BsListCheck />
                    </ListItemIcon>
                    <ListItemText primary='Inbox' />
                  </ListItemButton>
                </List>
              </div>
              <div className='testCategoryBottom'>
                <div className='testCategoryBottomTitle'>
                  New Category Details
                </div>
                <div className='testCategoryBottomForm'>
                  <div className='testCategoryTextFieldWrapper'>
                    <TextField
                      id='outlined-basic'
                      label='Outlined'
                      variant='outlined'
                    />
                  </div>
                  <div className='testCategoryAutocompleteWrapper'>
                    <Autocomplete
                      multiple
                      id='tags-outlined'
                      options={top100Films}
                      getOptionLabel={(option) => option.title}
                      defaultValue={[top100Films[1]]}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label='filterSelectedOptions'
                          placeholder='Favorites'
                        />
                      )}
                    />
                  </div>
                  <button className='testCategoryBottomFormBtn'>Done</button>
                </div>
              </div>
            </div>

            {
              <button className='cancelClientEditBtn' onClick={handleClickOpen}>
                Cancel
              </button>
            }
            <button className='addClientEditBtn'>Done</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCategory
