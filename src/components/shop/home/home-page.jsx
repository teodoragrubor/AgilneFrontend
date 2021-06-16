import React from 'react';
import images from './unnamed.jpg';
import logo from './logo.png';



class HomePage extends React.Component {
    render () {
        return (
            
            <div>
                <div className="bg" style={{backgroundImage: `url(${images})`}}>
                    <div></div>
                    <div className="title">
                        <h1>TEODORA'S LASHES</h1>
                        <h4>Luxury lashes brand</h4>
                    </div>
                </div>
               <hr/>
               <hr/>
                <h2 class="onama"><b>O NAMA</b></h2>
                <hr />
                <hr />
                <img class ="logo" src={logo}/>
                <p>Teodora's Lashes kompanija osnovana je početkom 2019. godine. Naša delatnost je proizvodnja veštačkih trepavica različitih kategorija. <br/>
                 Odlučili smo da kreiramo luksuzni brend trepavica u čijem je fokusu kvalitet i udobnost. Naš cilj da obezbedimo visok kvalitet Mink i Silk hair trepavica uz povoljnu cenu. 
                 <br/>Do danas u ponudi imamo preko šest različitih vrsta trepavica, ali se taj broj kroz naše dalje poslovanje sve više povećava.<br/>
                 Osnivač kompanije je <b>Teodora Grubor</b> koja se godinama u nazad profesionalno bavi šminkanjem i kroz posao uvidela je nedostatak <br/> kvaliteta trepavica na tržištu u Srbiji 
                 </p>
                
                
                <hr />
                <hr />
                
               

            </div>
            
            
        )
    }
}

export default HomePage;