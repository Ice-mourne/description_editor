import './App.scss'

import { BasicInfo, Button, ItemId, Selection } from '@SideBar'
import { Description, Header, Note, Perks, Sockets, Stats } from '@ItemPopup'
import React, { useState } from 'react'

import Editor from '@components/editor/Editor'
import ReactDOM from 'react-dom'
import { createEditor } from './ts/editor'
import { getDataFromBungie } from './ts/parseBungieData'
import { item_preview } from './testData'

type SelectElement = React.ChangeEvent<HTMLSelectElement>
type InputElement = React.ChangeEvent<HTMLInputElement>

// function ItemPopup() {
//    return (

//    )
// }

function App() {
   const [selected, setSelected] = useState('')
   const handleSelectionChange = (e: SelectElement) => {
      setSelected(e.target.value)
   }

   const [itemData, setItemData] = useState({
      inputId: '',
      id: 0,
      name: '',
      armorId: 0,
      armorName: '',
      description: ''
   })
   const handleItemIdInput = (e: InputElement) => {
      setItemData({ ...itemData, inputId: e.target.value })
   }
   const handleButtonPress = () => {
      getDataFromBungie(itemData.inputId).then((data) => setItemData({ ...itemData, ...data }))
   }
   const testFun = () => {
      console.log('test')
   }

   return (
      <>
         <div className="item_popup">
            <Header {...item_preview} />
            <Note />
            <Stats />
            <Sockets />
            <Perks itemData={itemData}/>
         </div>
         <Editor onMount={createEditor} itemData={itemData} setItemData={setItemData}/>
         <div className="side_bar">
            <div className="id_button">
               <ItemId inputEvent={handleItemIdInput} />
               <Button data="Get data from bungie" buttonPress={handleButtonPress} />
            </div>
            <Selection changeEvent={handleSelectionChange} />
            <BasicInfo selected={selected} itemData={itemData} />
            <Button data="Add / Update description" buttonPress={testFun}/>
         </div>
      </>
   )
}

ReactDOM.render(
   <React.StrictMode>
      <App />
      {/* <ItemPopup /> */}
      {/* Editor has to be separate that's why ItemPopup and SideBar have separate functions */}
      {/* <SideBar /> */}
   </React.StrictMode>,
   document.getElementById('app')
)
