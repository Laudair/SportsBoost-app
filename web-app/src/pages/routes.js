import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './Login/login'
import Panel from './Panel/panel'
import AdminBox from '../components/AdminBox/admin-box'
import UserBox from '../components/UserBox/user-box'
import GrantsBox from '../components/GrantBox/grants-box'
import GrantFilter from '../components/GrantBox/grant-filter'
import GrantEdit from '../components/GrantBox/grant-edit'
import AddAdmin from '../components/AdminBox/admin-add'
import HistoryBox from '../components/History/history-box'
import Messages from '../components/MessagesBox/messages-box'

import { UserSearchProvider} from '../context/user-context'
import { EditGrantProvider } from '../context/edit-grant-context'
import { AdminContextProvider } from '../context/admin-context'
import { HistoryContextProvider } from '../context/history-context'
import { GrantSearchProvider} from '../context/grant-context'


export default function MainRoutes() {
  return (
    <GrantSearchProvider>
      <HistoryContextProvider>
    <UserSearchProvider>
      <EditGrantProvider>
        <AdminContextProvider>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/panel" element={<Panel />}>
        <Route path="/admin-box" element={<AdminBox />} />
        <Route path="/admin-add" element={<AddAdmin />} />
        <Route path="/user-box" element={<UserBox />} />
        <Route path="/messages-box" element={<Messages />} />
        <Route path="/grants-box" element={<GrantsBox />} />
        <Route path="/grant-filter" element={<GrantFilter />} />
        <Route path="/grant-edit" element={<GrantEdit />} />
        <Route path="/history-box" element={<HistoryBox />} />
      </Route>
      <Route path="*" element={<h1>not found</h1>} />
    </Routes>
    </AdminContextProvider>
    </EditGrantProvider>
    </UserSearchProvider>
    </HistoryContextProvider>
      </GrantSearchProvider>
  )
}
