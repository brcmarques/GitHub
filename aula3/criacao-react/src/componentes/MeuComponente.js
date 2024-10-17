import React, { useState } from 'react';
import './MeuComponente.css'


const MeuComponente = () => {

    const [txtInitial, setButtonText] = useState("Hello World!");

    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [resultado, setResultado] = useState(null);

    const handleButtonClick = () => {

        setButtonText ("Clicado!");

    };

    const handleSomar = () => {
        const soma = parseFloat(num1) + parseFloat(num2);
        setResultado (soma);

    };
    
    var HCL = require("js-hcl-parser")
 
const hclInput = `
scale {
  from = 72
  to = 24
}
`
 
const jsonInput = `
{
  "scale": {
    "from": 72,
    "to": 72
  }
}
`
 
console.log(HCL.parse(hclInput))
 
console.log(HCL.stringify(jsonInput))


    return (
        <div id ="div1">

            <h1>{txtInitial}</h1>

            <button onClick={handleButtonClick}>
                Clique em mim!
            </button>
            
            <div>
                <input
                tipe= "number"
                placeholder="Digite o primeiro número"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                />
            </div>

            <div>
            <input
                tipe= "number"
                placeholder="Digite o primeiro número"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                />
            </div>

            <button onClick={handleSomar}>Somar</button>

             <p>Resultado da soma: {resultado}</p>

            
        </div>
    );
};

export default MeuComponente;