import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Form } from 'react-bootstrap';
import AutoComplete from './AutoComplete';
import useOutsideClick from '../hooks/useOutsideClick';

const InputControl = ({ name, label, placeholder}) => {
    const [documentRef, isVisible, setIsVisible] = useOutsideClick();
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const ref = useRef();

    useEffect(() => {
        ref.current = _.debounce(processRequest, 200);
    });

    function processRequest(searchValue) {
        axios
            .get('/countries.json')
            .then((response) => {
                const countries = response.data;
                const result = countries.filter((country) => 
                    country.toLowerCase()
                            .includes(searchValue.toLowerCase())
                );
                setSuggestions(result);
                if(result.length > 0){
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
                setErrorMsg('');
            })
            .catch(() => { setErrorMsg('Something went wrong, try again later')});
    }

    function handleSearch(event){
        event.preventDefault();
        const { value } = event.target;
        setSearchTerm(value);
        ref.current(value);
    }

    function handleSuggestionClick(countryValue) {
        setSelectedCountry(countryValue);
        setIsVisible(false);
    }
    
    return (
        <Form.Group controlId='searchItem'>
            <Form.Label>
                {label}
            </Form.Label>
            <Form.Control
                className="input-control"
                type="text"
                value={searchTerm}
                name={name}
                onChange={handleSearch}
                autoComplete = "off"
                placeholder = {placeholder}
            />
            <div ref={documentRef}>
                {isVisible && (
                    <AutoComplete
                        isVisible = {isVisible}
                        suggestions = {suggestions}
                        handleSuggestionClick = {handleSuggestionClick}
                     />
                )}
            </div>
            {selectedCountry && (
                <div className="selected-country">
                    Your Selected Country: {selectedCountry}
                </div>
            )}
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        </Form.Group>
     );
};
 
export default InputControl;
