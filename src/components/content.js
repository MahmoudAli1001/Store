import { useState ,useEffect} from "react";
import '../Style/card.css'
import Cards from './cards';




function Content() {
    const[products,setProducts] =useState([])
   const[ searchTerm , setSearchTerm] = useState('');
   const[loading,setLoading] =useState(true);

    const handleSearchChange =(event) => {
        setSearchTerm(event.target.value);
    }
    const filtercard= products.filter((product)=>
        product && product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())

        

        )
        
        useEffect(() => {
            // setLoading(true);
            fetch('http://localhost:3001/products')
                .then(res => res.json())
                .then(products => {
                    setTimeout(() => {
                        setProducts(products);
                        setLoading(false);
                    }, 2000);
                })
                .catch(() => setLoading(false)); 
        }, []); 
        return(
            <>
            <div className='search'>
            <input type="text" placeholder="Search Product....." onChange={handleSearchChange}>
            </input>
            </div>
            <div className="p-card">
            {loading && 
                    <div class="dot-spinner">
                        <div class="dot-spinner__dot"></div>
                        <div class="dot-spinner__dot"></div>
                        <div class="dot-spinner__dot"></div>
                        <div class="dot-spinner__dot"></div>
                        <div class="dot-spinner__dot"></div>
                        <div class="dot-spinner__dot"></div>
                        <div class="dot-spinner__dot"></div>
                        <div class="dot-spinner__dot"></div>
                    </div>
                }
                {!loading && filtercard.length === 0 && (
                    <p>No products found.</p>
                )}
            {
                filtercard.map((cart,index)=>(
                    <Cards cart={cart} key={index}/>  

                ))
            }
            </div>
            </>
        );
}
export default Content;