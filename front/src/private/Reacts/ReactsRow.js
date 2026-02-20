
    function onClickFavorite(event) {
        setIsSyncing(true);
        const token = localStorage.getItem('token');
        setData([])
        syncSymbols(token)
          .then(symbols=> {
            setSymbols(symbols)
            setIsSyncing(false);
          })
          .catch(err=> {
            if (err.response && err.response.status === 401) return history.push('/')
            console.error(err.message);
            setError(err.response ? err.response.data : err.message);
            setSuccess('')
          })
    }


/*
Porps
_id": "6436fe5e5822c0ca78155914",
name": "cahorro latir",
trigger": {
			"id": 1,
			"name": "single word",
			"expectedData": {
				"word": "String"
			},
			"data": {
				"word": [
					"cachorro",
					"cachorrinho",
					"cachorrão",
					"sarnento"
				]
			},
			"_id": "6412433052749517e172102a",
			"__v": 0
		},
		"do": {
			"id": 2,
			"name": "replay",
			"expectedData": {
				"say": "String"
			},
			"data": {
				"say": [
					"AU AU",
					"AU!",
					"AU AU AU AU",
					"AUAUAUAUAUAUAU",
					"cain cain ..."
				]
			},
			"_id": "641243c952749517e1721036",
			"__v": 0
		},
	
        
*/
function DataRow(props){
    return (
     <tr>
        <td className="text-gray-900 py-1">             
            <button key={props.data._id} id={props.data._id} 
               onClick={props.onEdit}
               className="btn p-0 border-0 bg-transparent text-warning"
               title="Editar"
               >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="20" height="20">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </button>            
        </td>
        <td className="text-gray-900 py-1"> 
            {props.data.name}            
        </td>
        <td className="text-gray-900 py-1"> 
            {props.data.trigger.name}
        </td>
        <td className="text-gray-900 py-1 display: flex; align-items: center; gap: 4px;"> 
            {props.data.do.name} ⚙️
        </td>   
    </tr>  
    )
}

export default DataRow