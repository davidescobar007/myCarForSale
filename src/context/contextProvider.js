import React, { createContext, useState } from 'react';

export const AppContext = createContext();
export default function ApplicationProvider(props) {
    const [isLoged, setisLoged] = useState(null)
    const [userInfo, setuserInfo] = useState(null)
    const [brandList, setbrandList] = useState([])
    const [carList, setcarList] = useState([])
    const [modelList, setmodelList] = useState([])
    const [priceList, setPriceList] = useState([])
    const [yearList, setyearList] = useState([])
    const [selectedBrnad, setselectedBrnad] = useState('')
    const [selectedModel, setselectedModel] = useState('')
    const [selectedYear, setselectedYear] = useState('')
    const [selectedPrice, setselectedPrice] = useState('')
    const [imageUrls, setImageUls] = useState([])
    const [querySearch, setquerySearch] = useState({})

    let contextProvider = {
        isLoged, setisLoged,
        userInfo, setuserInfo,
        brandList, setbrandList,
        carList, setcarList,
        modelList, setmodelList,
        selectedBrnad, setselectedBrnad,
        selectedModel, setselectedModel,
        selectedYear, setselectedYear,
        yearList, setyearList,
        priceList, setPriceList,
        selectedPrice, setselectedPrice,
        imageUrls, setImageUls,
        querySearch, setquerySearch,
    }

    return (
        <AppContext.Provider
            value={contextProvider}
        >
            {props.children}
        </AppContext.Provider>
    )
}