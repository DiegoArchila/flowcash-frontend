import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@chakra-ui/react'

//Components
import HomeLayout from './layout/HomeLayout'
import InConstruction from '../../../components/informative/InConstruction/InConstruction'

function Home(props) {
  return (
    <HomeLayout>
      <InConstruction />
    </HomeLayout>
  )
}

Home.propTypes = {}

export default Home
