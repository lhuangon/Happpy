import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import NursingHomeMap from './pages/NursingHomeMap';
import NursingHome from './pages/NursingHome';
import CreateNursingHome from './pages/CreateNursingHome';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/> 
                <Route path="/app" component={NursingHomeMap}/>
                <Route path="/nursingHome/create" component={CreateNursingHome}/>
                <Route path="/nursingHome/:id" component={NursingHome}/> 
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
 

//route para trabalhar com rotas no navegador
//path para indicar qual é a rotas no navegador
//exact é para fazer uma comparação  das rotas para não chamar as que contem "/"
//component é para eu chamar a página especifica pra rota informada
//switch é para garantir que apenas uma unica rota seja chamada ao mesmo tempo