import React from 'react';

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
            {props.data.name}            
        </td>
        <td className="text-gray-900 py-1"> 
            {props.data.trigger.name}
        </td>
        <td className="text-gray-900 py-1"> 
            {props.data.do.name}
        </td>
        <td className="text-gray-900 py-1">             
            <button key={props.data._id} id={props.data._id} 
               onClick={props.onEdit}
               className="btn p-0 border-0 bg-transparent"
               title="Editar"
               >
                <img height="20" width="20" src="./img/icons/editar.svg" />
            </button>            
        </td>   
    </tr>  
    )
}

export default DataRow