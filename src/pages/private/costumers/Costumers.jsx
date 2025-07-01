import React from 'react'
import PropTypes from 'prop-types'

//Components
import CostumersLayout from './layout/CostumersLayout'
import InConstruction from '../../../components/informative/InConstruction/InConstruction'

function Costumers(props) {
  return (
    <CostumersLayout>
      <InConstruction />
    </CostumersLayout>
  )
}

Costumers.propTypes = {}

export default Costumers
