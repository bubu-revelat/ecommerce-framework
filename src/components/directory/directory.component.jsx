import Categories from "../categories/categories.components"
import './directory.style.scss'

const Directory = ({categories})=>{
return (
      <div className='directory-container'>
        {categories.map((category)=>(
          <Categories key={category.id} category={category}/> 
        ))}
      </div>
)}


export default Directory