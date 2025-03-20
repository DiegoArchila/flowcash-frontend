import React from 'react'
import PropTypes from 'prop-types'
import { Route, Routes } from 'react-router-dom'
import FlowcashLayout from '../layouts/FlowcashLayout'
import FlowcashReports from '../pages/reports/FlowcashReports'
import Flowcash from "../Flowcash";

function FlowcashRoutes() {
  return (
    <Routes >
        <Route element={<FlowcashLayout />} >
          <Route index element={<Flowcash />} />
          <Route path='reports' element={<FlowcashReports />} />
        </Route>
    </Routes>
  )
}

FlowcashRoutes.propTypes = {};

export default FlowcashRoutes;
