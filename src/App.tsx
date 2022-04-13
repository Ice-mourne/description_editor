import './App.scss'

import { BasicInfo, Button, ItemId, Login, Selection, StatSelection } from '@SideBar'
import { Header, Note, Perks, Sockets, Stats } from '@ItemPopup'

import AdBlockError from '@components/extra/AdBlockError'
import { DataProvider } from '@components/provider/dataProvider'
import Editor from '@components/editor/Editor'
import { Message } from '@components/sideBar/Message'
import { PerkLinking } from '@components/sideBar/PerkLinking'
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
               <Button labelText="Get data from bungie" fnName="addBungieData" />
            </div>
            <Selection />
            <BasicInfo />
            <PerkLinking />
            <Button labelText="Change Editor" />
            <Button labelText="Get updated data" fnName="download" />
            <StatSelection />
            <Button labelText="Add / Update - Database" fnName="uploadClovis" />
            <Button labelText="Add / Update - Live database" fnName="uploadIce" />
            <Message />
            <Login />
         </div>
         <AdBlockError />
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
