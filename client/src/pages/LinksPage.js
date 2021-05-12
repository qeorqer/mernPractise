import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/authContext";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import {LinksList} from "../components/LinksList";

export const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try{
            const fetched = await request('/api/link','GET',null,{authorization:`Bearer ${token}`});
            setLinks(fetched);
        }catch (e) {
        }
    },[token,request])

    useEffect(() => {
        fetchLinks();
    },[]);

    if(loading){
        return <Loader/>
    }

    return (
        <>
        <LinksList links={links}/>
        </>
    )
}
