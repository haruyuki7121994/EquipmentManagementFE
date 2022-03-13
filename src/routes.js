import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

// Admin
const ListAdmins = React.lazy(() => import('./views/admins/List'))
const CreateAdmins = React.lazy(() => import('./views/admins/Create'))
const Profile = React.lazy(() => import('./views/pages/profile/Profile'))

// Maintainer
const ListMaintainers = React.lazy(() => import('./views/maintainers/List'))
const CreateMaintainers = React.lazy(() => import('./views/maintainers/Create'))
const DetailMaintainers = React.lazy(() => import('./views/maintainers/Detail'))
const UpdateMaintainers = React.lazy(() => import('./views/maintainers/Update'))

// Categories
const ListCategories = React.lazy(() => import('./views/categories/List'))
const CreateCategories = React.lazy(() => import('./views/categories/Create'))
const UpdateCategories = React.lazy(() => import('./views/categories/Update'))

// Equipments
const ListEquipments = React.lazy(() => import('./views/equipments/List'))
const CreateEquipments = React.lazy(() => import('./views/equipments/Create'))
const UpdateEquipments = React.lazy(() => import('./views/equipments/Update'))
const BulkCreateEquipments = React.lazy(() => import('./views/equipments/BulkCreate'))
const DetailEquipments = React.lazy(() => import('./views/equipments/Detail'))
const ExportQrcode = React.lazy(() => import('./views/equipments/Export'))
const A4Page = React.lazy(() => import('./views/equipments/A4Page'))

// Maintenance
const ListMaintenance = React.lazy(() => import('./views/maintenance/List'))
const CreateMaintenance = React.lazy(() => import('./views/maintenance/Create'))
const AddEquipment = React.lazy(() => import('./views/maintenance/AddEquipment'))
const EditMaintenance = React.lazy(() => import('./views/maintenance/Update'))
const Notify = React.lazy(() => import('./views/maintenance/Notify'))
const DetailMaintenance = React.lazy(() => import('./views/maintenance/Details'))

const routes = [
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/admins', name: 'Admins', component: Cards, exact: true },
  { path: '/admins/list', name: 'List', component: ListAdmins },
  { path: '/admins/create', name: 'Create', component: CreateAdmins },
  { path: '/categories', name: 'Categories', component: Cards, exact: true },
  { path: '/categories/list', name: 'List', component: ListCategories },
  { path: '/categories/create', name: 'Create', component: CreateCategories },
  { path: '/categories/edit', name: 'Edit', component: UpdateCategories },
  { path: '/maintainers', name: 'Maintainers', component: Cards, exact: true },
  { path: '/maintainers/list', name: 'List', component: ListMaintainers },
  { path: '/maintainers/create', name: 'Create', component: CreateMaintainers },
  { path: '/maintainers/detail', name: 'Detail', component: DetailMaintainers },
  { path: '/maintainers/edit', name: 'Edit', component: UpdateMaintainers },
  { path: '/equipments', name: 'Equipments', component: Cards, exact: true },
  { path: '/equipments/list', name: 'List', component: ListEquipments },
  { path: '/equipments/create', name: 'Create', component: CreateEquipments },
  { path: '/equipments/bulk-create', name: 'BulkCreate', component: BulkCreateEquipments },
  { path: '/equipments/details', name: 'Details', component: DetailEquipments },
  { path: '/equipments/edit', name: 'Edit', component: UpdateEquipments },
  { path: '/equipments/export', name: 'Export', component: ExportQrcode },
  { path: '/equipments/a4', name: 'Edit', component: A4Page },
  { path: '/maintenance', name: 'Maintenance', component: Cards, exact: true },
  { path: '/maintenance/list', name: 'List', component: ListMaintenance },
  { path: '/maintenance/create', name: 'Create', component: CreateMaintenance },
  { path: '/maintenance/add', name: 'Add', component: AddEquipment },
  { path: '/maintenance/notify', name: 'Notify', component: Notify },
  { path: '/maintenance/detail', name: 'Detail', component: DetailMaintenance },
  { path: '/maintenance/edit', name: 'Edit', component: EditMaintenance },
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', component: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', component: Placeholders },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress', name: 'Progress', component: Progress },
  { path: '/base/spinners', name: 'Spinners', component: Spinners },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/forms', name: 'Forms', component: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', component: FormControl },
  { path: '/forms/select', name: 'Select', component: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', component: ChecksRadios },
  { path: '/forms/range', name: 'Range', component: Range },
  { path: '/forms/input-group', name: 'Input Group', component: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', component: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', component: Layout },
  { path: '/forms/validation', name: 'Validation', component: Validation },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toasts', name: 'Toasts', component: Toasts },
  { path: '/widgets', name: 'Widgets', component: Widgets },
]

export default routes
