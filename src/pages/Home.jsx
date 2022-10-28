import React from "react"
import Card from "../components/Card/Card"

function Home({searchValue, items, onAddToFav, onAddToCart, onChangeSearchInput, setSearchValue, added, isLoading}) {
    

const renderItems = () => {
    const filteredItems = items && items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    const itemId = items.map(item => item.parentId)
    return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => 
    <>
        <Card 
        key={itemId}
        onFav={(obj)=> onAddToFav(obj)}
        onPlus={(obj)=> onAddToCart(obj)}
        loading={isLoading}
        {...item}
        /></>
    )
}


  return (
    <div className="content">
        <div className="content__header">
        <h1>{searchValue ? `Пошук за запитом: "${searchValue}"` : 'Весь товар'}</h1>
        <form className="search">
            <button><img alt="seacrh" src="img/search.svg"/></button>
            <input placeholder="Пошук..." onChange={onChangeSearchInput} value={searchValue} />
            {searchValue && <img onClick={()=> setSearchValue('')} src="img/btn-remove.svg" alt="Clear" className="bttn" />}
        </form>
        </div>

    <div className="cards">
        {renderItems()}
    </div>
    
    </div>
  )
}
export default Home