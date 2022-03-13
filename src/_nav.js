import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAccountLogout,
  cilAddressBook,
  cilAlarm,
  cilBalanceScale,
  cilContact,
  cilLayers,
  cilSpeedometer,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'danger',
      text: 'HOME',
    },
  },
  {
    component: CNavTitle,
    name: 'Admin',
  },
  {
    component: CNavGroup,
    name: 'Admins',
    to: '/admins',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/admins/list',
      },
      {
        component: CNavItem,
        name: 'Create',
        to: '/admins/create',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Maintainers',
    to: '/maintainers',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/maintainers/list',
      },
      {
        component: CNavItem,
        name: 'Create',
        to: '/maintainers/create',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Categories',
    to: '/categories',
    icon: <CIcon icon={cilLayers} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/categories/list',
      },
      {
        component: CNavItem,
        name: 'Create',
        to: '/categories/create',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Equipments',
    to: '/equipments',
    icon: <CIcon icon={cilBalanceScale} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/equipments/list',
      },
      {
        component: CNavItem,
        name: 'Create',
        to: '/equipments/create',
      },
      {
        component: CNavItem,
        name: 'Bulk Create',
        to: '/equipments/bulk-create',
      },
      {
        component: CNavItem,
        name: 'Export Qrcode',
        to: '/equipments/export',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Maintenance',
    to: '/maintenance',
    icon: <CIcon icon={cilAlarm} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'List',
        to: '/maintenance/list',
      },
      {
        component: CNavItem,
        name: 'Create',
        to: '/maintenance/create',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Settings',
  },
  {
    component: CNavItem,
    name: 'Profile',
    to: '/profile',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'Logout',
    to: '/logout',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
]

export default _nav
