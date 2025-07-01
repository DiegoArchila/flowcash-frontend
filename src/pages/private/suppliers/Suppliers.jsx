import React from 'react'
import PropTypes from 'prop-types'

//Components
import SuppliersLayout from './layout/SuppliersLayout'
import InConstruction from '../../../components/informative/InConstruction/InConstruction'

function Suppliers(props) {
  return (
    <SuppliersLayout>
      <InConstruction />
    </SuppliersLayout>
  )
}

Suppliers.propTypes = {}

export default Suppliers
