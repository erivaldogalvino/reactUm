// SurveyField contem logica para renderizar uma
// label simples e input text
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {  // meta: {} nested destruction
//    console.log(props.input);
//    console.log(meta);  // -> pra compreender o {touched && error} abaixo
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px' }} /> 
            <div className="red-text" style={{ marginBottom: '20px'}}>
                {touched && error} 
            </div>
        </div>
    );
}