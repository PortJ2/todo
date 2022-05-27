
import ItemList from './ItemList.js';

const Content = ({ items, handleCheck, handleDelete }) => {
  return (
    <main>
      {items.length ? (
        <ItemList items={items} handleCheck={handleCheck} handleDelete={handleDelete} />
      ) : <p style={{ marginTop: '2rem' }}>No Items</p>}
    </main>
  )
}

export default Content