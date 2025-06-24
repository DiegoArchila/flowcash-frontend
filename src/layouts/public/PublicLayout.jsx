import React from 'react'
import PropTypes from 'prop-types'
import { Grid, GridItem } from '@chakra-ui/react'
import Header from '../../partials/header/Header'
import { Outlet } from 'react-router-dom'

function PublicLayout() {
  return (
    <Grid 
        templateAreas={`"header" "body"`}
        
    >

        {/* <GridItem gridArea={"header"}>
            <Header />
        </GridItem> */}
        
        
        <GridItem gridArea={"body"}>
            <Outlet />
        </GridItem>    
    
    </Grid>
  )
}

PublicLayout.propTypes = {}

export default PublicLayout;