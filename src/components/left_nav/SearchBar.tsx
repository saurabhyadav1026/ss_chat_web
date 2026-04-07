


const SearchBar=(props:any)=>{

 const sty:any={


 }


   const updateSearchInput = (e: any) => {
   
    props.setSearchInput(e.target.value)
  }

    return <>
    <div className='' style={sty}>
        
          <input className='form-control ' name="ignore-history" style={{ height: "40px" }} type="search" onChange={(e)=>{updateSearchInput(e)}} value={props.searchInput}  placeholder={props._placeholder} id="search_input"></input>

        </div>

    </>
}


export default SearchBar;