import './App.scss'

import Editor from '@components/editor/Editor'
import { Note } from '@components/itemPopup/Extra'
import { Header } from '@components/itemPopup/Header'
import { Perks } from '@components/itemPopup/Perks'
import { Sockets } from '@components/itemPopup/Sockets'
import { Stats } from '@components/itemPopup/Stats'
import { DataProvider } from '@components/provider/dataProvider'
import { BasicInfo } from '@components/sideBar/BasicItemInfo'
import {
   Button,
   ButtonAddBungieData,
   ButtonDeletePerk,
   ButtonHidePerk,
   ButtonInvestmentStatOnly,
   ButtonMarkForLive,
   ButtonToggleHiddenPerks,
   ButtonUploadClovis,
   ButtonUploadIce
} from '@components/sideBar/Buttons'
import { ItemId } from '@components/sideBar/ItemId'
import { Login } from '@components/sideBar/Login'
import { Message } from '@components/sideBar/Message'
import { PerkSelection } from '@components/sideBar/Selection'
import { StatSelection } from '@components/sideBar/StatSelection'

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { item_preview } from './testData'
import { createEditor } from './ts/editor'

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
               <ButtonAddBungieData labelText="Get data from bungie" />
            </div>
            <PerkSelection />
            <BasicInfo />
            {/* <PerkLinking /> */}
            <Button labelText="Change Editor" />
            <ButtonHidePerk />
            <ButtonToggleHiddenPerks />
            <ButtonInvestmentStatOnly />
            <StatSelection />
            <ButtonUploadClovis labelText="Upload - Secondary Database" />
            <ButtonMarkForLive />
            <ButtonUploadIce labelText="Upload - Live database" />
            <ButtonDeletePerk labelText="Delete perk" />
            <Message />
            <Login />
         </div>
         {/* <HotKeys /> */}
      </>
   )
}

ReactDOM.createRoot(document.getElementById('app')!).render(
   <StrictMode>
      <DataProvider>
         <App />
      </DataProvider>
   </StrictMode>
)
