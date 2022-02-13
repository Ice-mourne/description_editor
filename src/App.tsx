import './App.scss'

import { BasicInfo, Button, ItemId, Selection } from '@SideBar'
import { Header, Note, Perks, Sockets, Stats } from '@ItemPopup'

import { DataProvider } from '@components/provider/dataProvider'
import Editor from '@components/editor/Editor'
import React from 'react'
import ReactDOM from 'react-dom'
import { createEditor } from './ts/editor'
import { item_preview } from './testData'

function App() {
   return (
      <>
         <div className="item_popup">
            <Header {...item_preview} />
            <Note />
            <Stats />
            <Sockets />
            <Perks />
         </div>
         <Editor onMount={createEditor} />
         <div className="side_bar">
            <div className="id_button">
               <ItemId />
               <Button labelText="Get data from bungie" />
            </div>
            <Selection />
            <BasicInfo />
            <Button labelText="Change Editor" />
            <Button labelText="Get updated data" />
            <Button labelText="Add / Update description" />
         </div>
      </>
   )
}

ReactDOM.render(
   <React.StrictMode>
      <DataProvider>
         <App />
      </DataProvider>
   </React.StrictMode>,
   document.getElementById('app')
)
